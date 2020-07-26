using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class Pricelist
    {
        public int Id { get; set; }
        public double LuggageOver10kg { get; set; }
        public double LuggageOver20kg { get; set; }
        public double HandLuggageOverMaxDimensions { get; set; }

        public Airline Airline { get; set; }  // 1 : 1 Airline - Pricelist
    }
}
