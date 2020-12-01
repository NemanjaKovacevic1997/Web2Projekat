using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.RACSystem.Many_To_ManyEntities;

namespace TravellifeChaser.Models.RACSystem
{
    public class Rent
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Price { get; set; }
        public int RatingForRACService { get; set; }
        public int RatingForCar { get; set; }
        public int StartRACAddressId { get; set; }
        public RACAddress StartRACAddress { get; set; }
        public int EndRACAddressId { get; set; }
        public RACAddress EndRACAddress { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
        //public int RACServiceId { get; set; }
        //public RACService RACService { get; set; }
        public int RegisteredUserId { get; set; }
        public RegisteredUser RegisteredUser { get; set; }
        public ICollection<RACAddressRent> RACAddressRents { get; set; } = new List<RACAddressRent>();

        /*x.HasOne(x => x.RACService)
                .WithMany(x => x.Rents)
                .HasForeignKey(x => x.RACServiceId)
                .OnDelete(DeleteBehavior.Cascade);

                x.HasOne(x => x.Car)
                .WithMany(x => x.Rents)
                .HasForeignKey(x => x.CarId)
                .OnDelete(DeleteBehavior.Cascade);

                x.HasOne(x => x.RegisteredUser)
                .WithMany(x => x.Rents)
                .HasForeignKey(x => x.RegistredUserId)
                .OnDelete(DeleteBehavior.Cascade);*/
    }
}
