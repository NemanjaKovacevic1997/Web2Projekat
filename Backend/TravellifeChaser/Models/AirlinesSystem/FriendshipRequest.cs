using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class FriendshipRequest
    {
        public int Id { get; set; }

        public int FromId { get; set; }
        public RegisteredUser From { get; set; }

        public int ToId { get; set; }
        public RegisteredUser To { get; set; }

        //public bool IsAccepted { get; set; }
    }
}
