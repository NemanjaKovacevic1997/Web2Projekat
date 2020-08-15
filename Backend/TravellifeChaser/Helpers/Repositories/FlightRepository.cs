using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.Repositories
{
    public class FlightRepository : Repository<Flight>
    {
        public FlightRepository(TravellifeChaserDBContext context) : base(context)
        {

        }

        public override Flight Get(params object[] keyValues)
        {
            var flight = context.Flights.Find(keyValues);
            context.Entry(flight).Reference(x => x.From).Load();
            context.Entry(flight).Reference(x => x.To).Load();
            context.Entry(flight).Reference(x => x.Airline).Load();
            context.Entry(flight).Collection(x => x.StopsLocations).Load();

            return flight;
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