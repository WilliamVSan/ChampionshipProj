using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChampionshiAPI.Models
{
    public class Match
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("Name")]
        public string GameName { get; set; }
        public string Description { get; set; }
        public List<string> PlayerList { get; set; }
        public string WinnerName { get; set; }
        public string MatchDate { get; set; }
        public string LogoURL { get; set; }
        public string Cover { get; set; }
        
    }
}