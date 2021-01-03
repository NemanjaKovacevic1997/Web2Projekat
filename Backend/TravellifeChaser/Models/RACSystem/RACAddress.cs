using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.RACSystem.Many_To_ManyEntities;

namespace TravellifeChaser.Models.RACSystem
{
    public class RACAddress
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int Number { get; set; }
        public bool IsMain { get; set; }
        public bool IsUsedForRent { get; set; }
        public RACService RACService { get; set; }
        public int RACServiceId { get; set; }
        public ICollection<RACAddressRent> RACAddressRents { get; set; } = new List<RACAddressRent>();
        public ICollection<Rent> RentStarts { get; set; } = new List<Rent>();
        public ICollection<Rent> RentEnds { get; set; } = new List<Rent>();
    }
}
