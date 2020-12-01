using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Models
{
    public class AdminSysUser 
    { 
        public int Id { get; set; }
        public User User { get; set; }
        public bool Predefined { get; set; }
        public ICollection<RACService> RACServices { get; set; } = new List<RACService>();
        public ICollection<Airline> Airlines { get; set; } = new List<Airline>();
    }
}
