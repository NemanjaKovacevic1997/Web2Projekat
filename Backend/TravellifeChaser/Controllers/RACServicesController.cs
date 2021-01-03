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
using TravellifeChaser.Models;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RACServicesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public RACServicesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/RACServices
        [HttpGet]
        public ActionResult<IEnumerable<RACService>> GetRACServices()
        {
            return _unitOfWork.RACServiceRepository.GetAll().ToList();
        }

        // GET: api/RACServices/5
        [HttpGet("{id}")]
        public ActionResult<RACService> GetRACService(int id)
        {
            var rACService = _unitOfWork.RACServiceRepository.Get(id);

            if (rACService == null)
            {
                return NotFound();
            }

            return rACService;
        }

        // PUT: api/RACServices/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutRACService(int id, RACService rACService)
        {
            if (id != rACService.Id)
            {
                return BadRequest();
            }

            _unitOfWork.RACServiceRepository.Update(rACService);

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RACServiceExists(id))
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

        // POST: api/RACServices
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<RACService> PostRACService(RACService rACService)
        {
            _unitOfWork.RACServiceRepository.Add(rACService);
            _unitOfWork.Save();

            return CreatedAtAction("GetRACService", new { id = rACService.Id }, rACService);
        }

        // DELETE: api/RACServices/5
        [HttpDelete("{id}")]
        public ActionResult<RACService> DeleteRACService(int id)
        {
            var rACService = _unitOfWork.RACServiceRepository.Get(id);
            if (rACService == null)
            {
                return NotFound();
            }

            _unitOfWork.RACServiceRepository.Remove(rACService.Id);
            _unitOfWork.Save();

            return rACService;
        }

        private bool RACServiceExists(int id)
        {
            return _unitOfWork.RACServiceRepository.Any(e => e.Id == id);
        }

        [HttpGet("adminRACServiceId/{id}")]
        public ActionResult<RACService> GetAdminRACServiceRACService(int id)
        {
            var users = _unitOfWork.AdminRACUserRepository.GetAll();

            if (!users.Any(x => x.Id == id))
                return NotFound();

            AdminRACUser user = new AdminRACUser();

            foreach (var item in users)
            {
                if (item.Id == id)
                {
                    user = item;
                }
            }
            
            //var user = _unitOfWork.AdminRACUserRepository.Get(id);
            if (user == null)
                return BadRequest();

            if (user.RACServiceId == null)
                return NoContent();

            var racService = _unitOfWork.RACServiceRepository.Get((int)user.RACServiceId);
            if (racService == null)
                return NotFound();
  
            return racService;
        }

        [HttpGet("{id}/racReport")]
        public ActionResult<RACReportDTO> GetRacReport(int id)
        {
            RACReportDTO racReport = new RACReportDTO();
            racReport.AverageEarningsByDay = 0;
            racReport.AverageEarningsByWeek = 0;
            racReport.AverageEarningsByMonth = 0;
            racReport.EarningsByDay = new List<DateValueDTO>();
            racReport.RentedCarsByDay = new List<DateValueDTO>();
            racReport.EarningsByWeek = new List<DateValueDTO>();
            racReport.RentedCarsByWeek = new List<DateValueDTO>();
            racReport.EarningsByMonth = new List<DateValueDTO>();
            racReport.RentedCarsByMonth = new List<DateValueDTO>();

            int days = 360;
            DateTime currentDate = DateTime.Now;
            List<Rent> rents = new List<Rent>();

            rents = _unitOfWork.RentRepository.GetByCondition(x => x.Car.RACServiceId == id).ToList();

            int week = 50;
            int weeklyRents = 0;
            double weeklyEarnings = 0;
            int month = 11;
            int monthlyRents = 0;
            double monthlyEarnings = 0;
            double fullEarnings = 0;
            
            currentDate = currentDate.AddDays(-days);
            for (int i = 0; i <= days; i++)
            {
                var values = GetNumberOfSoldTicketsAndEarningsOnDay(rents, currentDate);

                var ret1 = new DateValueDTO();
                ret1.Date = currentDate.Day + "." + currentDate.Month + "." + currentDate.Year;
                ret1.Value = values.Item1;

                var ret2 = new DateValueDTO();
                ret2.Date = currentDate.Day + "." + currentDate.Month + "." + currentDate.Year;
                ret2.Value = values.Item2;

                fullEarnings += values.Item2;

                weeklyEarnings += values.Item2;
                weeklyRents += values.Item1;
                monthlyEarnings += values.Item2;
                monthlyRents += values.Item1;

                racReport.EarningsByDay.Add(ret2);
                racReport.RentedCarsByDay.Add(ret1);

                if (i < 357)
                {
                    if ((i % 7) == 0 && i != 0)
                    {
                        //WEEKLY EARNINGS
                        var retWeekly1 = new DateValueDTO();
                        if (week == 1)
                            retWeekly1.Date = week + " week ago";
                        else if (week != 0)
                            retWeekly1.Date = week + " weeks ago";
                        else
                            retWeekly1.Date = "this week";
                        retWeekly1.Value = weeklyEarnings;

                        //WEEKLY RENTS
                        var retWeekly2 = new DateValueDTO();
                        if (week == 1)
                            retWeekly2.Date = week + " week ago";
                        else if (week != 0)
                            retWeekly2.Date = week + " weeks ago";
                        else
                            retWeekly2.Date = "this week";
                        retWeekly2.Value = weeklyRents;

                        racReport.EarningsByWeek.Add(retWeekly1);
                        racReport.RentedCarsByWeek.Add(retWeekly2);
                        weeklyEarnings = 0;
                        weeklyRents = 0;
                        week--;
                    }
                }
                else
                {
                    if (i == 360)
                    {
                        //WEEKLY EARNINGS
                        var retWeekly1 = new DateValueDTO();
                        if (week == 1)
                            retWeekly1.Date = week + " week ago";
                        else if (week != 0)
                            retWeekly1.Date = week + " weeks ago";
                        else
                            retWeekly1.Date = "this week";
                        retWeekly1.Value = weeklyEarnings;

                        //WEEKLY RENTS
                        var retWeekly2 = new DateValueDTO();
                        if (week == 1)
                            retWeekly2.Date = week + " week ago";
                        else if (week != 0)
                            retWeekly2.Date = week + " weeks ago";
                        else
                            retWeekly2.Date = "this week";
                        retWeekly2.Value = weeklyRents;

                        racReport.EarningsByWeek.Add(retWeekly1);
                        racReport.RentedCarsByWeek.Add(retWeekly2);
                        weeklyEarnings = 0;
                        weeklyRents = 0;
                        week--;
                    }
                }    

                if ((i % 30) == 0 && i != 0)
                {
                    //MONTHLY EARNINGS
                    var retMonthly1 = new DateValueDTO();
                    if (month == 1)
                        retMonthly1.Date = month + " month ago";
                    else if (month != 0)
                        retMonthly1.Date = month + " months ago";
                    else
                        retMonthly1.Date = "this month";
                    retMonthly1.Value = monthlyEarnings;

                    //MONTHLY RENTS
                    var retMonthly2 = new DateValueDTO();
                    if (month == 1)
                        retMonthly2.Date = month + " month ago";
                    else if (month != 0)
                        retMonthly2.Date = month + " months ago";
                    else
                        retMonthly2.Date = "this month";
                    retMonthly2.Value = monthlyRents;

                    racReport.EarningsByMonth.Add(retMonthly1);
                    racReport.RentedCarsByMonth.Add(retMonthly2);
                    monthlyEarnings = 0;
                    monthlyRents = 0;
                    month--;
                }

                currentDate = currentDate.AddDays(1);
            }

            racReport.AverageEarningsByDay = fullEarnings / 360;
            racReport.AverageEarningsByWeek = fullEarnings / 51;
            racReport.AverageEarningsByMonth = fullEarnings / 12;

            return racReport;
        }

        private Tuple<int, double> GetNumberOfSoldTicketsAndEarningsOnDay(List<Rent> rents, DateTime date)
        {
            int numberOfRentsOnDay = 0;
            double earningsOnDay = 0;

            foreach (var rent in rents)
            {
                if (date.Date == rent.StartDate.Date)
                {
                    numberOfRentsOnDay++;
                    earningsOnDay += rent.Price;
                }
            }

            return new Tuple<int, double>(numberOfRentsOnDay, earningsOnDay);
        }
    }
}
