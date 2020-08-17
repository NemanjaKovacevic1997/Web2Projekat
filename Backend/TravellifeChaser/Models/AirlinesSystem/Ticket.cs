using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        public int? UserId { get; set; }
        public RegisteredUser User { get; set; }

        public int FlightId { get; set; }
        public Flight Flight { get; set; }


        public int SeatNumber { get; set; }

        public double Cost { get; set; }
        public double? Discount { get; set; }

        public bool IsQuickTicket { get; set; }
    }
}
