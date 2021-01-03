using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Helpers.DTOs
{
    public class RACReportDTO
    {
        public double AverageEarningsByDay { get; set; }
        public double AverageEarningsByWeek { get; set; }
        public double AverageEarningsByMonth { get; set; }
        public List<DateValueDTO> RentedCarsByDay { get; set; }
        public List<DateValueDTO> EarningsByDay { get; set; }
        public List<DateValueDTO> RentedCarsByWeek { get; set; }
        public List<DateValueDTO> EarningsByWeek { get; set; }
        public List<DateValueDTO> RentedCarsByMonth { get; set; }
        public List<DateValueDTO> EarningsByMonth { get; set; }
    }
}
