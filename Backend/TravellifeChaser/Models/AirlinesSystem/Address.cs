using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }

        public ICollection<Airline> Airlines { get; set; } = new List<Airline>();// 1 - N Airline - Address
        public ICollection<Airport> Airports { get; set; } = new List<Airport>();
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
