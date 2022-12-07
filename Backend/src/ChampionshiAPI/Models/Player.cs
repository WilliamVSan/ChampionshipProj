using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChampionshiAPI.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string PlayerName { get; set; }
        public string Password { get; set; }
        public string ImageURL { get; set; }
        public int? TotalPoints { get; set; }

    }
}