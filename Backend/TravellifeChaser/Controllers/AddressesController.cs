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
    public class AddressesController : ControllerBase
    {
        /*
        private readonly IUnitOfWork _unitOfWork;

        public AddressesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Addresses
        [HttpGet]
        public ActionResult<IEnumerable<Address>> GetAddresses()
        {
            return _unitOfWork.AddressRepository.GetAll().ToList();
        }

        // GET: api/RACAddresses/5
        [HttpGet("{id}")]
        public ActionResult<RACAddress> GetRACAddress(int id)
        {
            var rACAddress = _unitOfWork.RACAddressRepository.Get(id);

            if (rACAddress == null)
            {
                return NotFound();
            }

            return rACAddress;
        }

        // PUT: api/RACAddresses/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutRACAddress(int id, RACAddress rACAddress)
        {
            if (id != rACAddress.Id)
            {
                return BadRequest();
            }

            _unitOfWork.RACAddressRepository.Update(rACAddress);

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RACAddressExists(id))
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

        // POST: api/RACAddresses
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<RACAddress> PostRACAddress(RACAddress rACAddress)
        {
            _unitOfWork.RACAddressRepository.Add(rACAddress);
            _unitOfWork.Save();

            return CreatedAtAction("GetRACAddress", new { id = rACAddress.Id }, rACAddress);
        }

        // DELETE: api/RACAddresses/5
        [HttpDelete("{id}")]
        public ActionResult<RACAddress> DeleteRACAddress(int id)
        {
            var rACAddress = _unitOfWork.RACAddressRepository.Get(id);
            if (rACAddress == null)
            {
                return NotFound();
            }

            _unitOfWork.RACAddressRepository.Remove(rACAddress.Id);
            _unitOfWork.Save();

            return rACAddress;
        }

        private bool RACAddressExists(int id)
        {
            return _unitOfWork.RACAddressRepository.Any(e => e.Id == id);
        }*/
    }
}
