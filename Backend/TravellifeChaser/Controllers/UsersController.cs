using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public UsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return _unitOfWork.UserRepository.GetAll().ToList();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _unitOfWork.UserRepository.Get(id);

            if (user == null)
                return NotFound();

            return user;
        }
    

        // PUT: api/Users/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest();

            var userr = _unitOfWork.UserRepository.Get(id);

            if (userr == null)
                return NotFound();


            userr.FirstName = user.FirstName;
            userr.LastName = user.LastName;
            userr.Username = user.Username;
            userr.Email = user.Email;
            userr.MobileNumber = user.MobileNumber;
            userr.Address.City = user.Address.City;
            userr.Address.Country = user.Address.Country;
            userr.Password = user.Password;

            try
            {
                _unitOfWork.UserRepository.Update(userr);
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                    return NotFound();
                else
                    throw;
            }

            return Ok();
        }

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {
            user.Role = UserRole.Registered;

            try
            {
                _unitOfWork.UserRepository.Add(user);
                _unitOfWork.Save();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                    return Conflict();
                else
                    throw;
            }

            return _unitOfWork.UserRepository.Get(user.Id);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public ActionResult<User> DeleteUser(int id)
        {
            var user = _unitOfWork.UserRepository.Get(id);
            if (user == null)
                return NotFound();

            _unitOfWork.UserRepository.Remove(user);
            _unitOfWork.Save();
            return user;
        }

        private bool UserExists(int id)
        {
            return _unitOfWork.UserRepository.Any(e => e.Id == id);
        }
    }
}
