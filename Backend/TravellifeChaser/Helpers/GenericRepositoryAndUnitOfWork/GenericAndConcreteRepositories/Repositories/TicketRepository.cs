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
    public class TicketRepository : Repository<Ticket>, ITicketRepository
    {
        public TicketRepository(TravellifeChaserDBContext context) : base(context)
        {

        }

        public override Ticket Get(params object[] keyValues)
        {
            return context.Tickets.Include(x => x.Seat).ThenInclude(x => x.Flight).ThenInclude(x => x.From).ThenInclude(x => x.Address)
                                  .Include(x => x.Seat).ThenInclude(x => x.Flight).ThenInclude(x => x.To).ThenInclude(x => x.Address)
                                  .Where(x => x.Id == (int)keyValues.First())
                                  .FirstOrDefault();
        }

        public override IEnumerable<Ticket> GetAll()
        {
            return context.Tickets.Include(x => x.Seat).ThenInclude(x => x.Flight).ThenInclude(x => x.From).ThenInclude(x => x.Address)
                                  .Include(x => x.Seat).ThenInclude(x => x.Flight).ThenInclude(x => x.To).ThenInclude(x => x.Address)
                                  .ToList();
        }

        public override IEnumerable<Ticket> GetByCondition(Expression<Func<Ticket, bool>> expression)
        {
            return context.Tickets.Include(x => x.Seat).ThenInclude(x => x.Flight).ThenInclude(x => x.From).ThenInclude(x => x.Address)
                                  .Include(x => x.Seat).ThenInclude(x => x.Flight).ThenInclude(x => x.To).ThenInclude(x => x.Address)
                                  .Where(expression).ToList();
        }
    }
}
