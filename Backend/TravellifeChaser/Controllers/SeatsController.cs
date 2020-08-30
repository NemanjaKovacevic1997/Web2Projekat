using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers;
using TravellifeChaser.Helpers.DTOs;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Models;
using TravellifeChaser.Models.AirlinesSystem.Enums;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public SeatsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public ActionResult<SeatsPerFlightPropertiesDTO> GetSeatsPerFlightProperties(int id)
        {
            var seats = _unitOfWork.SeatRepository.GetByCondition(x => x.FlightId == id).ToList();
            SeatsPerFlightPropertiesDTO ret = new SeatsPerFlightPropertiesDTO();
            ret.Columns = seats.First().Column;
            ret.Rows = seats.First().Row;
            ret.BookedSeats = new List<Seat>();
            ret.RemovedSeats = new List<Seat>();
            bool firstTimeEconomyClass = false;
            bool firstTimeBuisinessClass = false;

            foreach (var seat in seats)
            {
                if (seat.Column > ret.Columns)
                    ret.Columns = seat.Column;
                if (seat.Row > ret.Rows)
                    ret.Rows = seat.Row;
                if (seat.Status == SeatStatus.Taken)
                    ret.BookedSeats.Add(seat);
                if (seat.Status == SeatStatus.Removed)
                    ret.RemovedSeats.Add(seat);
                if(seat.Class == AirplaneClass.Business)
                {
                    if (!firstTimeBuisinessClass)
                    {
                        ret.FirstClassEndRow = seat.Row - 1;
                        firstTimeBuisinessClass = true;
                    }
                }
                if (seat.Class == AirplaneClass.Economy)
                {
                    if (!firstTimeEconomyClass)
                    {
                        ret.BuisinessClassEndRow = seat.Row - 1;
                        firstTimeEconomyClass = true;
                    }
                }
            }

            ret.Rows++;
            ret.Columns++;
            
            return ret;
        }
    }
}
