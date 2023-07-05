using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChampionshiAPI.Models
{
    public class Player
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string PlayerName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ImageURL { get; set; }
        public int? TotalPoints { get; set; } = 0;
        public int? Wins { get; set; } = 0;
    }
}