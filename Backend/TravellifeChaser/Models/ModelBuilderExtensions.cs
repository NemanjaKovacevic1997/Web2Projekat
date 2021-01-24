using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Helpers.Generators;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Models
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            Address addr1 = new Address() { Id = 1, City = "Gajdobra", Country = "Serbia" };
            Address addr2 = new Address() { Id = 2, City = "Pecinci", Country = "Serbia" };
            Address addr3 = new Address() { Id = 3, City = "Novi Sad", Country = "Serbia" };
            Address addr4 = new Address() { Id = 4, City = "Belgrade", Country = "Serbia", Latitude = 44.8205, Longitude = 20.2917 };
            Address addr5 = new Address() { Id = 5, City = "Nis", Country = "Serbia", Latitude = 43.3376, Longitude = 21.8663 };
            Address addr6 = new Address() { Id = 6, City = "Istanbul", Country = "Turkey", Latitude = 41.0082, Longitude = 28.9784 };
            Address addr7 = new Address() { Id = 7, City = "Doha", Country = "Qatar", Latitude = 25.2783, Longitude = 51.5520 };
            Address addr8 = new Address() { Id = 8, City = "London", Country = "England", Latitude = 51.4700, Longitude = 0.4543 };
            Address addr9 = new Address() { Id = 9, City = "Paris", Country = "France", Latitude = 49.0097, Longitude = 2.5479 };
            Address addr10 = new Address() { Id = 10, City = "Sremska Mitrovica", Country = "Serbia" };
            Address addr11 = new Address() { Id = 11, City = "Smederevo", Country = "Serbia" };
            Address addr12 = new Address() { Id = 12, City = "Krusevac", Country = "Serbia" };
            Address addr13 = new Address() { Id = 13, City = "Subotica", Country = "Serbia" };
            Address addr14 = new Address() { Id = 14, City = "München", Country = "Germany", Latitude = 48.35388889, Longitude = 11.78611111 };
            Address addr15 = new Address() { Id = 15, City = "Lisbon", Country = "Portugal", Latitude = 38.77416667, Longitude = 38.77416667 };
            Address addr16 = new Address() { Id = 16, City = "Madrid", Country = "Spain", Latitude = 49.0097, Longitude = 2.5479 };
            Address addr17 = new Address() { Id = 17, City = "Brussel", Country = "Belgium", Latitude = 50.90138889, Longitude = 4.48444444 };
            Address addr18 = new Address() { Id = 18, City = "Amsterdam", Country = "Netherland", Latitude = 52.30805556, Longitude = 4.76416667 };
            Address addr19 = new Address() { Id = 19, City = "Moscow", Country = "Russia", Latitude = 55.97277778, Longitude = 37.41472222 };

            Address addr20 = new Address() { Id = 20, City = "Harmondsworth", Country = "England", Latitude = 51.4865, Longitude = -0.4796 };
            Address addr21 = new Address() { Id = 21, City = "Abu Dhabi", Country = "UAE", Latitude = 24.466667, Longitude = 54.366669 };
            Address addr22 = new Address() { Id = 22, City = "Dubai", Country = "UAE", Latitude = 25.276987, Longitude = 55.296249 };

            User u1 = new User() { Id = 1, FirstName = "Nemanja", LastName = "Kovacevic", Username = "cone", Email = "kovacevicnemanja1997@gmail.com", Password = "cone", MobileNumber = "+381604520858", AddressId = addr1.Id, Role = UserRole.Registered };
            RegisteredUser ru1 = new RegisteredUser() { Id = u1.Id, BounusPoints = 0 };

            User u2 = new User() { Id = 2, FirstName = "Natasa", LastName = "Trudic", Username = "naca", Email = "natasatrudic@gmail.com", Password = "naca", MobileNumber = "+381650000000", AddressId = addr2.Id, Role = UserRole.Registered };
            RegisteredUser ru2 = new RegisteredUser() { Id = u2.Id, BounusPoints = 0 };

            User u3 = new User() { Id = 3, FirstName = "Lana", LastName = "Kovacevic", Username = "lana123", Email = "kovacevicnemanja1997@gmail.com", Password = "lana123", MobileNumber = "+381604520858", AddressId = addr11.Id, Role = UserRole.Registered };
            RegisteredUser ru3 = new RegisteredUser() { Id = u3.Id };

            User u4 = new User() { Id = 4, FirstName = "Milovan", LastName = "Zec", Username = "milovan123", Email = "kovacevicnemanja1997@gmail.com", Password = "milovan123", MobileNumber = "+381604520858", AddressId = addr10.Id, Role = UserRole.Registered };
            RegisteredUser ru4 = new RegisteredUser() { Id = u4.Id, BounusPoints = 0 };

            User u5 = new User() { Id = 5, FirstName = "Milica", LastName = "Krivokapic", Username = "milica123", Email = "kovacevicnemanja1997@gmail.com", Password = "milica123", MobileNumber = "+381604520858", AddressId = addr11.Id, Role = UserRole.Registered };
            RegisteredUser ru5 = new RegisteredUser() { Id = u5.Id, BounusPoints = 0 };

            User u6 = new User() { Id = 6, FirstName = "Mitar", LastName = "Miric", Username = "mitar123", Email = "kovacevicnemanja1997@gmail.com", Password = "mitar123", MobileNumber = "+381604520858", AddressId = addr12.Id, Role = UserRole.Registered };
            RegisteredUser ru6 = new RegisteredUser() { Id = u6.Id, BounusPoints = 0 };

            User u12 = new User() { Id = 12, FirstName = "Donald", LastName = "Trump", Username = "trump", Email = "donaldtrump@gmail.com", Password = "trump", MobileNumber = "+381650000000", AddressId = addr19.Id, Role = UserRole.AdminSys };
            User u13 = new User() { Id = 13, FirstName = "Melanie", LastName = "Trump", Username = "melanie", Email = "donaldtrump@gmail.com", Password = "melanie", MobileNumber = "+381650000000", AddressId = addr19.Id, Role = UserRole.AdminSys };
            
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
            Airline airline2 = new Airline() { Id = 2, Name = "Qatar Airways", AddressId = addr7.Id, AverageRating = 8.73, PricelistId = pl2.Id, PromotionalDescription = "Going Places Together", };
            Airline airline3 = new Airline() { Id = 3, Name = "Emirates", AddressId = addr22.Id, AverageRating = 9.12, PricelistId = pl3.Id, PromotionalDescription = "Enjoy flight",};  //dubai
            Airline airline4 = new Airline() { Id = 4, Name = "Etihad Airways", AddressId = addr21.Id, AverageRating = 8.73, PricelistId = pl4.Id, PromotionalDescription = "With you", }; //abu dabi
            Airline airline5 = new Airline() { Id = 5, Name = "British Airways", AddressId = addr20.Id, AverageRating = 9.12, PricelistId = pl5.Id, PromotionalDescription = "With you", }; //Harmondsworth
            Airline airline6 = new Airline() { Id = 6, Name = "Air Serbia", AddressId = addr4.Id, AverageRating = 8.04, PricelistId = pl6.Id, PromotionalDescription = "Fly with us",  }; //Belgrade

            User u7 = new User() { Id = 7, FirstName = "Marija", LastName = "Miric", Username = "marijaaa", Email = "marijamiric@gmail.com", Password = "marijaaaa", MobileNumber = "+381604520858", AddressId = addr15.Id, Role = UserRole.AdminAirlines };
            AdminAirlinesUser ru7 = new AdminAirlinesUser() { adminId= 1, Id = u7.Id, AirlineId = 1 };

            User u8 = new User() { Id = 8, FirstName = "Milica", LastName = "Miric", Username = "milicaaa", Email = "milicamiric@gmail.com", Password = "milicaaaa", MobileNumber = "+381604520858", AddressId = addr13.Id, Role = UserRole.AdminAirlines };
            AdminAirlinesUser ru8 = new AdminAirlinesUser() { adminId = 2, Id = u8.Id, AirlineId = 2 };

            User u9 = new User() { Id = 9, FirstName = "Radovan", LastName = "Trudic", Username = "rasa", Email = "radovantrudic@gmail.com", Password = "rasa", MobileNumber = "+381650000000", AddressId = addr2.Id, Role = UserRole.AdminRAC };
            User u10 = new User() { Id = 10, FirstName = "Burak", LastName = "Yilmaz", Username = "burak", Email = "burakyilmaz@gmail.com", Password = "burak", MobileNumber = "+381650000000", AddressId = addr6.Id, Role = UserRole.AdminRAC };
            User u11 = new User() { Id = 11, FirstName = "Vladimir", LastName = "Putin", Username = "putin", Email = "vladimirputin@gmail.com", Password = "putin", MobileNumber = "+381650000000", AddressId = addr19.Id, Role = UserRole.AdminRAC };
            User u14 = new User() { Id = 14, FirstName = "Miroslav", LastName = "Klose", Username = "klose", Email = "miroklose@gmail.com", Password = "klose", MobileNumber = "+381650000000", AddressId = addr14.Id, Role = UserRole.AdminRAC };

            Airport airport1 = new Airport() { Id = 1, AddressId = addr4.Id, Name = "Nikola Tesla" };
            Airport airport2 = new Airport() { Id = 2, AddressId = addr8.Id, Name = "Heathrow" };
            Airport airport3 = new Airport() { Id = 3, AddressId = addr9.Id, Name = "Charles de Gaulle" };
            Airport airport4 = new Airport() { Id = 4, AddressId = addr16.Id, Name = "Adolfo Suárez" };
            Airport airport5 = new Airport() { Id = 5, AddressId = addr15.Id, Name = "Humberto Delgado" };
            Airport airport6 = new Airport() { Id = 6, AddressId = addr14.Id, Name = "München Airport" };
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

            var TakeoffTime1 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime1 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration1 = LandingTime1.Subtract(TakeoffTime1).TotalMinutes;

            var TakeoffTime2 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime2 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration2 = LandingTime2.Subtract(TakeoffTime2).TotalMinutes;

            var TakeoffTime3 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime3 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration3 = LandingTime3.Subtract(TakeoffTime3).TotalMinutes;

            var TakeoffTime4 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime4 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration4 = LandingTime4.Subtract(TakeoffTime4).TotalMinutes;

            var TakeoffTime5 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime5 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration5 = LandingTime5.Subtract(TakeoffTime5).TotalMinutes;

            var TakeoffTime6 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime6 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration6 = LandingTime6.Subtract(TakeoffTime6).TotalMinutes;

            var TakeoffTime7 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime7 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration7 = LandingTime7.Subtract(TakeoffTime7).TotalMinutes;

            var TakeoffTime8 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime8 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration8 = LandingTime8.Subtract(TakeoffTime8).TotalMinutes;

            var TakeoffTime9 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime9 = new DateTime(2021, 1, 14, 9, 20, 0);
            var Duration9 = LandingTime9.Subtract(TakeoffTime9).TotalMinutes;

            var TakeoffTime10 = new DateTime(2021, 1, 12, 7, 40, 0);
            var LandingTime10 = new DateTime(2021, 1, 14, 9, 20, 0);
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
                CreatorId = 1,
                RentId = 0
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
                CreatorId = 1,
                RentId = 0
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
                CreatorId = 1,
                RentId = 0
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
                CreatorId = 1,
                RentId = 0
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
                CreatorId = 1,
                RentId = 0
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
                CreatorId = 1,
                RentId = 0
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
                CreatorId = 1,
                RentId = 0
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
                CreatorId = 1,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
                CreatorId = 7,
                RentId = 0
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
            modelBuilder.Entity<User>().HasData(u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11, u12, u13, u14);
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

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //MOJI PODACI
            RACService racs1 = new RACService();
            RACService racs2 = new RACService();
            RACService racs3 = new RACService();
            RACService racs4 = new RACService();

            RACAddress racAddr1 = new RACAddress();
            RACAddress racAddr2 = new RACAddress();
            RACAddress racAddr3 = new RACAddress();
            RACAddress racAddr4 = new RACAddress();
            RACAddress racAddr5 = new RACAddress();
            RACAddress racAddr6 = new RACAddress();
            RACAddress racAddr7 = new RACAddress();
            RACAddress racAddr8 = new RACAddress();

            //ADRESE
            racAddr1.Street = "Pozeska";
            racAddr1.Number = 3;
            racAddr1.City = "Belgrade";
            racAddr1.Country = "Serbia";
            racAddr1.Id = 1;
            racAddr1.RACServiceId = 1;
            racAddr1.IsMain = true;
            racAddr1.IsUsedForRent = false;

            racAddr2.Street = "Nemanjina";
            racAddr2.Number = 33;
            racAddr2.City = "Belgrade";
            racAddr2.Country = "Serbia";
            racAddr2.Id = 2;
            racAddr2.RACServiceId = 1;
            racAddr2.IsMain = false;
            racAddr2.IsUsedForRent = false;

            racAddr3.Street = "Azar";
            racAddr3.Number = 33;
            racAddr3.City = "Istanbul";
            racAddr3.Country = "Turkey";
            racAddr3.Id = 3;
            racAddr3.RACServiceId = 2;
            racAddr3.IsMain = true;
            racAddr3.IsUsedForRent = false;

            racAddr4.Street = "Izmir";
            racAddr4.Number = 3;
            racAddr4.City = "Istanbul";
            racAddr4.Country = "Turkey";
            racAddr4.Id = 4;
            racAddr4.RACServiceId = 2;
            racAddr4.IsMain = false;
            racAddr4.IsUsedForRent = false;

            racAddr5.Street = "Putin";
            racAddr5.Number = 55;
            racAddr5.City = "Moscow";
            racAddr5.Country = "Russia";
            racAddr5.Id = 5;
            racAddr5.RACServiceId = 3;
            racAddr5.IsMain = true;
            racAddr5.IsUsedForRent = false;

            racAddr6.Street = "Artem";
            racAddr6.Number = 73;
            racAddr6.City = "Moscow";
            racAddr6.Country = "Russia";
            racAddr6.Id = 6;
            racAddr6.RACServiceId = 3;
            racAddr6.IsMain = false;
            racAddr6.IsUsedForRent = false;

            racAddr7.Street = "Steinerstraße";
            racAddr7.Number = 69;
            racAddr7.City = "München";
            racAddr7.Country = "Germany";
            racAddr7.Id = 7;
            racAddr7.RACServiceId = 4;
            racAddr7.IsMain = true;
            racAddr7.IsUsedForRent = false;

            racAddr8.Street = "Sonnenstraße";
            racAddr8.Number = 99;
            racAddr8.City = "München";
            racAddr8.Country = "Germany";
            racAddr8.Id = 8;
            racAddr8.RACServiceId = 4;
            racAddr8.IsMain = false;
            racAddr8.IsUsedForRent = false;

            //RAC SERVISI
            racs2.Id = 2;
            racs2.Logo = @"../../assets/images/logos/rac3.png";
            racs2.Name = "Istanbul Rent-a-car";
            racs2.PriceList = "";
            racs2.PromotionalDescription = "Drive with us!";
            racs2.Rating = 0;

            racs1.Id = 1;
            racs1.Logo = @"../../assets/images/logos/rac1.png";
            racs1.Name = "Belgrade Rent-a-car";
            racs1.PriceList = "";
            racs1.PromotionalDescription = "Just say where, we know how!";
            racs1.Rating = 0;

            racs3.Id = 3;
            racs3.Logo = @"../../assets/images/logos/rac7.png";
            racs3.Name = "Moscow Rent-a-car";
            racs3.PriceList = "";
            racs3.PromotionalDescription = "Always with you!";
            racs3.Rating = 0;

            racs4.Id = 4;
            racs4.Logo = @"../../assets/images/logos/rac10.png";
            racs4.Name = "Sports car rental";
            racs4.PriceList = "";
            racs4.PromotionalDescription = "The best sports cars!";
            racs4.Rating = 0;

            //RAC ADMINI
            AdminRACUser adminRAC1 = new AdminRACUser() { RACServiceId = racs1.Id, Id = u9.Id, adminId = 1 };
            AdminRACUser adminRAC2 = new AdminRACUser() { RACServiceId = racs2.Id, Id = u10.Id, adminId = 2 };
            AdminRACUser adminRAC3 = new AdminRACUser() { RACServiceId = racs3.Id, Id = u11.Id, adminId = 3 };
            AdminRACUser adminRAC4 = new AdminRACUser() { RACServiceId = racs4.Id, Id = u14.Id, adminId = 4 };

            //SYS ADMINI
            AdminSysUser adminSys1 = new AdminSysUser() { Predefined = true, Id = u12.Id };
            AdminSysUser adminSys2 = new AdminSysUser() { Predefined = false, Id = u13.Id };

            //BELGRADE RENT-A-CAR
            Car c1 = new Car()
            {
                Id = 1,
                DailyPrice = 100,
                Image = @"../../assets/images/cars/car1.jpg",
                Mark = "Mercedes",
                Model = "A 250",
                Rating = 0,
                Seats = 5,
                Type = "Hatchback",
                Year = 2020,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs1.Id
            };

            Car c2 = new Car()
            {
                Id = 2,
                DailyPrice = 200,
                Image = @"../../assets/images/cars/car2.jpg",
                Mark = "BMW",
                Model = "M5",
                Rating = 0,
                Seats = 5,
                Type = "Sedan",
                Year = 2020,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs1.Id
            };

            Car c3 = new Car()
            {
                Id = 3,
                DailyPrice = 250,
                Image = @"../../assets/images/cars/car23.jpg",
                Mark = "Range Rover",
                Model = "Evoque",
                Rating = 0,
                Seats = 5,
                Type = "SUV",
                Year = 2018,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs1.Id
            };

            Car c4 = new Car()
            {
                Id = 4,
                DailyPrice = 200,
                Image = @"../../assets/images/cars/car21.jpg",
                Mark = "Toyota",
                Model = "C-HR",
                Rating = 0,
                Seats = 5,
                Type = "SUV",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs1.Id
            };

            Car c5 = new Car()
            {
                Id = 5,
                DailyPrice = 150,
                Image = @"../../assets/images/cars/car39.jpg",
                Mark = "Volkswagen",
                Model = "Scirocco",
                Rating = 0,
                Seats = 5,
                Type = "Coupe",
                Year = 2016,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs1.Id
            };

            Car c6 = new Car()
            {
                Id = 6,
                DailyPrice = 80,
                Image = @"../../assets/images/cars/car12.jpg",
                Mark = "Renault",
                Model = "Clio 5",
                Rating = 0,
                Seats = 5,
                Type = "Hatchback",
                Year = 2017,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs1.Id
            };

            Car c7 = new Car()
            {
                Id = 7,
                DailyPrice = 180,
                Image = @"../../assets/images/cars/car29.jpg",
                Mark = "Audi",
                Model = "A8",
                Rating = 0,
                Seats = 5,
                Type = "Sedan",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs1.Id
            };

            Car c8 = new Car()
            {
                Id = 8,
                DailyPrice = 300,
                Image = @"../../assets/images/cars/car33.jpg",
                Mark = "BMW",
                Model = "i8",
                Rating = 0,
                Seats = 5,
                Type = "Coupe",
                Year = 2018,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs1.Id
            };

            //ISTANBUL RENT-A-CAR
            Car c9 = new Car()
            {
                Id = 9,
                DailyPrice = 220,
                Image = @"../../assets/images/cars/car9.jpg",
                Mark = "Toyota",
                Model = "Supra",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs2.Id
            };

            Car c10 = new Car()
            {
                Id = 10,
                DailyPrice = 200,
                Image = @"../../assets/images/cars/car37.jpg",
                Mark = "Audi",
                Model = "S5",
                Rating = 0,
                Seats = 5,
                Type = "Sedan",
                Year = 2020,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs2.Id
            };

            Car c11 = new Car()
            {
                Id = 11,
                DailyPrice = 200,
                Image = @"../../assets/images/cars/car30.jpg",
                Mark = "Nissan",
                Model = "Juke",
                Rating = 0,
                Seats = 5,
                Type = "SUV",
                Year = 2020,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs2.Id
            };

            Car c12 = new Car()
            {
                Id = 12,
                DailyPrice = 150,
                Image = @"../../assets/images/cars/car40.jpg",
                Mark = "Opel",
                Model = "Insignia",
                Rating = 0,
                Seats = 5,
                Type = "Sedan",
                Year = 2020,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs2.Id
            };

            Car c13 = new Car()
            {
                Id = 13,
                DailyPrice = 80,
                Image = @"../../assets/images/cars/car6.jpg",
                Mark = "Renault",
                Model = "Clio",
                Rating = 0,
                Seats = 5,
                Type = "Hatchback",
                Year = 2016,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs2.Id
            };

            Car c14 = new Car()
            {
                Id = 14,
                DailyPrice = 300,
                Image = @"../../assets/images/cars/car65.jpg",
                Mark = "Porsche",
                Model = "Cayenne",
                Rating = 0,
                Seats = 5,
                Type = "SUV",
                Year = 2017,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs2.Id
            };

            Car c15 = new Car()
            {
                Id = 15,
                DailyPrice = 400,
                Image = @"../../assets/images/cars/car57.jpg",
                Mark = "Ferrari",
                Model = "488",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2020,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs2.Id
            };

            Car c16 = new Car()
            {
                Id = 16,
                DailyPrice = 370,
                Image = @"../../assets/images/cars/car58.jpg",
                Mark = "Lamborghini",
                Model = "Urus",
                Rating = 0,
                Seats = 5,
                Type = "SUV",
                Year = 2020,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs2.Id
            };

            //MOSCOW RENT-A-CAR
            Car c17 = new Car()
            {
                Id = 17,
                DailyPrice = 330,
                Image = @"../../assets/images/cars/car31.jpg",
                Mark = "Mercedes",
                Model = "SLK",
                Rating = 0,
                Seats = 5,
                Type = "Cabriolet",
                Year = 2015,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c18 = new Car()
            {
                Id = 18,
                DailyPrice = 200,
                Image = @"../../assets/images/cars/car36.jpg",
                Mark = "Audi",
                Model = "A7",
                Rating = 0,
                Seats = 5,
                Type = "Sedan",
                Year = 2018,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c19 = new Car()
            {
                Id = 19,
                DailyPrice = 450,
                Image = @"../../assets/images/cars/car75.jpg",
                Mark = "Lamborghini",
                Model = "Huracán",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c20 = new Car()
            {
                Id = 20,
                DailyPrice = 430,
                Image = @"../../assets/images/cars/car46.jpg",
                Mark = "Mercedes",
                Model = "AMG GT",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c21 = new Car()
            {
                Id = 21,
                DailyPrice = 330,
                Image = @"../../assets/images/cars/car20.jpg",
                Mark = "BMW",
                Model = "X6",
                Rating = 0,
                Seats = 5,
                Type = "SUV",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c22 = new Car()
            {
                Id = 22,
                DailyPrice = 300,
                Image = @"../../assets/images/cars/car22.jpg",
                Mark = "Mercedes",
                Model = "AMG G65",
                Rating = 0,
                Seats = 5,
                Type = "SUV",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c23 = new Car()
            {
                Id = 23,
                DailyPrice = 200,
                Image = @"../../assets/images/cars/car4.jpg",
                Mark = "RAM",
                Model = "1500",
                Rating = 0,
                Seats = 6,
                Type = "Pickup",
                Year = 2015,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c24 = new Car()
            {
                Id = 24,
                DailyPrice = 210,
                Image = @"../../assets/images/cars/car68.jpg",
                Mark = "Nissan",
                Model = "VR",
                Rating = 0,
                Seats = 6,
                Type = "Pickup",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c41 = new Car()
            {
                Id = 41,
                DailyPrice = 80,
                Image = @"../../assets/images/cars/car74.jpg",
                Mark = "Renault",
                Model = "Twingo",
                Rating = 0,
                Seats = 2,
                Type = "Micro",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c42 = new Car()
            {
                Id = 42,
                DailyPrice = 90,
                Image = @"../../assets/images/cars/car35.jpg",
                Mark = "Smart",
                Model = "Fortwo",
                Rating = 0,
                Seats = 2,
                Type = "Micro",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c43 = new Car()
            {
                Id = 43,
                DailyPrice = 140,
                Image = @"../../assets/images/cars/car52.jpg",
                Mark = "Renault",
                Model = "Megane",
                Rating = 0,
                Seats = 5,
                Type = "Hatchback",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c44 = new Car()
            {
                Id = 44,
                DailyPrice = 340,
                Image = @"../../assets/images/cars/car54.jpg",
                Mark = "Volkswagen",
                Model = "Arteon",
                Rating = 0,
                Seats = 5,
                Type = "Sedan",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c45 = new Car()
            {
                Id = 45,
                DailyPrice = 410,
                Image = @"../../assets/images/cars/car47.jpg",
                Mark = "Ferrari",
                Model = "458",
                Rating = 0,
                Seats = 2,
                Type = "Cabriolet",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c46 = new Car()
            {
                Id = 46,
                DailyPrice = 310,
                Image = @"../../assets/images/cars/car48.jpg",
                Mark = "Porsche",
                Model = "Taycan",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2018,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c47 = new Car()
            {
                Id = 47,
                DailyPrice = 250,
                Image = @"../../assets/images/cars/car11.jpg",
                Mark = "BMW",
                Model = "M4",
                Rating = 0,
                Seats = 4,
                Type = "Cabriolet",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            Car c48 = new Car()
            {
                Id = 48,
                DailyPrice = 170,
                Image = @"../../assets/images/cars/car18.jpg",
                Mark = "Volkswagen",
                Model = "Pasat",
                Rating = 0,
                Seats = 5,
                Type = "Sedan",
                Year = 2017,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs3.Id
            };

            //SPORT CARS RENT(MUNICH,GERMANY)
            Car c25 = new Car()
            {
                Id = 25,
                DailyPrice = 330,
                Image = @"../../assets/images/cars/car17.jpg",
                Mark = "Ford",
                Model = "Mustang GT",
                Rating = 0,
                Seats = 4,
                Type = "Coupe",
                Year = 2015,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c26 = new Car()
            {
                Id = 26,
                DailyPrice = 490,
                Image = @"../../assets/images/cars/car77.jpg",
                Mark = "Lamborghini",
                Model = "Huracán",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2018,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c27 = new Car()
            {
                Id = 27,
                DailyPrice = 450,
                Image = @"../../assets/images/cars/car63.jpg",
                Mark = "Lamborghini",
                Model = "Huracán",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c28 = new Car()
            {
                Id = 28,
                DailyPrice = 430,
                Image = @"../../assets/images/cars/car64.jpg",
                Mark = "Lamborghini",
                Model = "Huracán",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c29 = new Car()
            {
                Id = 29,
                DailyPrice = 320,
                Image = @"../../assets/images/cars/car67.jpg",
                Mark = "Ferrari",
                Model = "468",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c30 = new Car()
            {
                Id = 30,
                DailyPrice = 340,
                Image = @"../../assets/images/cars/car71.jpg",
                Mark = "Ferrari",
                Model = "Roma",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c31 = new Car()
            {
                Id = 31,
                DailyPrice = 200,
                Image = @"../../assets/images/cars/car5.jpg",
                Mark = "Audi",
                Model = "TT",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2017,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c32 = new Car()
            {
                Id = 32,
                DailyPrice = 290,
                Image = @"../../assets/images/cars/car25.jpg",
                Mark = "Audi",
                Model = "R8",
                Rating = 0,
                Seats = 2,
                Type = "Pickup",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c33 = new Car()
            {
                Id = 33,
                DailyPrice = 400,
                Image = @"../../assets/images/cars/car69.jpg",
                Mark = "Lamborghini",
                Model = "Aventador",
                Rating = 0,
                Seats = 2,
                Type = "Cabriolet",
                Year = 2018,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c34 = new Car()
            {
                Id = 34,
                DailyPrice = 410,
                Image = @"../../assets/images/cars/car76.jpg",
                Mark = "Ferrari",
                Model = "488 Pista",
                Rating = 0,
                Seats = 2,
                Type = "Cabriolet",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c35 = new Car()
            {
                Id = 35,
                DailyPrice = 400,
                Image = @"../../assets/images/cars/car42.jpg",
                Mark = "Mercedes",
                Model = "AMG GT-R",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2020,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c36 = new Car()
            {
                Id = 36,
                DailyPrice = 350,
                Image = @"../../assets/images/cars/car70.jpg",
                Mark = "Mercedes",
                Model = "SLR McLaren",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2016,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c37 = new Car()
            {
                Id = 37,
                DailyPrice = 300,
                Image = @"../../assets/images/cars/car45.jpg",
                Mark = "Lamborghini",
                Model = "Gallardo",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2015,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c38 = new Car()
            {
                Id = 38,
                DailyPrice = 370,
                Image = @"../../assets/images/cars/car44.jpg",
                Mark = "Ferrari",
                Model = "Enzo",
                Rating = 0,
                Seats = 2,
                Type = "Pickup",
                Year = 2010,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c39 = new Car()
            {
                Id = 39,
                DailyPrice = 300,
                Image = @"../../assets/images/cars/car34.jpg",
                Mark = "BMW",
                Model = "i8",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2015,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            Car c40 = new Car()
            {
                Id = 40,
                DailyPrice = 360,
                Image = @"../../assets/images/cars/car78.jpg",
                Mark = "Chevrolet",
                Model = "Corvette",
                Rating = 0,
                Seats = 2,
                Type = "Coupe",
                Year = 2019,
                Rented = false,
                IsReservedForRent = false,
                RACServiceId = racs4.Id
            };

            List<Car> cars = new List<Car>();
            cars.Add(c1);
            cars.Add(c2);
            cars.Add(c3);
            cars.Add(c4);
            cars.Add(c5);
            cars.Add(c6);
            cars.Add(c7);
            cars.Add(c8);
            cars.Add(c9);
            cars.Add(c10);
            cars.Add(c11);
            cars.Add(c12);
            cars.Add(c13);
            cars.Add(c14);
            cars.Add(c15);
            cars.Add(c16);
            cars.Add(c17);
            cars.Add(c18);
            cars.Add(c19);
            cars.Add(c20);
            cars.Add(c21);
            cars.Add(c22);
            cars.Add(c23);
            cars.Add(c24);
            cars.Add(c25);
            cars.Add(c26);
            cars.Add(c27);
            cars.Add(c28);
            cars.Add(c29);
            cars.Add(c30);
            cars.Add(c31);
            cars.Add(c32);
            cars.Add(c33);
            cars.Add(c34);
            cars.Add(c35);
            cars.Add(c36);
            cars.Add(c37);
            cars.Add(c38);
            cars.Add(c39);
            cars.Add(c40);
            cars.Add(c41);
            cars.Add(c42);
            cars.Add(c43);
            cars.Add(c44);
            cars.Add(c45);
            cars.Add(c46);
            cars.Add(c47);
            cars.Add(c48);

            Rent r1 = new Rent()
            {
                Id = 1,
                CarId = 1,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 2, 1),
                EndDate = new DateTime(2020, 2, 2),
                Price = 400,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r2 = new Rent()
            {
                Id = 2,
                CarId = 5,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 3, 1),
                EndDate = new DateTime(2020, 3, 2),
                Price = 200,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r3 = new Rent()
            {
                Id = 3,
                CarId = 2,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 4, 1),
                EndDate = new DateTime(2020, 4, 2),
                Price = 100,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r4 = new Rent()
            {
                Id = 4,
                CarId = 4,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 5, 1),
                EndDate = new DateTime(2020, 5, 2),
                Price = 700,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r5 = new Rent()
            {
                Id = 5,
                CarId = 1,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 6, 1),
                EndDate = new DateTime(2020, 6, 2),
                Price = 1000,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r6 = new Rent()
            {
                Id = 6,
                CarId = 8,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 7, 1),
                EndDate = new DateTime(2020, 7, 2),
                Price = 1010,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r7 = new Rent()
            {
                Id = 7,
                CarId = 7,
                RegisteredUserId = 4,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 8, 1),
                EndDate = new DateTime(2020, 8, 2),
                Price = 2000,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r8 = new Rent()
            {
                Id = 8,
                CarId = 6,
                RegisteredUserId = 4,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 9, 1),
                EndDate = new DateTime(2020, 9, 2),
                Price = 850,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r9 = new Rent()
            {
                Id = 9,
                CarId = 5,
                RegisteredUserId = 3,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 10, 1),
                EndDate = new DateTime(2020, 10, 2),
                Price = 300,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r10 = new Rent()
            {
                Id = 10,
                CarId = 2,
                RegisteredUserId = 3,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 11, 1),
                EndDate = new DateTime(2020, 11, 2),
                Price = 1240,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r11 = new Rent()
            {
                Id = 11,
                CarId = 1,
                RegisteredUserId = 2,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 12, 1),
                EndDate = new DateTime(2020, 12, 2),
                Price = 400,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r12 = new Rent()
            {
                Id = 12,
                CarId = 3,
                RegisteredUserId = 2,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 12, 7),
                EndDate = new DateTime(2020, 12, 14),
                Price = 1000,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r13 = new Rent()
            {
                Id = 13,
                CarId = 1,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2021, 1, 1),
                EndDate = new DateTime(2021, 1, 5),
                Price = 700,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r14 = new Rent()
            {
                Id = 14,
                CarId = 7,
                RegisteredUserId = 2,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2021, 1, 1),
                EndDate = new DateTime(2021, 1, 7),
                Price = 1500,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r15 = new Rent()
            {
                Id = 15,
                CarId = 4,
                RegisteredUserId = 4,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2021, 2, 11),
                EndDate = new DateTime(2021, 2, 18),
                Price = 1200,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r16 = new Rent()
            {
                Id = 16,
                CarId = 2,
                RegisteredUserId = 5,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 3, 16),
                EndDate = new DateTime(2020, 3, 22),
                Price = 2400,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r17 = new Rent()
            {
                Id = 17,
                CarId = 8,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 4, 15),
                EndDate = new DateTime(2020, 4, 20),
                Price = 2000,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r18 = new Rent()
            {
                Id = 18,
                CarId = 4,
                RegisteredUserId = 3,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 5, 11),
                EndDate = new DateTime(2020, 5, 21),
                Price = 3000,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r19 = new Rent()
            {
                Id = 19,
                CarId = 3,
                RegisteredUserId = 5,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 5, 22),
                EndDate = new DateTime(2020, 5, 27),
                Price = 700,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r20 = new Rent()
            {
                Id = 20,
                CarId = 1,
                RegisteredUserId = 1,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 6, 21),
                EndDate = new DateTime(2020, 6, 23),
                Price = 850,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r21 = new Rent()
            {
                Id = 21,
                CarId = 6,
                RegisteredUserId = 3,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 7, 13),
                EndDate = new DateTime(2020, 7, 23),
                Price = 1010,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r22 = new Rent()
            {
                Id = 22,
                CarId = 1,
                RegisteredUserId = 5,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 8, 11),
                EndDate = new DateTime(2020, 8, 21),
                Price = 2000,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r23 = new Rent()
            {
                Id = 23,
                CarId = 4,
                RegisteredUserId = 4,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 9, 11),
                EndDate = new DateTime(2020, 9, 21),
                Price = 1850,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r24 = new Rent()
            {
                Id = 24,
                CarId = 2,
                RegisteredUserId = 3,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 10, 11),
                EndDate = new DateTime(2020, 10, 21),
                Price = 2300,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r25 = new Rent()
            {
                Id = 25,
                CarId = 5,
                RegisteredUserId = 3,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 21),
                Price = 1240,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r26 = new Rent()
            {
                Id = 26,
                CarId = 7,
                RegisteredUserId = 2,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 12, 11),
                EndDate = new DateTime(2020, 12, 21),
                Price = 1500,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r27 = new Rent()
            {
                Id = 27,
                CarId = 3,
                RegisteredUserId = 2,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2020, 12, 27),
                EndDate = new DateTime(2020, 12, 29),
                Price = 900,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r28 = new Rent()
            {
                Id = 28,
                CarId = 6,
                RegisteredUserId = 6,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2021, 1, 1),
                EndDate = new DateTime(2021, 1, 5),
                Price = 500,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r29 = new Rent()
            {
                Id = 29,
                CarId = 2,
                RegisteredUserId = 2,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2021, 1, 8),
                EndDate = new DateTime(2021, 1, 9),
                Price = 300,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            Rent r30 = new Rent()
            {
                Id = 30,
                CarId = 8,
                RegisteredUserId = 3,
                StartRACAddressId = 1,
                EndRACAddressId = 1,
                StartDate = new DateTime(2021, 1, 2),
                EndDate = new DateTime(2021, 1, 9),
                Price = 2200,
                RatingForCar = 0,
                RatingForRACService = 0
            };

            modelBuilder.Entity<Car>().HasData(cars);
            modelBuilder.Entity<RACAddress>().HasData(racAddr1, racAddr2, racAddr3, racAddr4, racAddr5, racAddr6, racAddr7, racAddr8);
            modelBuilder.Entity<RACService>().HasData(racs1, racs2, racs3, racs4);
            modelBuilder.Entity<AdminRACUser>().HasData(adminRAC1, adminRAC2, adminRAC3, adminRAC4);
            modelBuilder.Entity<AdminSysUser>().HasData(adminSys1, adminSys2);
            modelBuilder.Entity<Rent>().HasData(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30);
        }
    }
}
