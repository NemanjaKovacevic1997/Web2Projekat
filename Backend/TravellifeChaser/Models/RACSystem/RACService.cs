using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models.RACSystem
{
    public class RACService
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PromotionalDescription { get; set; }
        public double Rating { get; set; }
        public string PriceList { get; set; }
        public string Logo { get; set; }
        public ICollection<RACAddress> RACAddresses { get; set; } = new List<RACAddress>();
        public ICollection<Car> Cars { get; set; } = new List<Car>();
        //public ICollection<Rent> Rents { get; set; } = new List<Rent>();
        public AdminRACUser AdminRACUser { get; set; }
        public AdminSysUser AdminSysUser { get; set; }
        //public int AdminSysUserId { get; set; }
    }
}
