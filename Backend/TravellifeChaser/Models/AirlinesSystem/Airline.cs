using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class Airline
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }

        public string PromotionalDescription { get; set; }

        public double AverageRating { get; set; }

        public int PricelistId { get; set; }
        public Pricelist Pricelist { get; set; }

        public ICollection<Flight> Flights { get; set; } = new List<Flight>(); // N : 1  Airlines - Flight

        public ICollection<AirlineAirport> BuisinessDestinations { get; set; } = new List<AirlineAirport>();

        //public ICollection<Ticket> QuickReservationTickets { get; set; }  Flight has tickets...
        //public int AdminAirlinesUserId { get; set; }
        public AdminAirlinesUser Administrator { get; set; } 
    }
}
