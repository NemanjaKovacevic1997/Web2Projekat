using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.DTOs;
using TravellifeChaser.Helpers.Email;
using TravellifeChaser.Helpers.Generators;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMailer mailer;
        public TicketsController(IUnitOfWork unitOfWork, IMailer mailer)
        {
            _unitOfWork = unitOfWork;
            this.mailer = mailer;
        }

        // GET: api/Tickets
        [HttpGet]
        public ActionResult<IEnumerable<Ticket>> GetTickets()
        {
            return _unitOfWork.TicketRepository.GetAll().ToList();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public ActionResult<Ticket> GetTicket(int id)
        {
            var ticket = _unitOfWork.TicketRepository.Get(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
                return BadRequest();

            _unitOfWork.TicketRepository.Update(ticket);

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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

        // POST: api/Tickets
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Ticket> PostTicket(Ticket ticket)
        {
            _unitOfWork.TicketRepository.Add(ticket);
            _unitOfWork.Save();

            return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public ActionResult<Ticket> DeleteTicket(int id)
        {
            var ticket = _unitOfWork.TicketRepository.Get(id);
            if (ticket == null)
                return NotFound();

            Flight flight = _unitOfWork.FlightRepository.Get(ticket.FlightId);
            DateTime earlier3Hours = flight.TakeoffTime.AddHours(-3);
            if (DateTime.Now > earlier3Hours)
                return NoContent();

            Seat seat = _unitOfWork.SeatRepository.Get(new object[] { ticket.Row, ticket.Column, ticket.FlightId });
            seat.Status = SeatStatus.Free;
            _unitOfWork.SeatRepository.Update(seat);

            _unitOfWork.TicketRepository.Remove(id);
            _unitOfWork.Save();

            return ticket;
        }


        [HttpPost("{id}/postTickets")]
        public ActionResult<Ticket> PostTickets(int id, List<Ticket> tickets)
        {
            if (tickets == null)
                return BadRequest();

            if (tickets.Count == 0)
                return BadRequest();

            //check if changes happend while making progress after seat check step 
            Seat seat;
            foreach (var ticket in tickets) 
            {
                seat = _unitOfWork.SeatRepository.Get(new object[] { ticket.Row, ticket.Column, ticket.FlightId });
                if(seat != null)
                {
                    if(seat.Status == SeatStatus.Taken || seat.Status == SeatStatus.Removed)
                        return StatusCode(StatusCodes.Status500InternalServerError, "Seats are already taken or removed in a process of reservation.");
                }
            }

            bool first = true;
            RegisteredUser registeredUser;
            Flight flight;
            foreach (var ticket in tickets)
            {
                flight = _unitOfWork.FlightRepository.Get(ticket.FlightId);
                seat = _unitOfWork.SeatRepository.Get(new object[] { ticket.Row, ticket.Column, ticket.FlightId });
                if (ticket.UserId != null)
                { 
                    registeredUser = _unitOfWork.RegisteredUserRepository.Get((int)ticket.UserId);      
                    ticket.Discount = registeredUser.BounusPoints;
                    ticket.Cost = BonusPointsGenerator.GetCostWithDiscount(registeredUser.BounusPoints,
                                                                            flight.Cost,
                                                                            seat.Class);
                    registeredUser.BounusPoints = BonusPointsGenerator.GetBonusPoints(flight.Length);
                    _unitOfWork.RegisteredUserRepository.Update(registeredUser);
                }
                else
                {
                    ticket.Cost = BonusPointsGenerator.GetCostWithDiscount(0, flight.Cost, seat.Class);
                    ticket.Discount = 0;
                    ticket.IsAccepted = true;
                }
                
                seat.Status = SeatStatus.Taken;
                _unitOfWork.SeatRepository.Update(seat);
                ticket.Seat = seat;

                
                ticket.CreationDateAndTime = DateTime.Now;
                _unitOfWork.TicketRepository.Add(ticket);
                _unitOfWork.Save();           

                //send email to Creator
                if (first)
                {
                    var user = _unitOfWork.RegisteredUserRepository.GetAsUser(id);
                    flight = _unitOfWork.FlightRepository.Get(ticket.FlightId);
                    string body = CreateBodyForReservationConfrim(user.FirstName, flight.From.Address.City + ", " + flight.From.Address.Country,
                                                                  flight.To.Address.City + ", " + flight.To.Address.Country,
                                                                  flight.TakeoffTime.Day, flight.TakeoffTime.Month, flight.TakeoffTime.Year,
                                                                  flight.TakeoffTime.Hour, flight.TakeoffTime.Minute);

                    Task task = Task.Run(async () => await mailer.SendEmailAsync(user.Email, "Reservation confrim", body));      
                    first = false;
                }
            }

            return Ok();
        }

        
        [HttpGet("{id}/tickets")]
        public ActionResult<IEnumerable<Ticket>> GetUserTickets(int id)
        {
            return _unitOfWork.TicketRepository.GetByCondition(x => x.UserId == id).ToList();
        }

        [HttpGet("{id}/invitations")]
        public ActionResult<IEnumerable<InvitationDTO>> GetInvitations(int id)
        {
            CleanUpExpiredInvitaionsOfUserFromDatabase(id);
            var allTickets = _unitOfWork.TicketRepository.GetByCondition(x => x.UserId == id).ToList();
            List<InvitationDTO> invitations = new List<InvitationDTO>();
            foreach (var ticket in allTickets)
            {
                if (!ticket.IsAccepted)
                {
                    InvitationDTO invitation = new InvitationDTO();
                    invitation.TicketId = ticket.Id;
                    invitation.From = ticket.Seat.Flight.From.Address.City + ", " + ticket.Seat.Flight.From.Address.Country;
                    invitation.To = ticket.Seat.Flight.To.Address.City + ", " + ticket.Seat.Flight.To.Address.Country;
                    invitation.DepartDay = ticket.Seat.Flight.TakeoffTime.Day;
                    invitation.DepartMonth = ticket.Seat.Flight.TakeoffTime.Month;
                    invitation.DepartYear = ticket.Seat.Flight.TakeoffTime.Year;
                    invitation.DepartHours = ticket.Seat.Flight.TakeoffTime.Hour;
                    invitation.DepartMinutes = ticket.Seat.Flight.TakeoffTime.Minute;
                    invitation.SeatRow = ticket.Seat.Row;
                    invitation.SeatColumn = ticket.Seat.Column;
                    invitation.SeatClass = ticket.Seat.Class.ToString();
                    var user = _unitOfWork.RegisteredUserRepository.GetAsUser(ticket.CreatorId);
                    if(user != null)
                    {
                        invitation.InviterFirstName = user.FirstName;
                        invitation.InviterLastName = user.LastName;
                        invitation.InviterUsername = user.Username;
                    }
                    
                    invitations.Add(invitation);
                }
            }

            return invitations;
        }

        private void CleanUpExpiredInvitaionsOfUserFromDatabase(int userId)
        {
            var allTickets = _unitOfWork.TicketRepository.GetByCondition(x => x.UserId == userId).ToList();
            foreach (var ticket in allTickets.ToList())
            {
                if (!ticket.IsAccepted && IsInvitationExpired(ticket.CreationDateAndTime, ticket.Seat.Flight.TakeoffTime))
                {
                    ticket.Seat.Status = SeatStatus.Free;
                    _unitOfWork.SeatRepository.Update(ticket.Seat);
                    _unitOfWork.TicketRepository.Remove(ticket.Id);
                } 
            }

            _unitOfWork.Save();
        }
        private bool IsInvitationExpired(DateTime creationTime, DateTime flightTakeOffTime)
        {
            DateTime day3AfterCreation = creationTime.AddDays(3);
            DateTime hours3BeforeFlight = flightTakeOffTime.AddHours(-3);
            DateTime now = DateTime.Now;
            int day3result = DateTime.Compare(day3AfterCreation, now);
            int hour3result = DateTime.Compare(hours3BeforeFlight, now);

            if (day3result < 0 || hour3result < 0)
                return true;

            return false;
        }

        [HttpGet("{id}/historyOfFlights")]
        public ActionResult<IEnumerable<HistoryFlightDTO>> GetHistoryOfFlights(int id)
        {
            var allTickets = _unitOfWork.TicketRepository.GetByCondition(x => x.UserId == id).ToList();
            List<HistoryFlightDTO> historys = new List<HistoryFlightDTO>();
            foreach (var ticket in allTickets)
            {
                if (ticket.IsAccepted)
                {
                    HistoryFlightDTO historyFlight = new HistoryFlightDTO();
                    historyFlight.TicketId = ticket.Id;
                    historyFlight.From = ticket.Seat.Flight.From.Address.City + ", " + ticket.Seat.Flight.From.Address.Country;
                    historyFlight.To = ticket.Seat.Flight.To.Address.City + ", " + ticket.Seat.Flight.To.Address.Country;
                    historyFlight.DepartDay = ticket.Seat.Flight.TakeoffTime.Day;
                    historyFlight.DepartMonth = ticket.Seat.Flight.TakeoffTime.Month;
                    historyFlight.DepartYear = ticket.Seat.Flight.TakeoffTime.Year;
                    historyFlight.DepartHours = ticket.Seat.Flight.TakeoffTime.Hour;
                    historyFlight.DepartMinutes = ticket.Seat.Flight.TakeoffTime.Minute;
                    historyFlight.SeatRow = ticket.Seat.Row;
                    historyFlight.SeatColumn = ticket.Seat.Column;
                    historyFlight.SeatClass = ticket.Seat.Class.ToString();

                    historys.Add(historyFlight);
                }              
            }

            return historys;
        }

        [HttpGet("{id}/accept")]
        public IActionResult AcceptTicket(int id)
        {
            var ticket = _unitOfWork.TicketRepository.Get(id);
            if (ticket == null)
                return NotFound();

            ticket.IsAccepted = true;
            ticket.Seat.Status = SeatStatus.Taken;
            _unitOfWork.SeatRepository.Update(ticket.Seat);
            _unitOfWork.Save();

            return Ok();
        }

        [HttpGet("{id}/refuse")]
        public IActionResult RefuseTicket(int id)
        {
            var ticket = _unitOfWork.TicketRepository.Get(id);
            if (ticket == null)
                return NotFound();

            ticket.Seat.Status = SeatStatus.Free;
            _unitOfWork.SeatRepository.Update(ticket.Seat);
            _unitOfWork.TicketRepository.Remove(id);
            _unitOfWork.Save();

            return Ok();
        }

        [HttpGet("{id}/fastTickets")]
        public ActionResult<IEnumerable<InvitationDTO>> GetFastTickets(int id)
        {
            var airline = _unitOfWork.AirlineRepository.GetForReport(id);
            if (airline == null)
                return NotFound();

            List<Ticket> airlinesTickets = new List<Ticket>();
            foreach (var flight in airline.Flights)
                airlinesTickets.AddRange(flight.Tickets);

            List<InvitationDTO> fastTickets = new List<InvitationDTO>();
            foreach (var tickett in airlinesTickets.ToList())
            {
                if(tickett.UserId == null && tickett.IsAccepted == false)
                {
                    Ticket ticket = _unitOfWork.TicketRepository.Get(tickett.Id);
                    InvitationDTO historyFlight = new InvitationDTO();
                    historyFlight.TicketId = ticket.Id;
                    historyFlight.From = ticket.Seat.Flight.From.Address.City + ", " + ticket.Seat.Flight.From.Address.Country;
                    historyFlight.To = ticket.Seat.Flight.To.Address.City + ", " + ticket.Seat.Flight.To.Address.Country;
                    historyFlight.DepartDay = ticket.Seat.Flight.TakeoffTime.Day;
                    historyFlight.DepartMonth = ticket.Seat.Flight.TakeoffTime.Month;
                    historyFlight.DepartYear = ticket.Seat.Flight.TakeoffTime.Year;
                    historyFlight.DepartHours = ticket.Seat.Flight.TakeoffTime.Hour;
                    historyFlight.DepartMinutes = ticket.Seat.Flight.TakeoffTime.Minute;
                    historyFlight.SeatRow = ticket.Seat.Row;
                    historyFlight.SeatColumn = ticket.Seat.Column;
                    historyFlight.SeatClass = ticket.Seat.Class.ToString();
                    historyFlight.ReturnYear = (int?)ticket.Cost;

                    fastTickets.Add(historyFlight);
                }
            }
            
            return fastTickets;
        }


        [HttpPost("{id}/acceptFastTicket")]
        public IActionResult AcceptFastTicket(int id, [FromBody]JObject data)
        {
            string userId = data.GetValue("userId").ToString();
            var ticket = _unitOfWork.TicketRepository.Get(id);
            if (ticket == null)
                return NotFound();

            ticket.IsAccepted = true;
            ticket.UserId = int.Parse(userId);
            _unitOfWork.TicketRepository.Update(ticket);
            _unitOfWork.Save();

            return Ok();
        }

        


        private string CreateBodyForReservationConfrim(string firstName, string from, string to, int departDay,
                                                       int departMonth, int departYear, int departHours, int departMinutes)
        {
            return "<div> Hello " + firstName + "! </div>" +
                          "<div> <h4> Reservation </h4></div>" +
                          "<div> From: " + from + "</div>" +
                          "<div> To: " + to + "</div>" +
                          "<div> Depart date: " + departDay + "." + departMonth + "." + departYear + "." + "</div>" +
                          "<div> Depart time: " + departHours + ":" + departMinutes + "</div>" +
                          //"<div> Seat: " + seatRow + "" + seatColumn + ", Class: " + seatClass + " </div>" +
                          "<a href='http://localhost:4200/invitations'>Confrim travel here</a>";
        }
        private bool TicketExists(int id)
        {
            return _unitOfWork.TicketRepository.Any(e => e.Id == id);
        }
    }
}
