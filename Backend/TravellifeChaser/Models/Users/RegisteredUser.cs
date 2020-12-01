using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Models
{
    public class RegisteredUser
    {
        public int Id { get; set; }
        public User User { get; set; }

        public int BounusPoints { get; set; }
        public ICollection<FriendshipRequest> FrendshipRequestsSent { get; set; }  // N : 1 User - FrendshipRequest
        public ICollection<FriendshipRequest> FrendshipRequestsRecieved { get; set; } // N : 1 User - FrendshipRequest

        public ICollection<Invitation> InvitationsSent { get; set; }  // N : 1 User - Invitation
        public ICollection<Invitation> InvitationsRecieved { get; set; } // N : 1 User - Invitation

        public ICollection<Friendship> FriendsTo { get; set; }  // N : 1 User - Frendship
        public ICollection<Friendship> FriendsFrom { get; set; }  // N : 1 User - Frendship

        public ICollection<Ticket> Tickets { get; set; }  //N : 1 User - Ticket
        public ICollection<Rent> Rents { get; set; }  //N : 1 User - Rent

    }
}
