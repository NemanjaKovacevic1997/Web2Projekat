using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models.RACSystem;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories
{
    public class CarRepository : Repository<Car>, ICarRepository
    {
        public CarRepository(TravellifeChaserDBContext context) : base(context)
        {

        }
    }
}
