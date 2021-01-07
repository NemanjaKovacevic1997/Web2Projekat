using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Math.EC.Rfc7748;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.DTOs;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public RentsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Rents
        [HttpGet]
        public ActionResult<IEnumerable<Rent>> GetRents()
        {
            return _unitOfWork.RentRepository.GetAll().ToList();
        }

        // GET: api/Rents/5
        [HttpGet("{id}")]
        public ActionResult<Rent> GetRent(int id)
        {
            var rent = _unitOfWork.RentRepository.Get(id);

            if (rent == null)
            {
                return NotFound();
            }

            return rent;
        }

        // PUT: api/Rents/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutRent(int id, Rent rent)
        {
            if (id != rent.Id)
            {
                return BadRequest();
            }

            _unitOfWork.RentRepository.Update(rent);

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
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

        // POST: api/Rents
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Rent> PostRent(Rent rent)
        {
            _unitOfWork.RentRepository.Add(rent);
            _unitOfWork.Save();

            return CreatedAtAction("GetRent", new { id = rent.Id }, rent);
        }

        // DELETE: api/Rents/5
        [HttpDelete("{id}")]
        public ActionResult<Rent> DeleteRent(int id)
        {
            var rent = _unitOfWork.RentRepository.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            _unitOfWork.RentRepository.Remove(rent.Id);
            _unitOfWork.Save();

            return rent;
        }

        [HttpDelete("{id}/rentWithTicketId")]
        public ActionResult<Rent> DeleteRentWithTicketId(int id)
        {
            var ticket = _unitOfWork.TicketRepository.Get(id);
            var rent = _unitOfWork.RentRepository.Get(ticket.RentId);

            if (rent == null)
            {
                return NotFound();
            }

            _unitOfWork.RentRepository.Remove(rent.Id);
            _unitOfWork.Save();

            return rent;
        }

        private bool RentExists(int id)
        {
            return _unitOfWork.RentRepository.Any(e => e.Id == id);
        }

        [HttpGet("{id}/carsRents")]
        public ActionResult<IEnumerable<Rent>> GetCarsRents(int id)
        {
            if (!_unitOfWork.RentRepository.Any(x => x.CarId == id))
                return NotFound();

            return _unitOfWork.RentRepository.GetByCondition(x => x.CarId == id).ToList();
        }

        [HttpGet("{id}/racRents")]
        public ActionResult<IEnumerable<Rent>> GetRacRents(int id)
        {
            List<Rent> retList = new List<Rent>();

            if (!_unitOfWork.CarRepository.Any(x => x.RACServiceId == id))
                return NotFound();

            var listOfCars = _unitOfWork.CarRepository.GetByCondition(x => x.RACServiceId == id).ToList();

            foreach (var car in listOfCars)
            {
                var listOfRents = _unitOfWork.RentRepository.GetByCondition(x => x.CarId == car.Id).ToList();

                foreach (var item in listOfRents)
                {
                    item.Car = _unitOfWork.CarRepository.Get(item.CarId);
                    item.StartRACAddress = _unitOfWork.RACAddressRepository.Get(item.StartRACAddressId);
                    item.EndRACAddress = _unitOfWork.RACAddressRepository.Get(item.EndRACAddressId);
                    item.RegisteredUser = _unitOfWork.RegisteredUserRepository.Get(item.RegisteredUserId);
                    retList.Add(item);
                }
            }
            return retList;
        }

        [HttpGet("{id}/addressRented")]
        public ActionResult<bool> IsAddressRented(int id)
        {
            bool isRented = false;

            if (_unitOfWork.RentRepository.Any(x => (x.StartRACAddressId == id || x.EndRACAddressId == id) && x.EndDate > DateTime.Now))
                isRented = true;

            return isRented;
        }

        [HttpGet("{id}/carRented")]
        public ActionResult<bool> IsCarRented(int id)
        {
            bool isRented = false;

            if (_unitOfWork.RentRepository.Any(x => x.CarId == id && x.EndDate > DateTime.Now))
                isRented = true;

            return isRented;
        }

        [HttpGet("notRentedCarsInSomeDateRange/racId={id}&year1={year1}&month1={month1}&day1={day1}&hour1={hour1}&minute1={minute1}&year2={year2}&month2={month2}&day2={day2}&hour2={hour2}&minute2={minute2}")]
        public ActionResult<IEnumerable<Car>> notRentedCarsInSomeDateRange(int id, int year1, int month1, int day1, int hour1, int minute1, int year2, int month2, int day2, int hour2, int minute2)
        {
            DateTime startDate = new DateTime(year1, month1, day1, hour1, minute1, 0);
            DateTime endDate = new DateTime(year2, month2, day2, hour2, minute2, 0);

            List<Car> retList = new List<Car>();

            if (!_unitOfWork.CarRepository.Any(x => x.RACServiceId == id))
                return NotFound();

            var listOfCars = _unitOfWork.CarRepository.GetByCondition(x => x.RACServiceId == id).ToList();

            foreach (var car in listOfCars)
            {
                var listOfRents = _unitOfWork.RentRepository.GetByCondition(x => x.CarId == car.Id).ToList();
                var isRented = false;

                foreach (var rent in listOfRents)
                {
                    if ((rent.StartDate <= startDate && startDate <= rent.EndDate) || (rent.StartDate <= endDate && endDate <= rent.EndDate) || (startDate <= rent.StartDate && rent.EndDate <= endDate))
                    {
                        isRented = true;
                        break;
                    }
                }

                if (!isRented)
                    retList.Add(car);
            }
            return retList;
        }

        [HttpGet("notRentedServicesInSomeDateRange/year1={year1}&month1={month1}&day1={day1}&hour1={hour1}&minute1={minute1}&year2={year2}&month2={month2}&day2={day2}&hour2={hour2}&minute2={minute2}")]
        public ActionResult<IEnumerable<RACService>> notRentedServicesInSomeDateRange(int year1, int month1, int day1, int hour1, int minute1, int year2, int month2, int day2, int hour2, int minute2)
        {
            DateTime startDate = new DateTime(year1, month1, day1, hour1, minute1, 0);
            DateTime endDate = new DateTime(year2, month2, day2, hour2, minute2, 0);

            List<RACService> retList = new List<RACService>(); 
            List<RACService> racList = new List<RACService>();

            racList = _unitOfWork.RACServiceRepository.GetAll().ToList();

            foreach (var rac in racList)
            {
                if (!_unitOfWork.CarRepository.Any(x => x.RACServiceId == rac.Id))
                    return NotFound();

                var listOfCars = _unitOfWork.CarRepository.GetByCondition(x => x.RACServiceId == rac.Id).ToList();
                //var isRented = false;
                var boolListRAC = new List<bool>();

                foreach (var car in listOfCars)
                {
                    var listOfRents = _unitOfWork.RentRepository.GetByCondition(x => x.CarId == car.Id).ToList();
                    var boolList = new List<bool>();

                    foreach (var rent in listOfRents)
                    {
                        if ((rent.StartDate <= startDate && startDate <= rent.EndDate) || (rent.StartDate <= endDate && endDate <= rent.EndDate) || (startDate <= rent.StartDate && rent.EndDate <= endDate))
                        {
                            boolList.Add(false);//Dodaju se bool elementi u listu, ukoliko lista ne sadrzi false auto je prihvatljiv
                            break;
                        }
                        else
                        {
                            boolList.Add(true);
                        }
                    }

                    if (boolList.Contains(false))
                    {
                        boolListRAC.Add(false);
                    }
                    else
                    {
                        boolListRAC.Add(true);//Ukoliko se pronasao neki auto u okviru ovog RAC servisa koji je bez rezervacije u datom periodu, odmah se prekida pretraga za taj RAC
                        break;
                    }
                }

                if (boolListRAC.Contains(true))
                    retList.Add(rac);
            }
            
            return retList;
        }
    }
}
