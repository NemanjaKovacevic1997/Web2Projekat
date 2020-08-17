using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class FlightAirport
    {
        public int FlightId { get; set; }
        public Flight Flight { get; set; }

        public int AirportId { get; set; }
        public Airport Airport { get; set; }
    }
}
