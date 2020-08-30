using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories
{
    public class AirportRepository : Repository<Airport>, IAirportRepository
    {
        public AirportRepository(TravellifeChaserDBContext context) : base(context)
        {

        }

        public override Airport Get(params object[] keyValues)
        {
            return context.Airports.Include(x => x.Address)
                                   .Where(x => x.Id == (int)keyValues[0])
                                   .FirstOrDefault();
        }

        public override IEnumerable<Airport> GetAll()
        {
            return context.Airports.Include(x => x.Address);
        }

        public override IEnumerable<Airport> GetByCondition(Expression<Func<Airport, bool>> expression)
        {
            return context.Airports.Include(x => x.Address)
                                   .Where(expression);
        }
    }
}
