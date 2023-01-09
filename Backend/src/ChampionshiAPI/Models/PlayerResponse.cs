using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChampionshiAPI.Models
{
    public class PlayerResponse
    {
        public string Id { get; set; }
        public string PlayerName { get; set; }
        public string ImageURL { get; set; }
        public int? TotalPoints { get; set; }
        public int? Wins { get; set; }
    }
}