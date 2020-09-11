using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models.RACSystem
{
    public class Car
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string Mark { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
        public int Seats { get; set; }
        public double Rating { get; set; }
        public double DailyPrice { get; set; }
        public string Image { get; set; }//u bazi cuvati putanje do slika koje ce biti smestene u folderu Images
        //public int RACServiceId { get; set; }
        //public RACService RACService { get; set; }
        //public ICollection<Car> Cars { get; set; } = new List<Car>(); // N : 1  Car - RACService
    }
}
