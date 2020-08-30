using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Helpers.DTOs
{
    public class AirlineReportDTO
    {
        public double AverageRating { get; set; }
        public List<DateValueDTO> SoldTicketsByMonth { get; set; }
        public List<DateValueDTO> EarninngsByMonth { get; set; }
    }
}
