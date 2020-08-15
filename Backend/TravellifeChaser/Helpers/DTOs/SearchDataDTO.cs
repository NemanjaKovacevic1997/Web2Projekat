using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Helpers.Enums;
using TravellifeChaser.Models.AirlinesSystem.Enums;

namespace TravellifeChaser.Helpers.DTOs
{
    public class SearchDataDTO
    {
        public string From { get; set; }
        public string To { get; set; }
        public int Date1Year { get; set; }
        public int Date1Month { get; set; }
        public int Date1Day { get; set; }
        public int Date2Year { get; set; }
        public int Date2Month { get; set; }
        public int Date2Day { get; set; }
        public TripType TripType { get; set; }
        public int People { get; set; }
        public AirplaneClass AirplaneClass { get; set; }
    }
}
