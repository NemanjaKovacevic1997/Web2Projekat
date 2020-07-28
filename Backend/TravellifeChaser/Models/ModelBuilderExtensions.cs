using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravellifeChaser.Models
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            Address addr1 = new Address() { Id = 1, City = "Gajdobra", Country = "Serbia" };
            Address addr2 = new Address() { Id = 2, City = "Pecinci", Country = "Serbia" };
            Address addr3 = new Address() { Id = 3, City = "Novi Sad", Country = "Serbia" };
            Address addr4 = new Address() { Id = 4, City = "Beograd", Country = "Serbia" , Latitude = 44.8205, Longitude = 20.2917 };
            Address addr5 = new Address() { Id = 5, City = "Nis", Country = "Serbia", Latitude = 43.3376, Longitude = 21.8663 };
            Address addr6 = new Address() { Id = 6, City = "Istanbul", Country = "Turkey" , Latitude = 41.0082, Longitude = 28.9784 };
            Address addr7 = new Address() { Id = 7, City = "Doha", Country = "Qatar", Latitude = 25.2783, Longitude = 51.5520 };
            Address addr8 = new Address() { Id = 8, City = "London", Country = "England", Latitude = 51.4700, Longitude = 0.4543 };
            Address addr9 = new Address() { Id = 9, City = "Paris", Country = "France", Latitude = 49.0097, Longitude = 2.5479 };

            User u1 = new User() { Id = 1, FirstName = "Nemanja", LastName = "Kovacevic", Username = "kovac123", Email = "kovacevicnemanja1997@gmail.com", Password = "kovac123", MobileNumber = "+381604520858", AddressId = addr1.Id, Role = UserRole.Registered };
            RegisteredUser ru1 = new RegisteredUser() { Id = u1.Id };

            User u2 = new User() { Id = 2, FirstName = "Radovan", LastName = "Trudic", Username = "rasaBrt", Email = "radovan.trudic@gmail.com", Password = "rasa123", MobileNumber = "+381650000000", AddressId = addr2.Id, Role = UserRole.Registered };
            RegisteredUser ru2 = new RegisteredUser() { Id = u2.Id };

            User u3 = new User() { Id = 3, FirstName = "Marko", LastName = "Markovic", Username = "markooo", Email = "marko.markovic@gmail.com", Password = "marko123", MobileNumber = "+381651111111", AddressId = addr3.Id, Role = UserRole.Registered };
            AdminAirlinesUser ru3 = new AdminAirlinesUser() { Id = u3.Id };

            FriendshipRequest fr1 = new FriendshipRequest() { Id = 1, FromId = 1, ToId = 2 };

            Pricelist pl1 = new Pricelist() { Id = 1, HandLuggageOverMaxDimensions = 3, LuggageOver10kg = 5, LuggageOver20kg = 10 };
            Pricelist pl2 = new Pricelist() { Id = 2, HandLuggageOverMaxDimensions = 4, LuggageOver10kg = 6, LuggageOver20kg = 12 };

            Airline airline1 = new Airline() { Id = 1, Name = "Turkish Airlines", AddressId = addr6.Id, AverageRating = 9.12, PricelistId = pl1.Id, PromotionalDescription = "Widen Your World", };
            Airline airline2 = new Airline() { Id = 2, Name = "Qatar Airways", AddressId = addr7.Id, AverageRating = 8.73, PricelistId = pl2.Id, PromotionalDescription = "Going Places Together" };

            Airport airport1 = new Airport() { Id = 1, AddressId = addr4.Id, Name = "Nikola Tesla" };
            Airport airport2 = new Airport() { Id = 2, AddressId = addr8.Id, Name = "Heathrow" };
            Airport airport3 = new Airport() { Id = 3, AddressId = addr9.Id, Name = "Charles de Gaulle" };

            AirlineAirport aa1 = new AirlineAirport() { AirlineId = 1, AirportId = 1 };
            AirlineAirport aa2 = new AirlineAirport() { AirlineId = 1, AirportId = 2 };
            AirlineAirport aa3 = new AirlineAirport() { AirlineId = 1, AirportId = 3 };
            AirlineAirport aa4 = new AirlineAirport() { AirlineId = 2, AirportId = 1 };
            AirlineAirport aa5 = new AirlineAirport() { AirlineId = 2, AirportId = 2 };

            var TakeoffTime1 = new DateTime(2020, 6, 2, 15, 0, 0);
            var LandingTime1 = new DateTime(2020, 6, 2, 20, 30, 0);
            var Duration1 = LandingTime1.Subtract(TakeoffTime1).TotalMinutes;

            var TakeoffTime2 = new DateTime(2020, 6, 3, 3, 0, 0);
            var LandingTime2 = new DateTime(2020, 6, 3, 3, 30, 0);
            var Duration2 = LandingTime2.Subtract(TakeoffTime2).TotalMinutes;

            var TakeoffTime3 = new DateTime(2020, 6, 5, 20, 15, 0);
            var LandingTime3 = new DateTime(2020, 6, 6, 4, 0, 0);
            var Duration3 = LandingTime3.Subtract(TakeoffTime3).TotalMinutes;

            Flight f1 = new Flight() { 
                Id = 1,
                FromId = airport1.Id,
                ToId = airport2.Id,
                Cost = 300,
                AirlineId = airline1.Id,
                AverageRating = 4.67,
                TakeoffTime = TakeoffTime1,
                LandingTime = LandingTime1,
                Duration = Duration1,
                Length = 2506,
            };

            Flight f2 = new Flight()
            {
                Id = 2,
                FromId = airport1.Id,
                ToId = airport3.Id,
                Cost = 250,
                AirlineId = airline2.Id,
                AverageRating = 3.67,
                TakeoffTime = TakeoffTime2,
                LandingTime = LandingTime2,
                Duration = Duration2,
                Length = 1003,
            };


            Flight f3 = new Flight()
            {
                Id = 3,
                FromId = airport2.Id,
                ToId = airport3.Id,
                Cost = 100,
                AirlineId = airline1.Id,
                AverageRating = 4.30,
                TakeoffTime = TakeoffTime3,
                LandingTime = LandingTime3,
                Duration = Duration3,
                Length = 400,
            };

            modelBuilder.Entity<Address>().HasData(addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9);
            modelBuilder.Entity<User>().HasData(u1, u2, u3);
            modelBuilder.Entity<RegisteredUser>().HasData(ru1, ru2, ru3);
            modelBuilder.Entity<FriendshipRequest>().HasData(fr1);
            modelBuilder.Entity<Pricelist>().HasData(pl1, pl2);
            modelBuilder.Entity<Airline>().HasData(airline1, airline2);
            modelBuilder.Entity<Airport>().HasData(airport1, airport2, airport3);
            modelBuilder.Entity<AirlineAirport>().HasData(aa1, aa2, aa3, aa4, aa5);
            modelBuilder.Entity<Flight>().HasData(f1, f2, f3);
        }
    }
}
