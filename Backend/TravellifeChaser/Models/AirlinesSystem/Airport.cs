using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class Airport
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }

        public ICollection<AirlineAirport> Airlines { get; set; } = new List<AirlineAirport>();
        public ICollection<FlightAirport> Flights { get; set; } = new List<FlightAirport>();

    
        public ICollection<Flight> FlightsFrom { get; set; } = new List<Flight>();
        public ICollection<Flight> FlightsTo { get; set; } = new List<Flight>();
    }
}
