
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using TravellifeChaser.Helpers.DTOs;
using TravellifeChaser.Helpers.Enums;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;
using TravellifeChaser.Models.AirlinesSystem.Enums;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private FlightRepository repository;
        private AirlineRepository airlineRepository;
        public FlightsController(FlightRepository repository, AirlineRepository airlineRepository)
        {
            this.repository = repository;
            this.airlineRepository = airlineRepository;
        }

        // GET: api/Flights
        [HttpGet]
        public ActionResult<IEnumerable<Flight>> GetFlights()
        {
            return this.repository.GetAll().ToList();
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public ActionResult<Flight> GetFlight(int id)
        {
            var flight = this.repository.Get(id);

            if (flight == null)
                return NotFound();

            return flight;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutFlight(int id, Flight flight)
        {
            if (id != flight.Id)
                return BadRequest();

            try
            {
                this.repository.Update(flight);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flights
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Flight> PostFlight(Flight flight)
        {
            this.repository.Add(flight);

            return CreatedAtAction("GetFlight", new { id = flight.Id }, flight);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public ActionResult<Flight> DeleteFlight(int id)
        {
            var flight = this.repository.Get(id);

            if (flight == null)
                return NotFound();

            this.repository.Remove(flight);
            return flight;
        }

        [HttpGet("airlineFlights/{id}")]
        public ActionResult<IEnumerable<Flight>> GetAirlineFlights(int id)
        {
            if (!this.airlineRepository.Any(x => x.Id == id))
                NotFound();
            
            return this.repository.GetByCondition(x => x.AirlineId == id).ToList();
        }

        //search
        [HttpPost("search")]
        public ActionResult<IEnumerable<Flight>> Search(SearchDataDTO searchData)
        {
            if (searchData.Date1Day == 0 || searchData.Date1Month == 0 || searchData.Date1Year == 0 ||
               searchData.Date2Day == 0 || searchData.Date2Month == 0 || searchData.Date2Year == 0)
                return BadRequest();

            DateTime date1 = new DateTime(searchData.Date1Year, searchData.Date1Month, searchData.Date1Day);
            DateTime date2 = new DateTime(searchData.Date2Year, searchData.Date2Month, searchData.Date2Day);

            var flights = this.repository.GetAll().ToList();

            foreach (var flight in flights.ToList())
            {
                if (!string.IsNullOrEmpty(searchData.From))
                {
                    if (!flight.From.Address.City.ToLower().Contains(searchData.From.ToLower()))
                    {
                        flights.Remove(flight);
                        continue;
                    } 
                }

                if (!string.IsNullOrEmpty(searchData.To))
                {
                    if (!flight.To.Address.City.ToLower().Contains(searchData.To.ToLower()))
                    {
                        flights.Remove(flight);
                        continue;
                    }
                }

                if (date1 != null)
                {
                    if (flight.TakeoffTime.Date != date1.Date)
                    {
                        flights.Remove(flight);
                        continue;
                    }
                }

                if (searchData.TripType != TripType.None)
                {
                    if (searchData.TripType == TripType.RoundTrip) //uzeti u obzir i return time: date2
                    {
                        if (!RoundTripFlightPairExists(flight, flights))
                        {
                            flights.Remove(flight);
                            continue;
                        }
                    }
                    else if (searchData.TripType == TripType.MultyCity)
                    {
                        if (flight.StopsLocations.Count == 0)
                        {
                            flights.Remove(flight);
                            continue;
                        }
                    }
                }

                if (searchData.People >= 1)
                {
                    int freeSeats = CountFreeSeatsOfFlight(flight);
                    if (freeSeats < searchData.People)
                    {
                        flights.Remove(flight);
                        continue;
                    }
                }

                if (searchData.AirplaneClass != AirplaneClass.None)
                {
                    if (!AirplaneClassSeatExists(flight, searchData.AirplaneClass))
                    {
                        flights.Remove(flight);
                        continue;
                    }
                }
            }

            return flights;
        }

        private bool RoundTripFlightPairExists(Flight firstFlight, IEnumerable<Flight> flights)
        {
            foreach (var flight in flights.ToList())
            {
                if (flight.Id == firstFlight.Id)
                    continue;

                Address from1Address = firstFlight.From.Address;
                Address from2Address = flight.From.Address;
                Address to1Address = firstFlight.To.Address;
                Address to2Address = flight.To.Address;
                if (from1Address.City.ToLower().Contains(to2Address.City.ToLower()) &&
                    from1Address.Country.ToLower().Contains(to2Address.Country.ToLower()) &&
                    from2Address.City.ToLower().Contains(to1Address.City.ToLower()) &&
                    from2Address.Country.ToLower().Contains(to1Address.Country.ToLower()))
                    return true;
            }

            return false;
        }

        private int CountFreeSeatsOfFlight(Flight flight)
        {
            int freeSeats = 0;
            foreach (var seat in flight.Seats)
            {
                if (seat.Status == SeatStatus.Free)
                    freeSeats++;
            }

            return freeSeats;
        }

        private bool AirplaneClassSeatExists(Flight flight, AirplaneClass airplaneClass)
        {
            foreach (var seat in flight.Seats)
            {
                if (seat.Class == airplaneClass && seat.Status == SeatStatus.Free)
                    return true;
            }

            return false;
        }

        private bool FlightExists(int id)
        {
            return this.repository.Any(e => e.Id == id);
        }
    }
}
