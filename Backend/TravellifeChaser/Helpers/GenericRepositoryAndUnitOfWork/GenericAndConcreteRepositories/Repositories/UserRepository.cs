using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(TravellifeChaserDBContext context) : base(context)
        {

        }

        public override IEnumerable<User> GetAll()
        {
            return context.Users.Include(x => x.Address)
                                .ToList();
        }

        public override User Get(params object[] keyValues)
        {
            var user = context.Users.Find(keyValues);
            context.Entry(user).Reference(p => p.Address).Load();
            return user;
        }
    }
}
