using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChampionshiAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChampionshiAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchController : ControllerBase
    {
        public IEnumerable<Match> _match = new Match[] {
            new Match(){
            MatchId = 1,
            GameName = "Gartic",
            PlayerList = new List<Player>
            { 
                new Player {
                PlayerId = 1,
                PlayerName = "Will",
                Password = "Senha",
                ImageURL = "https://i.pinimg.com/736x/21/18/54/2118543235117ee07b6301814c774a33.jpg",
                TotalPoints = 0
                },
                new Player {
                PlayerId = 2,
                PlayerName = "Vih",
                Password = "Senha",
                ImageURL = "https://i.pinimg.com/736x/21/18/54/2118543235117ee07b6301814c774a33.jpg",
                TotalPoints = 0
                }
           },
           WinnerId = 2,
           MatchDate = DateTime.Now.AddDays(2).ToString()
           }
        };
        public MatchController()
        {

        }
        [HttpGet]
        public IEnumerable<Match> Get()
        {
            return _match;
        }
        
        [HttpGet("{id}")]
        public IEnumerable<Match> GetMatchById(int id)
        {
            return _match.Where(match => match.MatchId == id);
        }
        [HttpPost]
        public string Post()
        {
            return "Post example";
        }
        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Put example: {id}";
        }
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Delete example: {id}";
        }
    }
}
