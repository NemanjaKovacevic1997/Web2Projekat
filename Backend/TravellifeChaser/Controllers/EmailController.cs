using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravellifeChaser.Helpers;
using TravellifeChaser.Helpers.DTOs;
using TravellifeChaser.Helpers.Email;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        public readonly IMailer mailer;
        private readonly IUnitOfWork _unitOfWork;

        public EmailController(IMailer mailer, IUnitOfWork unitOfWork)
        {
            this.mailer = mailer;
            this._unitOfWork = unitOfWork;
        }


        [HttpPost("{id}/sendReservationMailToYourself")]
        public async Task<IActionResult> SendReservationMailToYourself(int id, HistoryFlightDTO flight)
        {
            var user = _unitOfWork.UserRepository.Get(id);

            if (user == null)
                return NotFound();

            string body = "<div> Hello " + user.FirstName + "! </div>" +
                          "<div> <h4> Reservation </h4></div>" +
                          "<div> From: " + flight.From + "</div>" +
                          "<div> To: " + flight.To + "</div>" +
                          "<div> Depart date: " + flight.DepartDay + "." + flight.DepartMonth + "." + flight.DepartYear + "." + "</div>" +
                          "<div> Depart time: " + flight.DepartHours + ":" + flight.DepartMinutes + "</div>" +
                          "<div> Seat: " + flight.SeatRow + "" + flight.SeatColumn + ", Class: " + flight.SeatClass + " </div>" +
                          "<a href='http://localhost:4200/invitations'>Confrim travel here</a>";



            await mailer.SendEmailAsync(user.Email, "Reservation created", body);
                                                
            return Ok();
        }


        [HttpPost("{id}/sendMails")]
        public async Task<IActionResult> SendMailsFromInitiator(int id, List<int> invitedFriendsIds)
        {
            var initiator = _unitOfWork.UserRepository.Get(id);

            if (initiator == null)
                return NotFound();

            foreach (var userId in invitedFriendsIds)
            {
                var user = _unitOfWork.RegisteredUserRepository.GetAsUser(userId);
                if (user == null)
                    continue;

                await mailer.SendEmailAsync(user.Email, "Trip invitation", 
                                                "<div> Hello " + user.FirstName + "! </div>" +
                                                "<div>" + initiator.FirstName + " " + initiator.LastName + "( " + initiator.Username + " )" + 
                                                " is inviteing YOU to journey</div>" +
                                                "<a href='http://localhost:4200/invitations'>Confrim travel with your friend here</a>");
            }
            
            return NoContent();
        }


    }
}
