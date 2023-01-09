using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChampionshiAPI.Models
{
    public class MatchResponse
    {
  
        public string Id { get; set; }
        public string GameName { get; set; }
        public string Description { get; set; }
        public List<PlayerResponse> PlayerList { get; set; }
        public string WinnerName { get; set; }
        public string MatchDate { get; set; }
        public string LogoURL { get; set; }
        public string Cover { get; set; }
    }
}