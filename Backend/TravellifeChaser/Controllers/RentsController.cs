using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public RentsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Rents
        [HttpGet]
        public ActionResult<IEnumerable<Rent>> GetRents()
        {
            return _unitOfWork.RentRepository.GetAll().ToList();
        }

        // GET: api/Rents/5
        [HttpGet("{id}")]
        public ActionResult<Rent> GetRent(int id)
        {
            var rent = _unitOfWork.RentRepository.Get(id);

            if (rent == null)
            {
                return NotFound();
            }

            return rent;
        }

        // PUT: api/Rents/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutRent(int id, Rent rent)
        {
            if (id != rent.Id)
            {
                return BadRequest();
            }

            _unitOfWork.RentRepository.Update(rent);

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
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

        // POST: api/Rents
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Rent> PostRent(Rent rent)
        {
            _unitOfWork.RentRepository.Add(rent);
            _unitOfWork.Save();

            return CreatedAtAction("GetRent", new { id = rent.Id }, rent);
        }

        // DELETE: api/Rents/5
        [HttpDelete("{id}")]
        public ActionResult<Rent> DeleteRent(int id)
        {
            var rent = _unitOfWork.RentRepository.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            _unitOfWork.RentRepository.Remove(rent.Id);
            _unitOfWork.Save();

            return rent;
        }

        private bool RentExists(int id)
        {
            return _unitOfWork.RentRepository.Any(e => e.Id == id);
        }
    }
}
