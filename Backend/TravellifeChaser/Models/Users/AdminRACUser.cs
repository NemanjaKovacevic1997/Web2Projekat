using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Models
{
    public class AdminRACUser
    {
        public int adminId { get; set; } 
        public int Id { get; set; }
        public User User { get; set; }

        public int? RACServiceId { get; set; }
        public RACService RACService { get; set; }
    }
}
