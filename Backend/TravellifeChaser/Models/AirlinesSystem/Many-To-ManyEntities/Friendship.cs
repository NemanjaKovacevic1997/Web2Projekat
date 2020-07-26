using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class Friendship
    {
        public int User1Id { get; set; }
        public RegisteredUser User1 { get; set; }

        public int User2Id { get; set; }
        public RegisteredUser User2 { get; set; }
    }
}
