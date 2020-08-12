using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlinesController : ControllerBase
    {
        private AirlineRepository repository; 

        public AirlinesController(AirlineRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Airlines
        [HttpGet]
        public ActionResult<IEnumerable<Airline>> GetAirlines()
        {
            return repository.GetAll().ToList();
        }

        // GET: api/Airlines/5
        [HttpGet("{id}")]
        public ActionResult<Airline> GetAirline(int id)
        {
            var airline = repository.Get(id);

            if (airline == null)
                return NotFound();

            return airline;
        }

        // PUT: api/Airlines/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutAirline(int id, Airline airline)
        {
            if (id != airline.Id)
                return BadRequest();

            //izmeniii
            try
            {
                repository.Update(airline);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirlineExists(id))
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

        // POST: api/Airlines
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Airline> PostAirline(Airline airline)
        {
            repository.Add(airline);

            return CreatedAtAction("GetAirline", new { id = airline.Id }, airline);
        }

        // DELETE: api/Airlines/5
        [HttpDelete("{id}")]
        public ActionResult<Airline> DeleteAirline(int id)
        {
            var airline = repository.Get(id);
            if (airline == null)
                return NotFound();

            repository.Remove(id);

            return airline;
        }

        private bool AirlineExists(int id)
        {
            return repository.Any(e => e.Id == id);
        }
    }
}
