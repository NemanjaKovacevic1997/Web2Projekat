using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using TravellifeChaser.Models;

namespace TravellifeChaser.Data
{
    public class TravellifeChaserDBContext : DbContext
    {
        public TravellifeChaserDBContext(DbContextOptions<TravellifeChaserDBContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<RegisteredUser> RegisteredUsers { get; set; }
        public DbSet<AdminAirlinesUser> AdminAirlinesUsers { get; set; }
        public DbSet<Address> Addresses{ get; set; }
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Airport> Airports { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<FriendshipRequest> FrendshipRequests { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<Pricelist> Pricelists { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<AirlineAirport> AirlinesAirports { get; set; }
        public DbSet<FlightAirport> FlightsAirports { get; set; }
        public DbSet<Friendship> Frendships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
                x.HasOne(x => x.Address)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.AddressId)
                .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<Address>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Airline>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
                x.HasOne(x => x.Address)
               .WithMany(x => x.Airlines)
               .HasForeignKey(x => x.AddressId)
               .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Airport>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
                x.HasOne(x => x.Address)
                .WithMany(x => x.Airports)
                .HasForeignKey(x => x.AddressId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Pricelist>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Ticket>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Invitation>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<RegisteredUser>(x =>
            {
                x.HasOne(x => x.User).WithOne(x => x.RegisteredUser).HasForeignKey<RegisteredUser>(x => x.Id);
                x.HasKey(x => x.Id);
            });

            modelBuilder.Entity<AdminAirlinesUser>(x =>
            {
                x.HasOne(x => x.User).WithOne(x => x.AdminAirlinesUser).HasForeignKey<AdminAirlinesUser>(x => x.Id);
                x.HasKey(x => x.Id);
                x.HasOne(x => x.Airline)
                 .WithOne(x => x.Administrator)
                 .HasForeignKey<AdminAirlinesUser>(x => x.AirlineId)
                 .OnDelete(DeleteBehavior.Restrict);
            });

                     
            modelBuilder.Entity<FriendshipRequest>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();

                x.HasOne(x => x.From)
                .WithMany(x => x.FrendshipRequestsSent)
                .HasForeignKey(x => x.FromId)
                .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(x => x.To)
                .WithMany(x => x.FrendshipRequestsRecieved)
                .HasForeignKey(x => x.ToId)
                .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Invitation>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();

                x.HasOne(x => x.From)
                .WithMany(x => x.InvitationsSent)
                .HasForeignKey(x => x.FromId)
                .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(x => x.To)
                .WithMany(x => x.InvitationsRecieved)
                .HasForeignKey(x => x.ToId)
                .OnDelete(DeleteBehavior.Restrict);
            });



            modelBuilder.Entity<Friendship>(x =>
            {
                x.HasKey(e => new { e.User1Id, e.User2Id });

                x.HasOne(e => e.User1)
                .WithMany(e => e.FriendsFrom)
                .HasForeignKey(e => e.User1Id)
                .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(e => e.User2)
                .WithMany(e => e.FriendsTo)
                .HasForeignKey(e => e.User2Id);

            });


            modelBuilder.Entity<Seat>()
                        .HasKey(s => new { s.Id, s.FlightId });   //week entity seat

            modelBuilder.Entity<AirlineAirport>(x => 
            {
                x.HasOne(sc => sc.Airline)
                 .WithMany(sc => sc.BuisinessDestinations)
                 .HasForeignKey(sc => sc.AirlineId);
                x.HasOne(sc => sc.Airport)
                 .WithMany(sc => sc.Airlines)
                 .HasForeignKey(sc => sc.AirportId);
                x.HasKey(sc => new { sc.AirlineId, sc.AirportId });
            });

            modelBuilder.Entity<AirlineAirport>(x => 
            {
                x.HasOne(x => x.Airline)
                .WithMany(x => x.BuisinessDestinations)
                .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(x => x.Airport)
                .WithMany(x => x.Airlines);
                //.OnDelete(DeleteBehavior.Restrict);

            });

            /*modelBuilder.Entity<Airline>()
                        .HasMany(x => x.BuisinessDestinations)
                        .WithOne(x => x.Airline)
                        .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Airport>()
                        .HasMany(x => x.Airlines)
                        .WithOne(x => x.Airport)
                        .OnDelete(DeleteBehavior.Restrict);*/

            modelBuilder.Entity<FlightAirport>(x =>
            {
                x.HasOne(sc => sc.Flight)
                .WithMany(sc => sc.StopsLocations)
                .HasForeignKey(sc => sc.FlightId)
                .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(sc => sc.Airport)
                .WithMany(sc => sc.Flights)
                .HasForeignKey(sc => sc.AirportId);

                x.HasKey(sc => new { sc.FlightId, sc.AirportId });
            });


            /*modelBuilder.Entity<Flight>()
                        .HasMany(x => x.StopsLocations)
                        .WithOne(x => x.Flight)
                        .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Airport>()
                        .HasMany(x => x.Flights)
                        .WithOne(x => x.Airport)
                        .OnDelete(DeleteBehavior.Restrict);*/

            modelBuilder.Entity<Flight>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();

                x.HasOne(x => x.From)
                .WithMany(x => x.FlightsFrom)
                .HasForeignKey(x => x.FromId)
                .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(x => x.To)
                .WithMany(x => x.FlightsTo)
                .HasForeignKey(x => x.ToId)
                .OnDelete(DeleteBehavior.Restrict);
            });



            modelBuilder.Seed();
        }
    }
}
