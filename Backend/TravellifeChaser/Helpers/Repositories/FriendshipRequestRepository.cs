using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravellifeChaser.Data;
using TravellifeChaser.Models;

namespace TravellifeChaser.Helpers.Repositories
{
    public class FriendshipRequestRepository : Repository<FriendshipRequest>
    {
        public FriendshipRequestRepository(TravellifeChaserDBContext context) : base(context)
        {
            
        }

        public override void Add(FriendshipRequest entity)
        {
            if (Any(x => (x.FromId == entity.FromId && x.ToId == entity.ToId) || (x.FromId == entity.ToId && x.ToId == entity.FromId)))
                return;

            base.Add(entity);
        }
    }
}
