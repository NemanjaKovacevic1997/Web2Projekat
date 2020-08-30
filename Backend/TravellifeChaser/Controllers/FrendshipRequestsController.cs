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
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FrendshipRequestsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public FrendshipRequestsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        // GET: api/FrendshipRequests
        [HttpGet]
        public ActionResult<IEnumerable<FriendshipRequest>> GetFrendshipRequests()
        {
            return _unitOfWork.FriendshipRequestRepository.GetAll().ToList();
        }

        // GET: api/FrendshipRequests/5
        [HttpGet("{id}")]
        public ActionResult<FriendshipRequest> GetFrendshipRequest(int id)
        {
            var frendshipRequest = _unitOfWork.FriendshipRequestRepository.Get(id);

            if (frendshipRequest == null)
                return NotFound();

            return frendshipRequest;
        }

        // PUT: api/FrendshipRequests/5
        [HttpPut("{id}")]
        public IActionResult PutFrendshipRequest(int id, FriendshipRequest frendshipRequest)
        {
            if (id != frendshipRequest.Id)
                return BadRequest();

            try
            {
                _unitOfWork.FriendshipRequestRepository.Update(frendshipRequest);
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FrendshipRequestExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/FrendshipRequests
        [HttpPost]
        public ActionResult<FriendshipRequest> PostFrendshipRequest(FriendshipRequest frendshipRequest)
        {
            if (_unitOfWork.FriendshipRequestRepository.Any(x => x.FromId == frendshipRequest.FromId && x.ToId == frendshipRequest.ToId))
                return Conflict();

            try
            {
                _unitOfWork.FriendshipRequestRepository.Add(frendshipRequest);
                _unitOfWork.Save();
            }
            catch (DbUpdateException)
            {
                if (FrendshipRequestExists(frendshipRequest.Id))
                    return Conflict();
                else
                    throw;
            }

            return _unitOfWork.FriendshipRequestRepository.Get(frendshipRequest.Id);
        }

        // DELETE: api/FrendshipRequests/5
        [HttpDelete("{id}")]
        public ActionResult<FriendshipRequest> DeleteFrendshipRequest(int id)
        {
            var frendshipRequest = _unitOfWork.FriendshipRequestRepository.Get(id);
            if (frendshipRequest == null)
                return NotFound();

            _unitOfWork.FriendshipRequestRepository.Remove(frendshipRequest);
            _unitOfWork.Save();
            return frendshipRequest;
        }


        [HttpDelete("{fromId}/{toId}")]
        public ActionResult<FriendshipRequest> DeleteFrendshipRequestByIds(int fromId, int toId)
        {
            var frendshipRequest = _unitOfWork.FriendshipRequestRepository.GetByCondition(x => x.FromId == fromId && x.ToId == toId).FirstOrDefault();
            if (frendshipRequest == null)
                return NotFound();

            _unitOfWork.FriendshipRequestRepository.Remove(frendshipRequest.Id);
            _unitOfWork.Save();
            return frendshipRequest;
        }

        [HttpGet("accept/{fromId}/{toId}")]
        public IActionResult AcceptFrendshipRequest(int fromId, int toId)
        {
            var frendshipRequest = _unitOfWork.FriendshipRequestRepository.GetByCondition(x => x.FromId == fromId && x.ToId == toId).FirstOrDefault();
            if (frendshipRequest == null)
                return NotFound();

            Friendship newFrendship = new Friendship() { User1Id = frendshipRequest.FromId, User2Id = frendshipRequest.ToId };
            _unitOfWork.FriendshipRepository.Add(newFrendship);
            _unitOfWork.FriendshipRequestRepository.Remove(frendshipRequest.Id);
            _unitOfWork.Save();

            return Ok();
        }

        [HttpGet("refuse/{fromId}/{toId}")]
        public IActionResult RefuseFrendshipRequest(int fromId, int toId)
        {
            var frendshipRequest = _unitOfWork.FriendshipRequestRepository.GetByCondition(x => x.FromId == fromId && x.ToId == toId).FirstOrDefault();
            if (frendshipRequest == null)
                return NotFound();

            _unitOfWork.FriendshipRequestRepository.Remove(frendshipRequest.Id);
            _unitOfWork.Save();
            return Ok();
        }

        private bool FrendshipRequestExists(int id)
        {
            return _unitOfWork.FriendshipRequestRepository.Any(e => e.Id == id);
        }
    }
}
