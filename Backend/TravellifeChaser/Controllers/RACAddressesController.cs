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
    public class RACAddressesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public RACAddressesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/RACAddresses
        [HttpGet]
        public ActionResult<IEnumerable<RACAddress>> GetRACAddresses()
        {
            return _unitOfWork.RACAddressRepository.GetAll().ToList();
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
        }

        [HttpGet("{id}/racServiceAddresses")]
        public ActionResult<IEnumerable<RACAddress>> GetRACServiceAddresses(int id)
        {
            if (!_unitOfWork.RACAddressRepository.Any(x => x.RACServiceId == id))
                return NotFound();

            return _unitOfWork.RACAddressRepository.GetByCondition(x => x.RACServiceId == id).ToList();
        }

        [HttpGet("{id}/addressesForSearch")]
        public ActionResult<IEnumerable<RACAddress>> GetAddressesForSearch(int id)
        {
            if (!_unitOfWork.RACAddressRepository.Any(x => x.IsMain == true))
                return NotFound();

            var list = _unitOfWork.RACAddressRepository.GetByCondition(x => x.IsMain == true).ToList();
            var retList = new List<RACAddress>();

            foreach (var element in list)
            {
                var founded = false;
                foreach (var item in retList)
                {
                    if (item.City == element.City)
                    {
                        founded = true;
                        break;
                    }
                }

                if (!founded)
                    retList.Add(element);
            }

            return retList;
        }

        [HttpGet("{id}/racServiceMainAddresses")]
        public ActionResult<IEnumerable<RACAddress>> GetRACServiceMainAddresses(int id)
        {
            if (!_unitOfWork.RACAddressRepository.Any(x => x.IsMain == true))
                return NotFound();

            return _unitOfWork.RACAddressRepository.GetByCondition(x => x.IsMain == true).ToList();
        }

        [HttpGet("{id}/racServiceMainAddress")]
        public ActionResult<RACAddress> GetRACServiceMainAddress(int id)
        {
            if (!_unitOfWork.RACAddressRepository.Any(x => x.IsMain == true && x.RACServiceId == id))
                return NotFound();

            var list = _unitOfWork.RACAddressRepository.GetByCondition(x => x.IsMain == true && x.RACServiceId == id).ToList();

            return list[0];
        }
    }
}
