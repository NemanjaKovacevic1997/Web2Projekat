﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.AirlinesSystem.Enums;

namespace TravellifeChaser.Models
{
    public class Seat
    {
        public int Id { get; set; }

        public int FlightId { get; set; }
        public Flight Flight { get; set; }

        //public Ticket Ticket { get; set; }
        public SeatStatus Status { get; set; }
        public AirplaneClass Class { get; set; }
    }
}
