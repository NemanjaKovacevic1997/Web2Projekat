using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class Flight
    {
        public int Id { get; set; }

        public int FromId { get; set; }
        public Airport From { get; set; }

        public int ToId { get; set; }
        public Airport To { get; set; }

        public DateTime TakeoffTime { get; set; }
        public DateTime LandingTime { get; set; }
        public double Duration { get; set; }
        public int Length { get; set; }
        public double Cost { get; set; }
        public double AverageRating { get; set; }

        public int AirlineId { get; set; }
        public Airline Airline { get; set; }

        public ICollection<FlightAirport> StopsLocations { get; set; } = new List<FlightAirport>();

        public ICollection<Invitation> Invitations { get; set; } = new List<Invitation>(); // 1 : N Invitation - Flight
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();// 1 : N Ticket - Flight
        //public ICollection<QuickTicket> QuickTickets { get; set; }  // 1 : N QuickTicket - Flight

        public ICollection<Seat> Seats { get; set; } = new List<Seat>(); // 1 : N Seat - Flight
    }
}
