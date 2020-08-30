using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories
{
    public class AdminAirlineRepository : Repository<AdminAirlinesUser>, IAdminAirlineRepository
    {
        public AdminAirlineRepository(TravellifeChaserDBContext context) : base(context)
        {

        }
    }
}
