using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models;
using TravellifeChaser.Models.AirlinesSystem.Enums;
namespace TravellifeChaser.Helpers.Generators
{
    public class SeatGenerator
    {
        public static List<Seat> GenerateSeatsForFlight(int flightId, int rows, int columns, int firstClassEndRow, int buisinessClassEndRow)
        {
            List<Seat> seats = new List<Seat>();
            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < columns; j++)
                {
                    AirplaneClass currentClass = AirplaneClass.Economy;
                    if (i <= firstClassEndRow)
                        currentClass = AirplaneClass.First;
                    else if (i > firstClassEndRow && i <= buisinessClassEndRow)
                        currentClass = AirplaneClass.Business;

                    Seat seat = new Seat() { Row = i, Column = j, FlightId = flightId, Class = currentClass, Status = SeatStatus.Free };
                    seats.Add(seat);
                }
            }

            return seats;
        }
    }
}
