using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.Repositories
{
    public class RegisteredUserRepository : Repository<RegisteredUser>, IRegisteredUserRepository
    {
        public RegisteredUserRepository(TravellifeChaserDBContext context) : base(context)
        {
            
        }

        public List<User> GetAllAsUser()
        {
            return context.RegisteredUsers.Include(x => x.User)
                                          .ThenInclude(x => x.Address)
                                          .Select(x => x.User)
                                          .ToList();
        }

        public User GetAsUser(int id)
        {
            return context.Users.Include(x => x.Address)
                                .Where(x => x.Id == id)
                                .FirstOrDefault();
        }

        public override RegisteredUser Get(params object[] keyValues)
        {
            return context.RegisteredUsers.Include(x => x.User)
                                          .ThenInclude(x => x.Address)
                                          .Where(x => x.Id == (int)keyValues[0])
                                          .FirstOrDefault();
                                          
        }
    }
}
