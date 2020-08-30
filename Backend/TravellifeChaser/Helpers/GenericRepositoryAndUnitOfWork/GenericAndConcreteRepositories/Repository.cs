using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TravellifeChaser.Data;

namespace TravellifeChaser.Helpers
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(params object[] keyValues);
        void Add(TEntity entity);
        void Update(TEntity modifiedOldEntity);
        void Remove(params object[] keyValues);
        bool Any(Expression<Func<TEntity, bool>> expression);
        IEnumerable<TEntity> GetByCondition(Expression<Func<TEntity, bool>> expression);
    }

    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly TravellifeChaserDBContext context;       

        public Repository(TravellifeChaserDBContext context)
        {
            this.context = context;
        }

        public virtual TEntity Get(params object[] keyValues)
        {
            return context.Set<TEntity>().Find(keyValues);
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return context.Set<TEntity>().ToList();
        }

        public virtual void Add(TEntity entity)
        {
            context.Set<TEntity>().Add(entity);
            //context.SaveChanges();
        }

        public virtual void Remove(params object[] keyValues)
        {
            var ret = context.Set<TEntity>().Find(keyValues);
            context.Set<TEntity>().Remove(ret);
            //context.SaveChanges();
        }


        public virtual void Update(TEntity modifiedOldEntity)
        {
            context.Entry(modifiedOldEntity).State = EntityState.Modified;
            //context.SaveChanges();
        }

        public virtual IEnumerable<TEntity> GetByCondition(Expression<Func<TEntity, bool>> expression)
        {
            return this.context.Set<TEntity>().Where(expression).AsNoTracking();
        }

        public virtual bool Any(Expression<Func<TEntity, bool>> expression)
        {
            return context.Set<TEntity>().Any(expression);
        }
    }
}