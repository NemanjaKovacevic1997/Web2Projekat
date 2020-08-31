using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories
{
    public class AirlineAirportRepository  : Repository<AirlineAirport>, IAirlineAirportRepository
    {
        public AirlineAirportRepository(TravellifeChaserDBContext context) : base(context)
        {

        }

        public override IEnumerable<AirlineAirport> GetByCondition(Expression<Func<AirlineAirport, bool>> expression)
        {
            return context.AirlinesAirports.Include(x => x.Airport).ThenInclude(x => x.Address).Where(expression).ToList();
        }

    }
}
