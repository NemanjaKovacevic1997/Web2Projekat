using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.DTOs;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Helpers.Repositories;
using TravellifeChaser.Models;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlinesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AirlinesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Airlines
        [HttpGet]
        public ActionResult<IEnumerable<Airline>> GetAirlines()
        {
            return _unitOfWork.AirlineRepository.GetAll().ToList();
        }

        // GET: api/Airlines/5
        [HttpGet("{id}")]
        public ActionResult<Airline> GetAirline(int id)
        {
            var airline = _unitOfWork.AirlineRepository.Get(id);

            if (airline == null)
                return NotFound();

            return airline;
        }

        // PUT: api/Airlines/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutAirline(int id, Airline airline)
        {
            if (id != airline.Id)
                return BadRequest();

            //izmeniii
            try
            {
                _unitOfWork.AirlineRepository.Update(airline);
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirlineExists(id))
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

        // POST: api/Airlines
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Airline> PostAirline(Airline airline)
        {
            _unitOfWork.AirlineRepository.Add(airline);
            _unitOfWork.Save();

            return CreatedAtAction("GetAirline", new { id = airline.Id }, airline);
        }

        // DELETE: api/Airlines/5
        [HttpDelete("{id}")]
        public ActionResult<Airline> DeleteAirline(int id)
        {
            var airline = _unitOfWork.AirlineRepository.Get(id);
            if (airline == null)
                return NotFound();

            _unitOfWork.AirlineRepository.Remove(id);
            _unitOfWork.Save();

            return airline;
        }

        [HttpGet("adminAirlinesId/{id}")]
        public ActionResult<Airline> GetAdminAirlinesAirline(int id)
        {
            var user = _unitOfWork.AdminAirlineRepository.Get(id);
            if (user == null)
                return BadRequest();

            if (user.AirlineId == null)
                return NoContent();

            var airline = _unitOfWork.AirlineRepository.Get((int)user.AirlineId);
            if (airline == null)
                return NotFound();

            return airline;
        }

        [HttpGet("{id}/report")]
        public ActionResult<AirlineReportDTO> GetReportAirline(int id)
        {
            var airline = _unitOfWork.AirlineRepository.GetForReport(id);
            if (airline == null)
                return NotFound();

            AirlineReportDTO airlineReport = new AirlineReportDTO();
            airlineReport.AverageRating = airline.AverageRating;
            airlineReport.EarninngsByMonth = new List<DateValueDTO>();
            airlineReport.SoldTicketsByMonth = new List<DateValueDTO>();

            int days = 30;
            DateTime currentDate = DateTime.Now;
            List<Ticket> airlinesTickets = new List<Ticket>();
            foreach (var flight in airline.Flights)
                airlinesTickets.AddRange(flight.Tickets);

            currentDate = currentDate.AddDays(-days);
            for (int i = 0; i <= days; i++)
            {
                var values = GetNumberOfSoldTicketsAndEarninngsOnDay(airlinesTickets, currentDate);

                var ret1 = new DateValueDTO();
                ret1.Date = currentDate.Day + "." + currentDate.Month + "." + currentDate.Year;
                ret1.Value = values.Item1;

                var ret2 = new DateValueDTO();
                ret2.Date = currentDate.Day + "." + currentDate.Month + "." + currentDate.Year;
                ret2.Value = values.Item2;

                airlineReport.EarninngsByMonth.Add(ret2);
                airlineReport.SoldTicketsByMonth.Add(ret1);

                currentDate = currentDate.AddDays(1);
            }           

            return airlineReport;
        }

        private Tuple<int, double> GetNumberOfSoldTicketsAndEarninngsOnDay(List<Ticket> tickets, DateTime date)
        {
            int numberOfSoldTicketsOnDay = 0;
            double earningsOnDay = 0;

            foreach (var ticket in tickets)
            {
                if(date.Date == ticket.CreationDateAndTime.Date)
                {
                    numberOfSoldTicketsOnDay++;
                    earningsOnDay += ticket.Cost;
                }
            }

            return new Tuple<int, double>(numberOfSoldTicketsOnDay, earningsOnDay);
        }

        private bool AirlineExists(int id)
        {
            return _unitOfWork.AirlineRepository.Any(e => e.Id == id);
        }
    }
}
