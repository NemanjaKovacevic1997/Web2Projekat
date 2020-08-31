
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using TravellifeChaser.Helpers;
using TravellifeChaser.Helpers.DTOs;
using TravellifeChaser.Helpers.Enums;
using TravellifeChaser.Helpers.Generators;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;
using TravellifeChaser.Models.AirlinesSystem.Enums;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public FlightsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Flights
        [HttpGet]
        public ActionResult<IEnumerable<Flight>> GetFlights()
        {
            return _unitOfWork.FlightRepository.GetAll().ToList();
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public ActionResult<Flight> GetFlight(int id)
        {
            var flight = _unitOfWork.FlightRepository.Get(id);

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
                _unitOfWork.FlightRepository.Update(flight);
                _unitOfWork.Save();
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
        public ActionResult<Flight> PostFlight(FlightDTO flight)
        {
            Flight f = new Flight();
            f.Id = 0;
            f.FromId = flight.FromId;
            f.ToId = flight.ToId;
            f.TakeoffTime = new DateTime(flight.TakeoffYear, flight.TakeoffMonth, flight.TakeoffDay, flight.TakeoffHours, flight.TakeoffMinutes, 0);
            f.LandingTime = new DateTime(flight.LandingYear, flight.LandingMonth, flight.LandingDay, flight.LandingHours, flight.LandingMinutes, 0);
            f.Duration = f.LandingTime.Subtract(f.TakeoffTime).TotalMinutes;
            f.Length = flight.Length;
            f.Cost = flight.Cost;
            f.AirlineId = flight.AirlineId;
            f.AverageRating = 0;

            _unitOfWork.FlightRepository.Add(f);
            _unitOfWork.Save();

            foreach (var airportId in flight.StopsLocationsIds)
            {
                FlightAirport fa = new FlightAirport();
                fa.AirportId = airportId;
                fa.FlightId = f.Id;
                f.StopsLocations.Add(fa);
            }

            List<Seat> seats = SeatGenerator.GenerateSeatsForFlight(f.Id, 20, 9, 3, 8);
            foreach (var seat in seats)
                _unitOfWork.SeatRepository.Add(seat);

            _unitOfWork.Save();

            return CreatedAtAction("GetFlight", new { id = f.Id }, f);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public ActionResult<Flight> DeleteFlight(int id)
        {
            var flight = _unitOfWork.FlightRepository.Get(id);

            if (flight == null)
                return NotFound();

            _unitOfWork.FlightRepository.Remove(flight);
            _unitOfWork.Save();
            return flight;
        }

        [HttpGet("airlineFlights/{id}")]
        public ActionResult<IEnumerable<Flight>> GetAirlineFlights(int id)
        {
            if (!_unitOfWork.AirlineRepository.Any(x => x.Id == id))
                NotFound();
            
            return _unitOfWork.FlightRepository.GetByCondition(x => x.AirlineId == id).ToList();
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

            var flights = _unitOfWork.FlightRepository.GetAll().ToList();

            foreach (var flight in flights.ToList())
            {
                if (!string.IsNullOrEmpty(searchData.From))
                {
                    /*if (!flight.From.Address.City.ToLower().Contains(searchData.From.ToLower()))
                    {
                        flights.Remove(flight);
                        continue;
                    } */
                    if(!int.TryParse(searchData.From, out int airlineId))
                    {
                        flights.Remove(flight);
                        continue;
                    }
                    if (flight.From.Id != airlineId)
                    {
                        flights.Remove(flight);
                        continue;
                    }
                }

                if (!string.IsNullOrEmpty(searchData.To))
                {
                    /*if (!flight.To.Address.City.ToLower().Contains(searchData.To.ToLower()))
                    {
                        flights.Remove(flight);
                        continue;
                    }*/
                    if (!int.TryParse(searchData.To, out int airlineId))
                    {
                        flights.Remove(flight);
                        continue;
                    }
                    if (flight.To.Id != airlineId)
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
            var seats = _unitOfWork.SeatRepository.GetByCondition(x => x.FlightId == flight.Id);
            foreach (var seat in seats)
            {
                if (seat.Status == SeatStatus.Free)
                    freeSeats++;
            }

            return freeSeats;
        }

        private bool AirplaneClassSeatExists(Flight flight, AirplaneClass airplaneClass)
        {
            var seats = _unitOfWork.SeatRepository.GetByCondition(x => x.FlightId == flight.Id);
            foreach (var seat in seats)
            {
                if (seat.Class == airplaneClass && seat.Status == SeatStatus.Free)
                    return true;
            }

            return false;
        }

        private bool FlightExists(int id)
        {
            return _unitOfWork.FlightRepository.Any(e => e.Id == id);
        }
    }
}
