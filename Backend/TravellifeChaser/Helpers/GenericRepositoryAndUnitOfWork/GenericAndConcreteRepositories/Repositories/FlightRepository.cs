using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.Repositories
{
    public class FlightRepository : Repository<Flight>, IFlightRepository
    {
        public FlightRepository(TravellifeChaserDBContext context) : base(context)
        {

        }

        public override Flight Get(params object[] keyValues)
        {
            return context.Flights.Include(x => x.From).ThenInclude(x => x.Address)
                                   .Include(x => x.To).ThenInclude(x => x.Address)
                                   .Include(x => x.Airline)
                                   .Include(x => x.StopsLocations).ThenInclude(x => x.Airport).ThenInclude(x => x.Address)
                                   .Where(x => x.Id == (int)keyValues[0]).FirstOrDefault();
        }

        public override IEnumerable<Flight> GetAll()
        {
            return context.Flights.Include(x => x.From).ThenInclude(x => x.Address)
                                   .Include(x => x.To).ThenInclude(x => x.Address)
                                   .Include(x => x.Airline)
                                   .Include(x => x.StopsLocations).ThenInclude(x => x.Airport).ThenInclude(x => x.Address)
                                   .ToList();
        }

        public override IEnumerable<Flight> GetByCondition(Expression<Func<Flight, bool>> expression)
        {
            return context.Flights.Include(x => x.From).ThenInclude(x => x.Address)
                                        .Include(x => x.To).ThenInclude(x => x.Address)
                                        .Include(x => x.Airline)
                                        .Include(x => x.StopsLocations).ThenInclude(x => x.Airport).ThenInclude(x => x.Address)
                                        .Where(expression)
                                        .ToList();
        }

    }
}