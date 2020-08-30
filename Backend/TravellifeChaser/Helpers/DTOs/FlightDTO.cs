using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Helpers.DTOs
{
    public class FlightDTO
    {
        public int FromId { get; set; }
        public int ToId { get; set; }
        public int TakeoffYear { get; set; }
        public int TakeoffMonth { get; set; }
        public int TakeoffDay { get; set; }
        public int TakeoffHours { get; set; }
        public int TakeoffMinutes { get; set; }
        public int LandingYear { get; set; }
        public int LandingMonth { get; set; }
        public int LandingDay { get; set; }
        public int LandingHours { get; set; }
        public int LandingMinutes { get; set; }    
        public int Length { get; set; }
        public double Cost { get; set; }
        public int AirlineId { get; set; }
        public ICollection<int> StopsLocationsIds { get; set; }
    }
}
