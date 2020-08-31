using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Helpers.Repositories;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TravellifeChaserDBContext _context;
    
        public UnitOfWork(TravellifeChaserDBContext context)
        {
            this._context = context;
        }

        private IAirlineRepository airlineRepository;

        private IFlightRepository flightRepository;

        private IFriendshipRequestRepository friendshipRequestRepository;

        private IRegisteredUserRepository registeredUserRepository;

        private IUserRepository userRepository;

        private ISeatRepository seatRepository;

        private IFriendshipRepository friendshipRepository;

        private ITicketRepository ticketRepository;

        private IAdminAirlineRepository adminAirlineRepository;

        private IAirportRepository airportRepository;

        private IAirlineAirportRepository airlineAirportRepository;
        public IAirlineRepository AirlineRepository
        {
            get
            {
                if (this.airlineRepository == null)
                    this.airlineRepository = new AirlineRepository(_context);
                return airlineRepository;
            }
        }

        public IFlightRepository FlightRepository
        {
            get
            {
                if (this.flightRepository == null)
                    this.flightRepository = new FlightRepository(_context);
                return flightRepository;
            }
        }

        public IFriendshipRequestRepository FriendshipRequestRepository
        {
            get
            {
                if (this.friendshipRequestRepository == null)
                    this.friendshipRequestRepository = new FriendshipRequestRepository(_context);
                return friendshipRequestRepository;
            }
        }

        public IRegisteredUserRepository RegisteredUserRepository
        {
            get
            {
                if (this.registeredUserRepository == null)
                    this.registeredUserRepository = new RegisteredUserRepository(_context);
                return registeredUserRepository;
            }
        }

        public IUserRepository UserRepository
        {
            get
            {
                if (this.userRepository == null)
                    this.userRepository = new UserRepository(_context);
                return userRepository;
            }
        }

        public ISeatRepository SeatRepository
        {
            get
            {
                if (this.seatRepository == null)
                    this.seatRepository = new SeatRepository(_context);
                return seatRepository;
            }
        }

        public IFriendshipRepository FriendshipRepository
        {
            get
            {
                if (this.friendshipRepository == null)
                    this.friendshipRepository = new FriendshipRepository(_context);
                return friendshipRepository;
            }
        }

        public ITicketRepository TicketRepository
        {
            get
            {
                if (this.ticketRepository == null)
                    this.ticketRepository = new TicketRepository(_context);
                return ticketRepository;
            }
        }

        public IAdminAirlineRepository AdminAirlineRepository
        {
            get
            {
                if (this.adminAirlineRepository == null)
                    this.adminAirlineRepository = new AdminAirlineRepository(_context);
                return adminAirlineRepository;
            }
        }

        public IAirportRepository AirportRepository
        {
            get
            {
                if (this.airportRepository == null)
                    this.airportRepository = new AirportRepository(_context);
                return airportRepository;
            }
        }

        public IAirlineAirportRepository AirlineAirportRepository
        {
            get
            {
                if (this.airlineAirportRepository == null)
                    this.airlineAirportRepository = new AirlineAirportRepository(_context);
                return airlineAirportRepository;
            }
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                    _context.Dispose();
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
      
        public int Save()
        {
            return _context.SaveChanges();
        }
    }
}
