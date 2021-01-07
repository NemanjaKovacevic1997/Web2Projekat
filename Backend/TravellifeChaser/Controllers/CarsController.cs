using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CarsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Cars
        [HttpGet]
        public ActionResult<IEnumerable<Car>> GetCars()
        {
            return _unitOfWork.CarRepository.GetAll().ToList();
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public ActionResult<Car> GetCar(int id)
        {
            var car = _unitOfWork.CarRepository.Get(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // PUT: api/Cars/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public IActionResult PutCar(int id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest();
            }

            _unitOfWork.CarRepository.Update(car);

            try
            {
                _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
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

        // POST: api/Cars
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public ActionResult<Car> PostCar(Car car)
        {
            _unitOfWork.CarRepository.Add(car);
            _unitOfWork.Save();

            return CreatedAtAction("GetCar", new { id = car.Id }, car);
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        public ActionResult<Car> DeleteCar(int id)
        {
            var car = _unitOfWork.CarRepository.Get(id);
            if (car == null)
            {
                return NotFound();
            }

            _unitOfWork.CarRepository.Remove(car.Id);
            _unitOfWork.Save();

            return car;
        }

        private bool CarExists(int id)
        {
            return _unitOfWork.CarRepository.Any(e => e.Id == id);
        }

        [HttpGet("{id}/racServiceCars")]
        public ActionResult<IEnumerable<Car>> GetRACServiceCars(int id)
        {
            if (!_unitOfWork.CarRepository.Any(x => x.RACServiceId == id))
                return NotFound();


            return _unitOfWork.CarRepository.GetByCondition(x => x.RACServiceId == id).ToList();
        }

        [HttpGet("quickRentCars/year={year}&month={month}&day={day}&location={location}")]
        public ActionResult<IEnumerable<Car>> GetQuickRentCars(int year, int month, int day, string location)
        {
            DateTime date = new DateTime(year, month, day);

            List<Car> retList = new List<Car>();

            if (!_unitOfWork.CarRepository.Any(x=> x.QuickRented == true))
                return NotFound();

            var listOfCarsAll = _unitOfWork.CarRepository.GetByCondition(x => x.QuickRented == true).ToList();
            var listOfCars = new List<Car>();

            foreach (var car in listOfCarsAll)
            {
                var compareDate = new DateTime(car.QuickRentDate.Year, car.QuickRentDate.Month, car.QuickRentDate.Day);
                if (compareDate == date)
                {
                    var rentList = _unitOfWork.RentRepository.GetByCondition(x => x.CarId == car.Id).ToList();
                    var rented = false;
                    foreach (var x in rentList)
                    {
                        var compareDate2 = new DateTime(x.StartDate.Year, x.StartDate.Month, x.StartDate.Day);
                        if (compareDate == compareDate2)
                        {
                            rented = true;
                        }
                    }
                    if (!rented)
                    {
                        listOfCars.Add(car);
                    }
                }
            }

            foreach (var car in listOfCars)
            {
                car.RACService = _unitOfWork.RACServiceRepository.Get(car.RACServiceId);
                var addressList = _unitOfWork.RACAddressRepository.GetByCondition(x => x.RACServiceId == car.RACService.Id).ToList();
                foreach (var address in addressList)
                {
                    var str = address.City + ", " + address.Country;
                    if (str == location) 
                    {
                        retList.Add(car);
                        break;
                    }
                }
            }

            return retList;
        }
    }
}
