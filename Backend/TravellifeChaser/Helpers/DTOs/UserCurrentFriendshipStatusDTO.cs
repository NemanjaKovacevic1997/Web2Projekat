using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Helpers.Enums;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.DTOs
{
    public class UserCurrentFriendshipStatusDTO
    {
        public User User { get; set; }
        public UserCurrentFriendshipStatus CurrentFriendshipStatus { get; set; }
    }
}
