using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models.RACSystem.Many_To_ManyEntities
{
    public class RACAddressRent
    {
        public int RACAddressId { get; set; }
        public RACAddress RACAddress { get; set; }

        public int RentId { get; set; }
        public Rent Rent { get; set; }
    }
}
