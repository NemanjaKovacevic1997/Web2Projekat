using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }
        public string MobileNumber { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }

        public RegisteredUser RegisteredUser { get; set; }
        public AdminAirlinesUser AdminAirlinesUser { get; set; }
        public AdminRACUser AdminRACUser { get; set; }
        public AdminSysUser AdminSysUser { get; set; }
    }
}
