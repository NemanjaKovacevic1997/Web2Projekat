using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories
{
    public class AdminSysUserRepository : Repository<AdminSysUser>, IAdminSysUserRepository
    {
        public AdminSysUserRepository(TravellifeChaserDBContext context) : base(context)
        {

        }
    }
}
