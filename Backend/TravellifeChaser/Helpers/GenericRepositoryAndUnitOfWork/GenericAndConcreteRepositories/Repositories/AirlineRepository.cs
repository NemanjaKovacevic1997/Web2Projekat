using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.Repositories
{
    public class AirlineRepository : Repository<Airline>, IAirlineRepository
    {
        public AirlineRepository(TravellifeChaserDBContext context) : base(context)
        {

        }

        public override Airline Get(params object[] keyValues)
        {
            return context.Airlines.Include(x => x.Address)
                                   .Include(x => x.Flights).ThenInclude(x => x.From)
                                   .Include(x => x.Flights).ThenInclude(x => x.To)
                                   .Include(x => x.Pricelist)
                                   .Include(x => x.BuisinessDestinations).ThenInclude(x => x.Airport).ThenInclude(x => x.Address)
                                   .Where(x => x.Id == (int)keyValues.First())
                                   .FirstOrDefault();
        }   

        public override IEnumerable<Airline> GetAll()
        {
            return context.Airlines.Include(x => x.Address).ToList();
        }

        public Airline GetForReport(int id)
        {
            return context.Airlines.Include(x => x.Address)
                                  .Include(x => x.Flights).ThenInclude(x => x.Tickets)
                                  .Where(x => x.Id == id)
                                  .FirstOrDefault();
        }
    }
}
