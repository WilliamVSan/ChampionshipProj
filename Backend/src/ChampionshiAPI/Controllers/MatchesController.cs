using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChampionshiAPI.Data;
using ChampionshiAPI.Models;
using ChampionshiAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChampionshiAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchesController : ControllerBase
    {
        private readonly MatchService _matchService;
        public MatchesController(MatchService matchService)
        {
            _matchService = matchService;
        }

        [HttpGet]
        public ActionResult<List<MatchResponse>> Get() =>
            _matchService.GetMatch();
        
        
        [HttpGet("{id:length(24)}", Name = "GetMatch")]
        public ActionResult<Match> Get(string id)
        {
            var match = _matchService.GetMatchById(id);

            if (match == null)
            {
                return NotFound();
            }
            return match;
        }

        [HttpGet("{gameName}", Name = "GetMatchByName")]
        public ActionResult<Match> GetMatchByName(string gameName){
            var match = _matchService.GetMatchByGameName(gameName);

            if (match == null)
            {
                return NotFound();
            }
            return match;
        
        }

        [HttpPost]
        public ActionResult<Match> Post(Match match)
        {
            _matchService.CreateMatch(match);

            return CreatedAtRoute("GetMatch", new { id = match.Id.ToString() }, match);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Put(string id, Match matchIn)
        {
            var match = _matchService.GetMatchById(id);

            if (match == null)
            {
                return NotFound();
            }

            _matchService.UpdateMatch(id, matchIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var match = _matchService.GetMatchById(id);

            if (match == null)
            {
                return NotFound();
            
            }

            _matchService.DeleteMatch(id);
            
            return NoContent();
        }
    }
}
