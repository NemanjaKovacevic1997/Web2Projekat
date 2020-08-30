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

        /*public int FlightId { get; set; }
        public Flight Flight { get; set; }*/


        public int Row { get; set; }
        public int Column { get; set; }
        public int FlightId { get; set; }
        public Seat Seat { get; set; }

        public double Cost { get; set; }
        public double? Discount { get; set; }

        public bool IsAccepted { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PassportNumber { get; set; }
        public DateTime CreationDateAndTime { get; set; }
        public int CreatorId { get; set; }
    }
}
