using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IAirlineRepository AirlineRepository { get; }
        IFlightRepository FlightRepository { get; }
        IFriendshipRequestRepository FriendshipRequestRepository { get; }
        IRegisteredUserRepository RegisteredUserRepository { get; }
        IUserRepository UserRepository { get; }
        ISeatRepository SeatRepository { get; }
        IFriendshipRepository FriendshipRepository { get; }
        ITicketRepository TicketRepository { get; }
        IAdminAirlineRepository AdminAirlineRepository { get; }
        IAirportRepository AirportRepository { get; }
        int Save();
    }
}
