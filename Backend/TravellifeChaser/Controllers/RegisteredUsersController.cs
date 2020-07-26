using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisteredUsersController : ControllerBase
    {
        private RegisteredUserRepository repository;
        private IRepository<FriendshipRequest> friendshipRequestRepository;
        public RegisteredUsersController(RegisteredUserRepository repository, IRepository<FriendshipRequest> friendshipRequestRepository)
        {
            this.repository = repository;
            this.friendshipRequestRepository = friendshipRequestRepository;
        }

        // GET: api/RegisteredUsers
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetRegisteredUsers()
        {
            return repository.GetAllAsUser();
        }

        // GET: api/RegisteredUsers/5
        [HttpGet("{id}")]
        public ActionResult<User> GetRegisteredUser(int id)
        {
            var registeredUser = repository.GetAsUser(id);
            
            if (registeredUser == null)
                return NotFound();
            
            return registeredUser;
        }

        // PUT: api/RegisteredUsers/5
        [HttpPut("{id}")]
        public IActionResult PutRegisteredUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest();

            var registeredUser = repository.Get(id);

            if (registeredUser == null)
                return NotFound();
            
            //ovde izmeni
           
            try
            {
                repository.Update(registeredUser);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisteredUserExists(id))
                    return NotFound();
                else
                    throw;
            }

            return Ok();
        }

        // POST: api/RegisteredUsers
        [HttpPost]
        public ActionResult<User> PostRegisteredUser(User user)
        {
            RegisteredUser newUser = new RegisteredUser() { User = user };
            try
            {
                repository.Add(newUser);
            } 
            catch (DbUpdateException)
            {
                if (RegisteredUserExists(user.Id))
                    return Conflict();
                else
                    throw;
            }

            return repository.GetAsUser(user.Id);
        }

        // DELETE: api/RegisteredUsers/5
        [HttpDelete("{id}")]
        public ActionResult<RegisteredUser> DeleteRegisteredUser(int id)
        {
            var registeredUser = repository.Get(id);
            if (registeredUser == null)
                return NotFound();

            repository.Remove(registeredUser);
            return registeredUser;
        }

        [HttpGet("FriendshipRequests/{id}")]
        public ActionResult<IEnumerable<FriendshipRequest>> GetRegisteredUserFrendshipRequests(int id)
        {
            var registeredUser = repository.Get(id);

            if (registeredUser == null)
                return NotFound();

            return friendshipRequestRepository.GetByCondition(fr => fr.ToId == id).ToList();
        }

        private bool RegisteredUserExists(int id)
        {
            return repository.Any(e => e.Id == id);
        }
    }
}
