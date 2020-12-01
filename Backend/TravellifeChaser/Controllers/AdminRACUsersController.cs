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
    public class AdminRACUsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AdminRACUsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/AdminRACUsers
        [HttpGet]
        public ActionResult<IEnumerable<AdminRACUser>> GetAdminRACUser()
        {
            return _unitOfWork.AdminRACUserRepository.GetAll().ToList();
        }

        // GET: api/AdminRACUsers/5
        [HttpGet("{id}")]
        public ActionResult<AdminRACUser> GetAdminRACUser(int id)
        {
            var adminRACUser = _unitOfWork.AdminRACUserRepository.Get(id);

            if (adminRACUser == null)
            {
                return NotFound();
            }

            return adminRACUser;
        }

        // PUT: api/AdminRACUsers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutAdminRACUser(int id, AdminRACUser adminRACUser)
        {
            if (id != adminRACUser.Id)
            {
                return BadRequest();
            }

            _unitOfWork.AdminRACUserRepository.Update(adminRACUser);
            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminRACUserExists(id))
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

        // POST: api/AdminRACUsers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<AdminRACUser> PostAdminRACUser(AdminRACUser adminRACUser)
        {
            _unitOfWork.AdminRACUserRepository.Add(adminRACUser);
            _unitOfWork.Save();

            return CreatedAtAction("GetAdminRACUser", new { id = adminRACUser.Id }, adminRACUser);
        }

        // DELETE: api/AdminRACUsers/5
        [HttpDelete("{id}")]
        public ActionResult<AdminRACUser> DeleteAdminRACUser(int id)
        {
            var adminRACUser = _unitOfWork.AdminRACUserRepository.Get(id); 
            if (adminRACUser == null)
            {
                return NotFound();
            }

            _unitOfWork.AdminRACUserRepository.Remove(adminRACUser.Id);
            _unitOfWork.Save();

            return adminRACUser;
        }

        private bool AdminRACUserExists(int id)
        {
            return _unitOfWork.AdminRACUserRepository.Any(e => e.Id == id);
        }
    }
}
