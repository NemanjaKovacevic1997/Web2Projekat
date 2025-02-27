﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using TravellifeChaser.Models;
using TravellifeChaser.Models.RACSystem;
using TravellifeChaser.Models.RACSystem.Many_To_ManyEntities;

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
        public DbSet<Address> Addresses { get; set; }
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
        public DbSet<Car> Cars { get; set; }
        public DbSet<RACService> RACServices { get; set; }
        public DbSet<Rent> Rents { get; set; }
        public DbSet<RACAddress> RACAddresses { get; set; }
        public DbSet<RACAddressRent> RACAddressesRents { get; set; }
        public DbSet<AdminRACUser> AdminRACUsers { get; set; }
        public DbSet<AdminSysUser> AdminSysUsers { get; set; }


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
                //x.HasOne(x => x.AdminSysUser).WithMany(x => x.Airlines).HasForeignKey(x => x.AdminSysUserId);
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

                x.HasOne(x => x.Seat)
                .WithOne(x => x.Ticket)
                .HasForeignKey<Ticket>(x => new { x.Row, x.Column, x.FlightId })
                .OnDelete(DeleteBehavior.Restrict);
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
                x.HasKey(x => x.adminId);
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
                        .HasKey(s => new { s.Row, s.Column, s.FlightId });   //week entity seat

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

            });

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

            modelBuilder.Entity<Car>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
                x.HasOne(x => x.RACService)
                .WithMany(x => x.Cars)
                .HasForeignKey(x => x.RACServiceId);
            });

            modelBuilder.Entity<RACAddress>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
                x.HasOne(x => x.RACService)
               .WithMany(x => x.RACAddresses)
               .HasForeignKey(x => x.RACServiceId)
               .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Rent>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();

                x.HasOne(x => x.StartRACAddress)
                .WithMany(x => x.RentStarts)
                .HasForeignKey(x => x.StartRACAddressId)
                .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(x => x.EndRACAddress)
                .WithMany(x => x.RentEnds)
                .HasForeignKey(x => x.EndRACAddressId)
                .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<RACAddressRent>(x =>
            {
                x.HasOne(sc => sc.Rent)
                 .WithMany(sc => sc.RACAddressRents)
                 .HasForeignKey(sc => sc.RentId)
                 .OnDelete(DeleteBehavior.Restrict);
                x.HasOne(sc => sc.RACAddress)
                 .WithMany(sc => sc.RACAddressRents)
                 .HasForeignKey(sc => sc.RACAddressId);
                x.HasKey(sc => new { sc.RentId, sc.RACAddressId });
            });

            modelBuilder.Entity<RACService>(x =>
            {
                x.HasKey(x => x.Id);
                x.Property(x => x.Id).ValueGeneratedOnAdd();
                //x.HasOne(x => x.AdminSysUser).WithMany(x => x.RACServices).HasForeignKey(x => x.AdminSysUserId);
            });

            modelBuilder.Entity<AdminRACUser>(x =>
            {   
                x.HasKey(x => x.adminId);
                x.HasOne(x => x.User)
                 .WithOne(x => x.AdminRACUser)
                 .HasForeignKey<AdminRACUser>(x => x.Id);
                x.HasOne(x => x.RACService)
                 .WithOne(x => x.AdminRACUser)
                 .HasForeignKey<AdminRACUser>(x => x.RACServiceId)
                 .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<AdminSysUser>(x =>
            {
                x.HasOne(x => x.User).WithOne(x => x.AdminSysUser).HasForeignKey<AdminSysUser>(x => x.Id);
                x.HasKey(x => x.Id);
            });

            modelBuilder.Seed();
        }

        public DbSet<TravellifeChaser.Models.AdminRACUser> AdminRACUser { get; set; }
    }
}
