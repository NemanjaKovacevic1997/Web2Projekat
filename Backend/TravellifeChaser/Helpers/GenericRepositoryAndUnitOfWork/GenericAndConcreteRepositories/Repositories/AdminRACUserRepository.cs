using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories
{
    public class AdminRACUserRepository : Repository<AdminRACUser>, IAdminRACUserRepository
    {
        public AdminRACUserRepository(TravellifeChaserDBContext context) : base(context)
        {

        }
    }
}
