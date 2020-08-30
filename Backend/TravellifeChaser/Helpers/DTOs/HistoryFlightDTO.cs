using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.AirlinesSystem.Enums;

namespace TravellifeChaser.Helpers.DTOs
{
    public class HistoryFlightDTO
    {
        public int TicketId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int DepartYear { get; set; }
        public int DepartMonth { get; set; }
        public int DepartDay { get; set; }
        public int DepartHours { get; set; }
        public int DepartMinutes { get; set; }
        public int SeatRow { get; set; }
        public int SeatColumn { get; set; }
        public string SeatClass { get; set; }
        public int? ReturnYear { get; set; }
        public int? ReturnMonth { get; set; }
        public int? ReturnDay { get; set; }
        public int? ReturnHours { get; set; }
        public int? ReturnMinutes { get; set; }
    }
}
