using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class AirlineAirport
    {
        public int AirlineId { get; set; }
        public Airline Airline { get; set; }

        public int AirportId { get; set; }
        public Airport Airport { get; set; }
    }
}
