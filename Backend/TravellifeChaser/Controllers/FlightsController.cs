
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;

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

        private bool FlightExists(int id)
        {
            return this.repository.Any(e => e.Id == id);
        }
    }
}
