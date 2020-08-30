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
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisteredUsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public RegisteredUsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/RegisteredUsers
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetRegisteredUsers()
        {
            return _unitOfWork.RegisteredUserRepository.GetAllAsUser();
        }

        // GET: api/RegisteredUsers/5
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<User> GetRegisteredUser(int id)
        {
            var registeredUser = _unitOfWork.RegisteredUserRepository.GetAsUser(id);
            
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

            var registeredUser = _unitOfWork.RegisteredUserRepository.Get(id);

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
                _unitOfWork.RegisteredUserRepository.Update(registeredUser);
                _unitOfWork.Save();
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
                _unitOfWork.RegisteredUserRepository.Add(newUser);
                _unitOfWork.Save();
            } 
            catch (DbUpdateException)
            {
                if (RegisteredUserExists(user.Id))
                    return Conflict();
                else
                    throw;
            }

            return _unitOfWork.RegisteredUserRepository.GetAsUser(user.Id);
        }

        // DELETE: api/RegisteredUsers/5
        [HttpDelete("{id}")]
        public ActionResult<RegisteredUser> DeleteRegisteredUser(int id)
        {
            var registeredUser = _unitOfWork.RegisteredUserRepository.Get(id);
            if (registeredUser == null)
                return NotFound();

            _unitOfWork.RegisteredUserRepository.Remove(registeredUser.Id);
            _unitOfWork.Save();
            return registeredUser;
        }


        [HttpGet("GetUsersWithSenderStatus/{id}")]
        public ActionResult<IEnumerable<UserCurrentFriendshipStatusDTO>> GetUsersWithSenderStatus(int id)
        {
            var registeredUser = _unitOfWork.RegisteredUserRepository.GetAsUser(id);

            if (registeredUser == null)
                return NotFound();

            var allUsers = _unitOfWork.RegisteredUserRepository.GetAllAsUser();
            List<UserCurrentFriendshipStatusDTO> usersWithStatus = new List<UserCurrentFriendshipStatusDTO>();

            foreach (var user in allUsers)
            {
                if (user.Id == id)
                    continue;

                if (_unitOfWork.FriendshipRepository.Any(x => (x.User1Id == id && x.User2Id == user.Id) || (x.User1Id == user.Id && x.User2Id == id)))
                    usersWithStatus.Add(new UserCurrentFriendshipStatusDTO() { User = user, CurrentFriendshipStatus = UserCurrentFriendshipStatus.Friend });
                else if (_unitOfWork.FriendshipRequestRepository.Any(x => x.FromId == id && x.ToId == user.Id))
                    usersWithStatus.Add(new UserCurrentFriendshipStatusDTO() { User = user, CurrentFriendshipStatus = UserCurrentFriendshipStatus.FriendshipRequestSent });
                else if (_unitOfWork.FriendshipRequestRepository.Any(x => x.FromId == user.Id && x.ToId == id))
                    usersWithStatus.Add(new UserCurrentFriendshipStatusDTO() { User = user, CurrentFriendshipStatus = UserCurrentFriendshipStatus.FriendshipRequestRecieved });
                else
                    usersWithStatus.Add(new UserCurrentFriendshipStatusDTO() { User = user, CurrentFriendshipStatus = UserCurrentFriendshipStatus.NotFriend });
            }

            return usersWithStatus;
        }

        [HttpGet("friends/{id}")]
        public ActionResult<IEnumerable<User>> GetFriends(int id)
        {
            if (!_unitOfWork.RegisteredUserRepository.Any(x => x.Id == id))
                return NotFound();

            var friendships = _unitOfWork.FriendshipRepository.GetByCondition(x => x.User1Id == id || x.User2Id == id);
            List<User> friends = new List<User>(); 
            foreach (var friendship in friendships)
            {
                User user = null;
                if (friendship.User1Id == id)
                    user = _unitOfWork.RegisteredUserRepository.GetAsUser(friendship.User2Id);
                else if(friendship.User2Id == id)
                    user = _unitOfWork.RegisteredUserRepository.GetAsUser(friendship.User1Id);

                if(user != null)
                    friends.Add(user);
            }

            return friends;
        }

        
        [HttpPost("usersBasedOnIds")]
        public ActionResult<IEnumerable<UserWithoutCredentialsDTO>> GetUsersBasedOnIds(List<int> usersIds)
        {
            List<UserWithoutCredentialsDTO> users = new List<UserWithoutCredentialsDTO>();
            foreach (var id in usersIds)
            {
                var user = _unitOfWork.RegisteredUserRepository.GetAsUser(id);
                users.Add(new UserWithoutCredentialsDTO(user));
            }

            return users;
        }
        private bool RegisteredUserExists(int id)
        {
            return _unitOfWork.RegisteredUserRepository.Any(e => e.Id == id);
        }
    }
}
