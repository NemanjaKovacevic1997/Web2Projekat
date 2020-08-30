using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.DTOs
{
    public class UserWithoutCredentialsDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public Address Address { get; set; }
        public string MobileNumber { get; set; }
        public UserRole Role { get; set; }

        public UserWithoutCredentialsDTO(User user)
        {
            this.Id = user.Id;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Email = user.Email;
            this.Username = user.Username;
            this.Address = user.Address;
            this.MobileNumber = user.MobileNumber;
            this.Role = user.Role;
        }

        public UserWithoutCredentialsDTO()
        {

        }
    }
}
