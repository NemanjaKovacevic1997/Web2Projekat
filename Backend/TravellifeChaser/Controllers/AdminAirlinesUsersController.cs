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
    public class AdminAirlinesUsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AdminAirlinesUsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/AdminAirlinesUsers
        [HttpGet]
        public ActionResult<IEnumerable<AdminAirlinesUser>> GetAdminAirlinesUser()
        {
            return _unitOfWork.AdminAirlineRepository.GetAll().ToList();
        }

        // GET: api/AdminAirlinesUsers/5
        [HttpGet("{id}")]
        public ActionResult<AdminAirlinesUser> GetAdminAirlinesUser(int id)
        {
            var adminAirlinesUser = _unitOfWork.AdminAirlineRepository.Get(id);

            if (adminAirlinesUser == null)
            {
                return NotFound();
            }

            return adminAirlinesUser;
        }

        // PUT: api/AdminAirlinesUsers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutAdminAirlinesUser(int id, AdminAirlinesUser adminAirlinesUser)
        {
            if (id != adminAirlinesUser.Id)
            {
                return BadRequest();
            }

            _unitOfWork.AdminAirlineRepository.Update(adminAirlinesUser);
            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminAirlinesUserExists(id))
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

        // POST: api/AdminAirlinesUsers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<AdminAirlinesUser> PostAdminAirlinesUser(AdminAirlinesUser adminAirlinesUser)
        {
            _unitOfWork.AdminAirlineRepository.Add(adminAirlinesUser);
            _unitOfWork.Save();

            return CreatedAtAction("GetAdminAirlinesUser", new { id = adminAirlinesUser.Id }, adminAirlinesUser);
        }

        // DELETE: api/AdminAirlinesUsers/5
        [HttpDelete("{id}")]
        public ActionResult<AdminAirlinesUser> DeleteAdminAirlinesUser(int id)
        {
            var adminAirlinesUser = _unitOfWork.AdminAirlineRepository.Get(id);
            if (adminAirlinesUser == null)
            {
                return NotFound();
            }

            _unitOfWork.AdminAirlineRepository.Remove(adminAirlinesUser.Id);
            _unitOfWork.Save();

            return adminAirlinesUser;
        }

        private bool AdminAirlinesUserExists(int id)
        {
            return _unitOfWork.AdminAirlineRepository.Any(e => e.Id == id);
        }

        [HttpGet("getAdminAirlinesUserById/{id}")]
        public ActionResult<AdminAirlinesUser> GetAdminAirlinesUserById(int id)
        {
            var adminAirlinesUsers = _unitOfWork.AdminAirlineRepository.GetAll();

            AdminAirlinesUser adminAirlinesUser = new AdminAirlinesUser();

            foreach (var item in adminAirlinesUsers)
            {
                if (item.Id == id)
                {
                    adminAirlinesUser = item;
                }
            }

            if (adminAirlinesUser == null)
            {
                return NotFound();
            }

            return adminAirlinesUser;
        }
    }
}
