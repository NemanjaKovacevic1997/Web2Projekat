using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.DTOs
{
    public class SeatsPerFlightPropertiesDTO
    {
        public int Rows { get; set; }
        public int Columns { get; set; }
        public List<Seat> BookedSeats { get; set; }
        public List<Seat> RemovedSeats { get; set; }
        public int FirstClassEndRow { get; set; }
        public int BuisinessClassEndRow { get; set; }
    }
}
