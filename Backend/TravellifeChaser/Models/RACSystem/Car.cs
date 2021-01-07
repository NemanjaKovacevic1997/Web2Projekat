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
        public bool Rented { get; set; }
        public bool IsReservedForRent { get; set; }
        public int RACServiceId { get; set; }
        public bool QuickRented { get; set; }
        public DateTime QuickRentDate { get; set; }
        public int QuickRentDiscount { get; set; }
        public RACService RACService { get; set; }
        public ICollection<Rent> Rents { get; set; } = new List<Rent>(); // N : 1  Rent - Car
    }
}
