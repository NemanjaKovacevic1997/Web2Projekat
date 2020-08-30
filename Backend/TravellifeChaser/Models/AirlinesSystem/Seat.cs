using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.AirlinesSystem.Enums;

namespace TravellifeChaser.Models
{
    public class Seat
    {
        public int Row { get; set; }
        public int Column { get; set; }
        public int FlightId { get; set; }
        public Flight Flight { get; set; }

        //public Ticket Ticket { get; set; }
        public SeatStatus Status { get; set; }
        public AirplaneClass Class { get; set; }

        public Ticket Ticket { get; set; }
    }
}
