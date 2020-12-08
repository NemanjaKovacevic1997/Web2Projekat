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
    public class AdminSysUsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AdminSysUsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/AdminSysUsers
        [HttpGet]
        public ActionResult<IEnumerable<AdminSysUser>> GetAdminSysUser()
        {
            return _unitOfWork.AdminSysUserRepository.GetAll().ToList();
        }

        // GET: api/AdminSysUsers/5
        [HttpGet("{id}")]
        public ActionResult<AdminSysUser> GetAdminSysUser(int id)
        {
            var adminSysUser = _unitOfWork.AdminSysUserRepository.Get(id);

            if (adminSysUser == null)
            {
                return NotFound();
            }

            return adminSysUser;
        }

        // PUT: api/AdminSysUsers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutAdminSysUser(int id, AdminSysUser adminSysUser)
        {
            if (id != adminSysUser.Id)
            {
                return BadRequest();
            }

            _unitOfWork.AdminSysUserRepository.Update(adminSysUser);
            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminSysUserExists(id))
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

        // POST: api/AdminSysUsers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<AdminAirlinesUser> PostAdminSysUser(AdminSysUser adminSysUser)
        {
            _unitOfWork.AdminSysUserRepository.Add(adminSysUser);
            _unitOfWork.Save();

            return CreatedAtAction("GetAdminSysUser", new { id = adminSysUser.Id }, adminSysUser);
        }

        // DELETE: api/AdminSysUsers/5
        [HttpDelete("{id}")]
        public ActionResult<AdminSysUser> DeleteAdminSysUser(int id)
        {
            var adminSysUser = _unitOfWork.AdminSysUserRepository.Get(id);
            if (adminSysUser == null)
            {
                return NotFound();
            }

            _unitOfWork.AdminSysUserRepository.Remove(adminSysUser.Id);
            _unitOfWork.Save();

            return adminSysUser;
        }

        private bool AdminSysUserExists(int id)
        {
            return _unitOfWork.AdminSysUserRepository.Any(e => e.Id == id);
        }

        [HttpGet("getAdminSysUserById/{id}")]
        public ActionResult<AdminSysUser> GetAdminSysUserById(int id)
        {
            var adminSysUsers = _unitOfWork.AdminSysUserRepository.GetAll();

            AdminSysUser adminSysUser = new AdminSysUser();

            foreach (var item in adminSysUsers)
            {
                if (item.Id == id)
                {
                    adminSysUser = item;
                }
            }

            if (adminSysUser == null)
            {
                return NotFound();
            }

            return adminSysUser;
        }
    }
}
