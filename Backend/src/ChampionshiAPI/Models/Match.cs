using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChampionshiAPI.Models
{
    public class Match
    {
        public int MatchId { get; set; }
        public string GameName { get; set; }
        public List<Player> PlayerList { get; set; }
        public int? WinnerId { get; set; }
        public string MatchDate { get; set; }
    }
}