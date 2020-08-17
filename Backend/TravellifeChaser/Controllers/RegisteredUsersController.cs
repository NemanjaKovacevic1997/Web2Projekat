using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers;
using TravellifeChaser.Helpers.DTOs;
using TravellifeChaser.Helpers.Enums;
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
        private IRepository<Friendship> friendshipRepository;
        public RegisteredUsersController(RegisteredUserRepository repository, IRepository<FriendshipRequest> friendshipRequestRepository, IRepository<Friendship> friendshipRepository)
        {
            this.repository = repository;
            this.friendshipRequestRepository = friendshipRequestRepository;
            this.friendshipRepository = friendshipRepository;
        }

        // GET: api/RegisteredUsers
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetRegisteredUsers()
        {
            return repository.GetAllAsUser();
        }

        // GET: api/RegisteredUsers/5
        [HttpGet("{id}")]
        [Authorize]
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

   
            registeredUser.User.FirstName = user.FirstName;
            registeredUser.User.LastName = user.LastName;
            registeredUser.User.Username = user.Username;
            registeredUser.User.Email = user.Email;
            registeredUser.User.MobileNumber = user.MobileNumber;
            registeredUser.User.Address.City = user.Address.City;
            registeredUser.User.Address.Country = user.Address.Country;

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
            user.Role = UserRole.Registered;
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


        [HttpGet("GetUsersWithSenderStatus/{id}")]
        public ActionResult<IEnumerable<UserCurrentFriendshipStatusDTO>> GetUsersWithSenderStatus(int id)
        {
            var registeredUser = repository.GetAsUser(id);

            if (registeredUser == null)
                return NotFound();

            var allUsers = repository.GetAllAsUser();
            List<UserCurrentFriendshipStatusDTO> usersWithStatus = new List<UserCurrentFriendshipStatusDTO>();

            foreach (var user in allUsers)
            {
                if (user.Id == id)
                    continue;

                if (friendshipRepository.Any(x => (x.User1Id == id && x.User2Id == user.Id) || (x.User1Id == user.Id && x.User2Id == id)))
                    usersWithStatus.Add(new UserCurrentFriendshipStatusDTO() { User = user, CurrentFriendshipStatus = UserCurrentFriendshipStatus.Friend });
                else if (friendshipRequestRepository.Any(x => x.FromId == id && x.ToId == user.Id))
                    usersWithStatus.Add(new UserCurrentFriendshipStatusDTO() { User = user, CurrentFriendshipStatus = UserCurrentFriendshipStatus.FriendshipRequestSent });
                else if (friendshipRequestRepository.Any(x => x.FromId == user.Id && x.ToId == id))
                    usersWithStatus.Add(new UserCurrentFriendshipStatusDTO() { User = user, CurrentFriendshipStatus = UserCurrentFriendshipStatus.FriendshipRequestRecieved });
                else
                    usersWithStatus.Add(new UserCurrentFriendshipStatusDTO() { User = user, CurrentFriendshipStatus = UserCurrentFriendshipStatus.NotFriend });
            }

            return usersWithStatus;
        }
        private bool RegisteredUserExists(int id)
        {
            return repository.Any(e => e.Id == id);
        }
    }
}
