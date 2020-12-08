using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class AdminAirlinesUser
    {
        public int adminId { get; set; }
        public int Id { get; set; }
        public User User { get; set; }

        public int? AirlineId { get; set; }
        public Airline Airline { get; set; }
    }
}
