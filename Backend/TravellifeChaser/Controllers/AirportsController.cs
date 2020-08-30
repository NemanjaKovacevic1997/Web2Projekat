using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AirportsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Airports
        [HttpGet]
        public ActionResult<IEnumerable<Airport>> GetAirports()
        {
            return _unitOfWork.AirportRepository.GetAll().ToList();
        }

        // GET: api/Airports/5
        [HttpGet("{id}")]
        public ActionResult<Airport> GetAirport(int id)
        {
            var airport = _unitOfWork.AirportRepository.Get(id);

            if (airport == null)
            {
                return NotFound();
            }

            return airport;
        }

        // PUT: api/Airports/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutAirport(int id, Airport airport)
        {
            if (id != airport.Id)
            {
                return BadRequest();
            }

            _unitOfWork.AirportRepository.Update(airport);

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirportExists(id))
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

        // POST: api/Airports
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Airport> PostAirport(Airport airport)
        {
            _unitOfWork.AirportRepository.Add(airport);
            _unitOfWork.Save();

            return CreatedAtAction("GetAirport", new { id = airport.Id }, airport);
        }

        // DELETE: api/Airports/5
        [HttpDelete("{id}")]
        public ActionResult<Airport> DeleteAirport(int id)
        {
            var airport = _unitOfWork.AirportRepository.Get(id);
            if (airport == null)
            {
                return NotFound();
            }

            _unitOfWork.AirportRepository.Remove(airport);
            _unitOfWork.Save();

            return airport;
        }

        private bool AirportExists(int id)
        {
            return _unitOfWork.AirportRepository.Any(e => e.Id == id);
        }
    }
}
