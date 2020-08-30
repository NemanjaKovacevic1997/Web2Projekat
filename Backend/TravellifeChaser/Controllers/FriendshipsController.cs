using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public FriendshipsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Friendships
        [HttpGet]
        public ActionResult<IEnumerable<Friendship>> GetFrendships()
        {
            return _unitOfWork.FriendshipRepository.GetAll().ToList();
        }

        // GET: api/Friendships/5/2
        [HttpGet("{user1Id}/{user2Id}")]
        public ActionResult<Friendship> GetFriendship(int user1Id, int user2Id)
        {
            var friendship1 = _unitOfWork.FriendshipRepository.Get(new object[] { user1Id, user2Id });
            var friendship2 = _unitOfWork.FriendshipRepository.Get(new object[] { user2Id, user1Id });

            if(friendship1 == null && friendship2 == null)
                return NotFound();

            if (friendship1 != null)
                return friendship1;
            else
                return friendship2;
        }
        
        // DELETE: api/Friendships/5/2
        [HttpDelete("{user1Id}/{user2Id}")]
        public ActionResult<Friendship> DeleteFriendship(int user1Id, int user2Id)
        {
            var key1 = new object[] { user1Id, user2Id };
            var key2 = new object[] { user2Id, user1Id };
            var friendship1 = _unitOfWork.FriendshipRepository.Get(key1);
            var friendship2 = _unitOfWork.FriendshipRepository.Get(key2);

            if (friendship1 == null && friendship2 == null)
                return NotFound();

            if (friendship1 != null)
                _unitOfWork.FriendshipRepository.Remove(key1);
            else
                _unitOfWork.FriendshipRepository.Remove(key2);

            _unitOfWork.Save();

            return Ok();
        }
    }
}
