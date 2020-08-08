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
    public class UsersController : ControllerBase
    {
        private UserRepository repository;

        public UsersController(UserRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return repository.GetAll().ToList();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = repository.Get(id);

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

            var userr = repository.Get(id);

            if (userr == null)
                return NotFound();


            userr.FirstName = user.FirstName;
            userr.LastName = user.LastName;
            userr.Username = user.Username;
            userr.Email = user.Email;
            userr.MobileNumber = user.MobileNumber;
            userr.Address.City = user.Address.City;
            userr.Address.Country = user.Address.Country;

            try
            {
                repository.Update(userr);
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
                repository.Add(user);
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                    return Conflict();
                else
                    throw;
            }

            return repository.Get(user.Id);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = repository.Get(id);
            if (user == null)
                return NotFound();

            repository.Remove(user);
            return user;
        }

        private bool UserExists(int id)
        {
            return repository.Any(e => e.Id == id);
        }
    }
}
