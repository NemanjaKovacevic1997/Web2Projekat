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
    public class RACServicesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public RACServicesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/RACServices
        [HttpGet]
        public ActionResult<IEnumerable<RACService>> GetRACServices()
        {
            return _unitOfWork.RACServiceRepository.GetAll().ToList();
        }

        // GET: api/RACServices/5
        [HttpGet("{id}")]
        public ActionResult<RACService> GetRACService(int id)
        {
            var rACService = _unitOfWork.RACServiceRepository.Get(id);

            if (rACService == null)
            {
                return NotFound();
            }

            return rACService;
        }

        // PUT: api/RACServices/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutRACService(int id, RACService rACService)
        {
            if (id != rACService.Id)
            {
                return BadRequest();
            }

            _unitOfWork.RACServiceRepository.Update(rACService);

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RACServiceExists(id))
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

        // POST: api/RACServices
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<RACService> PostRACService(RACService rACService)
        {
            _unitOfWork.RACServiceRepository.Add(rACService);
            _unitOfWork.Save();

            return CreatedAtAction("GetRACService", new { id = rACService.Id }, rACService);
        }

        // DELETE: api/RACServices/5
        [HttpDelete("{id}")]
        public ActionResult<RACService> DeleteRACService(int id)
        {
            var rACService = _unitOfWork.RACServiceRepository.Get(id);
            if (rACService == null)
            {
                return NotFound();
            }

            _unitOfWork.RACServiceRepository.Remove(rACService.Id);
            _unitOfWork.Save();

            return rACService;
        }

        private bool RACServiceExists(int id)
        {
            return _unitOfWork.RACServiceRepository.Any(e => e.Id == id);
        }

        [HttpGet("adminRACServiceId/{id}")]
        public ActionResult<RACService> GetAdminRACServiceRACService(int id)
        {
            var user = _unitOfWork.AdminRACUserRepository.Get(id);
            if (user == null)
                return BadRequest();

            if (user.RACServiceId == null)
                return NoContent();

            var racService = _unitOfWork.RACServiceRepository.Get((int)user.RACServiceId);
            if (racService == null)
                return NotFound();

            return racService;
        }
    }
}
