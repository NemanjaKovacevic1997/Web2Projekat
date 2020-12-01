using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models.RACSystem.Many_To_ManyEntities;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories
{
    public class RACAddressRentRepository : Repository<RACAddressRent>, IRACAddressRentRepository
    {
        public RACAddressRentRepository(TravellifeChaserDBContext context) : base(context)
        {

        }
    }
}
