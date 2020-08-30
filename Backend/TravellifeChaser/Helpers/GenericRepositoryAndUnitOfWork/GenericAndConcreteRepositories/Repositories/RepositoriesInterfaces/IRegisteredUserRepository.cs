using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces
{
    public interface IRegisteredUserRepository : IRepository<RegisteredUser>
    {
        List<User> GetAllAsUser();
        User GetAsUser(int id);
    }
}
