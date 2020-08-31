using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Helpers.Generators;

namespace TravellifeChaser.Models
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            Address addr1 = new Address() { Id = 1, City = "Gajdobra", Country = "Serbia" };
            Address addr2 = new Address() { Id = 2, City = "Pecinci", Country = "Serbia" };
            Address addr3 = new Address() { Id = 3, City = "Novi Sad", Country = "Serbia" };
            Address addr4 = new Address() { Id = 4, City = "Belgrade", Country = "Serbia" , Latitude = 44.8205, Longitude = 20.2917 };
            Address addr5 = new Address() { Id = 5, City = "Nis", Country = "Serbia", Latitude = 43.3376, Longitude = 21.8663 };
            Address addr6 = new Address() { Id = 6, City = "Istanbul", Country = "Turkey" , Latitude = 41.0082, Longitude = 28.9784 };
            Address addr7 = new Address() { Id = 7, City = "Doha", Country = "Qatar", Latitude = 25.2783, Longitude = 51.5520 };
            Address addr8 = new Address() { Id = 8, City = "London", Country = "England", Latitude = 51.4700, Longitude = 0.4543 };
            Address addr9 = new Address() { Id = 9, City = "Paris", Country = "France", Latitude = 49.0097, Longitude = 2.5479 };
            Address addr10 = new Address() { Id = 10, City = "Sremska Mitrovica", Country = "Serbia" };
            Address addr11 = new Address() { Id = 11, City = "Smederevo", Country = "Serbia" };
            Address addr12 = new Address() { Id = 12, City = "Krusevac", Country = "Serbia" };
            Address addr13 = new Address() { Id = 13, City = "Subotica", Country = "Serbia" };
            Address addr14 = new Address() { Id = 14, City = "Munich", Country = "Deuschland", Latitude = 48.35388889, Longitude = 11.78611111 };
            Address addr15 = new Address() { Id = 15, City = "Lisbon", Country = "Portugal", Latitude = 38.77416667, Longitude = 38.77416667 };
            Address addr16 = new Address() { Id = 16, City = "Madrid", Country = "Spain", Latitude = 49.0097, Longitude = 2.5479 };
            Address addr17 = new Address() { Id = 17, City = "Brussel", Country = "Belgium", Latitude = 50.90138889, Longitude = 4.48444444 };
            Address addr18 = new Address() { Id = 18, City = "Amsterdam", Country = "Netherland", Latitude = 52.30805556, Longitude = 4.76416667 };
            Address addr19 = new Address() { Id = 19, City = "Moscow", Country = "Russia", Latitude = 55.97277778, Longitude = 37.41472222 };
         
            Address addr20 = new Address() { Id = 20, City = "Harmondsworth", Country = "England", Latitude = 51.4865, Longitude = -0.4796 };
            Address addr21 = new Address() { Id = 21, City = "Abu Dhabi", Country = "UAE", Latitude = 24.466667, Longitude = 54.366669 };
            Address addr22 = new Address() { Id = 22, City = "Dubai", Country = "UAE", Latitude = 25.276987, Longitude = 55.296249 };
            
            User u1 = new User() { Id = 1, FirstName = "Nemanja", LastName = "Kovacevic", Username = "nemanja123", Email = "kovacevicnemanja1997@gmail.com", Password = "nemanja123", MobileNumber = "+381604520858", AddressId = addr1.Id, Role = UserRole.Registered };
            RegisteredUser ru1 = new RegisteredUser() { Id = u1.Id, BounusPoints = 0 };

            User u2 = new User() { Id = 2, FirstName = "Radovan", LastName = "Trudic", Username = "radovan123", Email = "kovacevicnemanja1997@gmail.com", Password = "radovan123", MobileNumber = "+381650000000", AddressId = addr2.Id, Role = UserRole.Registered };
            RegisteredUser ru2 = new RegisteredUser() { Id = u2.Id, BounusPoints = 0 };

            User u3 = new User() { Id = 3, FirstName = "Lana", LastName = "Kovacevic", Username = "lana123", Email = "kovacevicnemanja1997@gmail.com", Password = "lana123", MobileNumber = "+381604520858", AddressId = addr11.Id, Role = UserRole.Registered };
            RegisteredUser ru3 = new RegisteredUser() { Id = u3.Id };

            User u4 = new User() { Id = 4, FirstName = "Milovan", LastName = "Zec", Username = "milovan123", Email = "kovacevicnemanja1997@gmail.com", Password = "milovan123", MobileNumber = "+381604520858", AddressId = addr10.Id, Role = UserRole.Registered };
            RegisteredUser ru4 = new RegisteredUser() { Id = u4.Id, BounusPoints = 0 };

            User u5 = new User() { Id = 5, FirstName = "Milica", LastName = "Krivokapic", Username = "milica123", Email = "kovacevicnemanja1997@gmail.com", Password = "milica123", MobileNumber = "+381604520858", AddressId = addr11.Id, Role = UserRole.Registered };
            RegisteredUser ru5 = new RegisteredUser() { Id = u5.Id, BounusPoints = 0 };

            User u6 = new User() { Id = 6, FirstName = "Mitar", LastName = "Miric", Username = "mitar123", Email = "kovacevicnemanja1997@gmail.com", Password = "mitar123", MobileNumber = "+381604520858", AddressId = addr12.Id, Role = UserRole.Registered };
            RegisteredUser ru6 = new RegisteredUser() { Id = u6.Id, BounusPoints = 0 };


            FriendshipRequest fr1 = new FriendshipRequest() { Id = 1, FromId = 1, ToId = 2 };
            FriendshipRequest fr2 = new FriendshipRequest() { Id = 2, FromId = 3, ToId = 1 };
            Friendship friendship1 = new Friendship() { User1Id = 1, User2Id = 4 };
            Friendship friendship2 = new Friendship() { User1Id = 1, User2Id = 6 };

            Pricelist pl1 = new Pricelist() { Id = 1, HandLuggageOverMaxDimensions = 3, LuggageOver10kg = 5, LuggageOver20kg = 10 };
            Pricelist pl2 = new Pricelist() { Id = 2, HandLuggageOverMaxDimensions = 4, LuggageOver10kg = 6, LuggageOver20kg = 12 };
            Pricelist pl3 = new Pricelist() { Id = 3, HandLuggageOverMaxDimensions = 4, LuggageOver10kg = 6, LuggageOver20kg = 12 };
            Pricelist pl4 = new Pricelist() { Id = 4, HandLuggageOverMaxDimensions = 4, LuggageOver10kg = 6, LuggageOver20kg = 12 };
            Pricelist pl5 = new Pricelist() { Id = 5, HandLuggageOverMaxDimensions = 4, LuggageOver10kg = 6, LuggageOver20kg = 12 };
            Pricelist pl6 = new Pricelist() { Id = 6, HandLuggageOverMaxDimensions = 4, LuggageOver10kg = 6, LuggageOver20kg = 12 };

            Airline airline1 = new Airline() { Id = 1, Name = "Turkish Airlines", AddressId = addr6.Id, AverageRating = 9.12, PricelistId = pl1.Id, PromotionalDescription = "Widen Your World", };
            Airline airline2 = new Airline() { Id = 2, Name = "Qatar Airways", AddressId = addr7.Id, AverageRating = 8.73, PricelistId = pl2.Id, PromotionalDescription = "Going Places Together" };
            Airline airline3 = new Airline() { Id = 3, Name = "Emirates", AddressId = addr22.Id, AverageRating = 9.12, PricelistId = pl3.Id, PromotionalDescription = "Enjoy flight", };  //dubai
            Airline airline4 = new Airline() { Id = 4, Name = "Etihad Airways", AddressId = addr21.Id, AverageRating = 8.73, PricelistId = pl4.Id, PromotionalDescription = "With you" }; //abu dabi
            Airline airline5 = new Airline() { Id = 5, Name = "British Airways", AddressId = addr20.Id, AverageRating = 9.12, PricelistId = pl5.Id, PromotionalDescription = "With you", }; //Harmondsworth
            Airline airline6 = new Airline() { Id = 6, Name = "Air Serbia", AddressId = addr4.Id, AverageRating = 8.04, PricelistId = pl6.Id, PromotionalDescription = "Fly with us" }; //Belgrade

            User u7 = new User() { Id = 7, FirstName = "Marija", LastName = "Miric", Username = "marijaaa", Email = "marijamiric@gmail.com", Password = "marijaaaa", MobileNumber = "+381604520858", AddressId = addr15.Id, Role = UserRole.AdminAirlines };
            AdminAirlinesUser ru7 = new AdminAirlinesUser() { Id = u7.Id, AirlineId = 1 };

            User u8 = new User() { Id = 8, FirstName = "Milica", LastName = "Miric", Username = "milicaaa", Email = "milicamiric@gmail.com", Password = "milicaaaa", MobileNumber = "+381604520858", AddressId = addr13.Id, Role = UserRole.AdminAirlines };
            AdminAirlinesUser ru8 = new AdminAirlinesUser() { Id = u8.Id, AirlineId = 2 };

            Airport airport1 = new Airport() { Id = 1, AddressId = addr4.Id, Name = "Nikola Tesla" };
            Airport airport2 = new Airport() { Id = 2, AddressId = addr8.Id, Name = "Heathrow" };
            Airport airport3 = new Airport() { Id = 3, AddressId = addr9.Id, Name = "Charles de Gaulle" };
            Airport airport4 = new Airport() { Id = 4, AddressId = addr16.Id, Name = "Adolfo Suárez" };
            Airport airport5 = new Airport() { Id = 5, AddressId = addr15.Id, Name = "Humberto Delgado" };
            Airport airport6 = new Airport() { Id = 6, AddressId = addr14.Id, Name = "Munich Airport" };
            Airport airport7 = new Airport() { Id = 7, AddressId = addr17.Id, Name = "Brussel-Nationaal" };
            Airport airport8 = new Airport() { Id = 8, AddressId = addr19.Id, Name = "Sheremetyevo" };
            Airport airport9 = new Airport() { Id = 9, AddressId = addr18.Id, Name = "Schiphol" };

          

            AirlineAirport aa1 = new AirlineAirport() { AirlineId = 1, AirportId = 1 };
            AirlineAirport aa2 = new AirlineAirport() { AirlineId = 1, AirportId = 2 };
            AirlineAirport aa3 = new AirlineAirport() { AirlineId = 1, AirportId = 3 };
            AirlineAirport aa4 = new AirlineAirport() { AirlineId = 1, AirportId = 4 };
            AirlineAirport aa5 = new AirlineAirport() { AirlineId = 1, AirportId = 6 };
            AirlineAirport aa6 = new AirlineAirport() { AirlineId = 1, AirportId = 7 };
            AirlineAirport aa7 = new AirlineAirport() { AirlineId = 2, AirportId = 1 };
            AirlineAirport aa8 = new AirlineAirport() { AirlineId = 2, AirportId = 2 };
            AirlineAirport aa9 = new AirlineAirport() { AirlineId = 2, AirportId = 4 };
            AirlineAirport aa10 = new AirlineAirport() { AirlineId = 2, AirportId = 5 };
            AirlineAirport aa11 = new AirlineAirport() { AirlineId = 2, AirportId = 6 };
            AirlineAirport aa12 = new AirlineAirport() { AirlineId = 2, AirportId = 8 };
            AirlineAirport aa13 = new AirlineAirport() { AirlineId = 2, AirportId = 9 };

            var TakeoffTime1 = new DateTime(2020, 9, 7, 13, 0, 0);
            var LandingTime1 = new DateTime(2020, 9, 7, 17, 30, 0);
            var Duration1 = LandingTime1.Subtract(TakeoffTime1).TotalMinutes;

            var TakeoffTime2 = new DateTime(2020, 9, 7, 7, 40, 0);
            var LandingTime2 = new DateTime(2020, 9, 7, 9, 20, 0);
            var Duration2 = LandingTime2.Subtract(TakeoffTime2).TotalMinutes;

            var TakeoffTime3 = new DateTime(2020, 9, 8, 12, 15, 0);
            var LandingTime3 = new DateTime(2020, 9, 8, 15, 0, 0);
            var Duration3 = LandingTime3.Subtract(TakeoffTime3).TotalMinutes;

            var TakeoffTime4 = new DateTime(2020, 9, 8, 14, 0, 0);
            var LandingTime4 = new DateTime(2020, 9, 8, 19, 30, 0);
            var Duration4 = LandingTime4.Subtract(TakeoffTime4).TotalMinutes;

            var TakeoffTime5 = new DateTime(2020, 9, 9, 15, 0, 0);
            var LandingTime5 = new DateTime(2020, 9, 9, 19, 30, 0);
            var Duration5 = LandingTime5.Subtract(TakeoffTime5).TotalMinutes;

            var TakeoffTime6 = new DateTime(2020, 9, 10, 18, 0, 0);
            var LandingTime6 = new DateTime(2020, 9, 10, 19, 30, 0);
            var Duration6 = LandingTime6.Subtract(TakeoffTime6).TotalMinutes;

            var TakeoffTime7 = new DateTime(2020, 9, 11, 7, 0, 0);
            var LandingTime7 = new DateTime(2020, 9, 11, 8, 30, 0);
            var Duration7 = LandingTime7.Subtract(TakeoffTime7).TotalMinutes;

            var TakeoffTime8 = new DateTime(2020, 9, 11, 9, 0, 0);
            var LandingTime8 = new DateTime(2020, 9, 11, 10, 30, 0);
            var Duration8 = LandingTime8.Subtract(TakeoffTime8).TotalMinutes;

            var TakeoffTime9 = new DateTime(2020, 9, 12, 9, 0, 0);
            var LandingTime9 = new DateTime(2020, 9, 12, 11, 20, 0);
            var Duration9 = LandingTime9.Subtract(TakeoffTime9).TotalMinutes;

            var TakeoffTime10 = new DateTime(2020, 9, 12, 14, 0, 0);
            var LandingTime10 = new DateTime(2020, 9, 12, 20, 30, 0);
            var Duration10 = LandingTime10.Subtract(TakeoffTime10).TotalMinutes;

            int rows = 20;
            int columns = 9;
            int firstClassEndRow = 3, buisinessClassEndRow = 8;

            Flight f1 = new Flight() { 
                Id = 1,
                FromId = 1,
                ToId = 2,
                Cost = 300,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime1,
                LandingTime = LandingTime1,
                Duration = Duration1,
                Length = 2506,
            };

            
            Flight f2 = new Flight()
            {
                Id = 2,
                FromId = 1,
                ToId = 3,
                Cost = 250,
                AirlineId = airline2.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime2,
                LandingTime = LandingTime2,
                Duration = Duration2,
                Length = 1003,
            };

            Flight f3 = new Flight()
            {
                Id = 3,
                FromId = 2,
                ToId = 3,
                Cost = 100,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime3,
                LandingTime = LandingTime3,
                Duration = Duration3,
                Length = 400,
            };

            Flight f4 = new Flight()
            {
                Id = 4,
                FromId = 4,
                ToId = 5,
                Cost = 200,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime4,
                LandingTime = LandingTime4,
                Duration = Duration4,
                Length = 500,
            };

            Flight f5 = new Flight()
            {
                Id = 5,
                FromId = 5,
                ToId = 4,
                Cost = 300,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime5,
                LandingTime = LandingTime5,
                Duration = Duration5,
                Length = 250,
            };

            Flight f6 = new Flight()
            {
                Id = 6,
                FromId = 7,
                ToId = 9,
                Cost = 300,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime6,
                LandingTime = LandingTime6,
                Duration = Duration6,
                Length = 567,
            };

            Flight f7 = new Flight()
            {
                Id = 7,
                FromId = 3,
                ToId = 7,
                Cost = 300,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime7,
                LandingTime = LandingTime7,
                Duration = Duration7,
                Length = 567,
            };

            Flight f8 = new Flight()
            {
                Id = 8,
                FromId = 6,
                ToId = 8,
                Cost = 301,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime8,
                LandingTime = LandingTime8,
                Duration = Duration8,
                Length = 567,
            };

            Flight f9 = new Flight()
            {
                Id = 9,
                FromId = 6,
                ToId = 8,
                Cost = 250,
                AirlineId = airline2.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime8,
                LandingTime = LandingTime8,
                Duration = Duration8,
                Length = 300,
            };

            Flight f10 = new Flight()
            {
                Id = 10,
                FromId = 6,
                ToId = 8,
                Cost = 450,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime8,
                LandingTime = LandingTime8,
                Duration = Duration8,
                Length = 600,
            };

            Flight f11 = new Flight()
            {
                Id = 11,
                FromId = 6,
                ToId = 8,
                Cost = 100,
                AirlineId = airline2.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime8,
                LandingTime = LandingTime8,
                Duration = Duration8,
                Length = 1000,
            };

            Flight f12 = new Flight()
            {
                Id = 12,
                FromId = 5,
                ToId = 9,
                Cost = 305,
                AirlineId = airline1.Id,
                AverageRating = 0,
                TakeoffTime = TakeoffTime9,
                LandingTime = LandingTime9,
                Duration = Duration9,
                Length = 555,
            };

            int flightsNumber = 12;
            List<Seat> seats = new List<Seat>();
            for (int i = 1; i <= flightsNumber; i++)
                seats.AddRange(SeatGenerator.GenerateSeatsForFlight(i, rows, columns, firstClassEndRow, buisinessClassEndRow));

            Seat seat;

            Ticket t1 = new Ticket()
            {
                Id = 1,
                UserId = 1,
                Row = 3,
                Column = 5,
                FlightId = 7,
                Cost = 400,
                Discount = 10,
                IsAccepted = true,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 3, 14, 30, 11),
                CreatorId = 1
            };  

            Ticket t2 = new Ticket()
            {
                Id = 2,
                UserId = 2,
                Row = 8,
                Column = 5,
                FlightId = 8,
                Cost = 400,
                Discount = 10,
                IsAccepted = true,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 4, 14, 30, 11),
                CreatorId = 1
            };

            Ticket t3 = new Ticket()
            {
                Id = 3,
                UserId = 3,
                Row = 9,
                Column = 5,
                FlightId = 10,
                Cost = 200,
                Discount = 10,
                IsAccepted = true,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 4, 14, 30, 11),
                CreatorId = 1
            };



            Ticket t4 = new Ticket()
            {
                Id = 4,
                UserId = 4,
                Row = 13,
                Column = 5,
                FlightId = 7,
                Cost = 400,
                Discount = 10,
                IsAccepted = true,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 25, 14, 30, 11),
                CreatorId = 1
            };

            Ticket t5 = new Ticket()
            {
                Id = 5,
                UserId = 1,
                Row = 15,
                Column = 5,
                FlightId = 8,
                Cost = 300,
                Discount = 10,
                IsAccepted = true,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 25, 14, 30, 11),
                CreatorId = 1
            };

            Ticket t6 = new Ticket()
            {
                Id = 6,
                UserId = 2,
                Row = 5,
                Column = 5,
                FlightId = 10,
                Cost = 150,
                Discount = 10,
                IsAccepted = true,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 26, 14, 30, 11),
                CreatorId = 1
            };

            Ticket t7 = new Ticket()
            {
                Id = 7,
                UserId = 3,
                Row = 1,
                Column = 5,
                FlightId = 7,
                Cost = 160,
                Discount = 10,
                IsAccepted = true,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 28, 14, 30, 11),
                CreatorId = 1
            };

            Ticket t8 = new Ticket()
            {
                Id = 8,
                UserId = 4,
                Row = 18,
                Column = 5,
                FlightId = 8,
                Cost = 124,
                Discount = 10,
                IsAccepted = true,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 1
            };


            //fast tickets : tickets that have undefined user and not yet accepted.

            Ticket t9 = new Ticket()
            {
                Id = 9,
                UserId = null,
                Row = 3,
                Column = 6,
                FlightId = 1,
                Cost = 500,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };

            Ticket t10 = new Ticket()
            {
                Id = 10,
                UserId = null,
                Row = 10,
                Column = 6,
                FlightId = 3,
                Cost = 320,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };

            Ticket t11 = new Ticket()
            {
                Id = 11,
                UserId = null,
                Row = 12,
                Column = 7,
                FlightId = 4,
                Cost = 500,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };
            Ticket t12 = new Ticket()
            {
                Id = 12,
                UserId = null,
                Row = 13,
                Column = 8,
                FlightId = 5,
                Cost = 400,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };

            Ticket t13 = new Ticket()
            {
                Id = 13,
                UserId = null,
                Row = 3,
                Column = 7,
                FlightId = 6,
                Cost = 300,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };

            Ticket t14 = new Ticket()
            {
                Id = 14,
                UserId = null,
                Row = 0,
                Column = 8,
                FlightId = 7,
                Cost = 260,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };

            Ticket t15 = new Ticket()
            {
                Id = 15,
                UserId = null,
                Row = 5,
                Column = 5,
                FlightId = 12,
                Cost = 259,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };

            Ticket t16 = new Ticket()
            {
                Id = 16,
                UserId = null,
                Row = 15,
                Column = 3,
                FlightId = 8,
                Cost = 600,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };

            Ticket t17 = new Ticket()
            {
                Id = 17,
                UserId = null,
                Row = 4,
                Column = 2,
                FlightId = 8,
                Cost = 156,
                Discount = 10,
                IsAccepted = false,
                PassportNumber = "134214412",
                CreationDateAndTime = new DateTime(2020, 8, 29, 14, 30, 11),
                CreatorId = 7
            };

            List<Ticket> tickets = new List<Ticket>();
            tickets.Add(t1);
            tickets.Add(t2);
            tickets.Add(t3);
            tickets.Add(t4);
            tickets.Add(t5);
            tickets.Add(t6);
            tickets.Add(t7);
            tickets.Add(t8);
            tickets.Add(t9);
            tickets.Add(t10);
            tickets.Add(t11);
            tickets.Add(t12);
            tickets.Add(t13);
            tickets.Add(t14);
            tickets.Add(t15);
            tickets.Add(t16);
            tickets.Add(t17);
            foreach (var ticket in tickets)
            {
                seat = seats.Find(x => x.Row == ticket.Row && x.Column == ticket.Column && x.FlightId == ticket.FlightId);
                seat.Status = SeatStatus.Taken;
            }

            modelBuilder.Entity<Address>().HasData(addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10,
                                                   addr11, addr12, addr13, addr14, addr15, addr16, addr17, addr18, addr19,
                                                   addr20, addr21, addr22);
            modelBuilder.Entity<User>().HasData(u1, u2, u3, u4, u5, u6, u7, u8);
            modelBuilder.Entity<RegisteredUser>().HasData(ru1, ru2, ru3, ru4, ru5, ru6);
            modelBuilder.Entity<AdminAirlinesUser>().HasData(ru7, ru8);
            modelBuilder.Entity<FriendshipRequest>().HasData(fr1, fr2);
            modelBuilder.Entity<Friendship>().HasData(friendship1, friendship2);
            modelBuilder.Entity<Pricelist>().HasData(pl1, pl2, pl3, pl4, pl5, pl6);
            modelBuilder.Entity<Airline>().HasData(airline1, airline2, airline3, airline4, airline5, airline6);
            modelBuilder.Entity<Airport>().HasData(airport1, airport2, airport3, airport4, airport5, airport6, airport7, airport8, airport9);
            modelBuilder.Entity<AirlineAirport>().HasData(aa1, aa2, aa3, aa4, aa5, aa6, aa7, aa8, aa9, aa10, aa11, aa12, aa13);
            modelBuilder.Entity<Flight>().HasData(f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12);
            modelBuilder.Entity<Seat>().HasData(seats);
            modelBuilder.Entity<Ticket>().HasData(tickets);
        }
    }
}
