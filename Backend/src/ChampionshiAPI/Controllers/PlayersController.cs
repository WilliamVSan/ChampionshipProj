using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChampionshiAPI.Models;
using ChampionshiAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChampionshiAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : Controller
    {
        private readonly PlayerService _playerService;

        public PlayersController(PlayerService playerService)
        {
            _playerService = playerService;
        }
        
        [HttpGet]
        public ActionResult<List<Player>> Get() =>
            _playerService.GetPlayer();

        [HttpGet("/api/Players/{id:length(24)}", Name = "GetPlayer")]
        public ActionResult<Player> Get(string id) =>
            _playerService.GetPlayerById(id);

        [HttpGet("{email}", Name = "GetPlayerIdByEmail")]
        public string GetPlayerIdByEmail(string email) =>
            _playerService.GetPlayerIdByEmail(email);
        
        [HttpPost]
        [Route("register")]
        public ActionResult<Player> Post(Player player)
        {
            _playerService.CreatePlayer(player);

            return CreatedAtRoute("GetPlayer", new {id = player.Id.ToString() }, player);
        }

        [HttpPost]
        [Route("authenticate")]
        [AllowAnonymous]
        public ActionResult Login( [FromBody] Player player)
        {
            var token = _playerService.Authenticate(player.Email, player.Password);

            player.Id = _playerService.GetPlayerIdByEmail(player.Email);

            if (token == null)
                return Unauthorized();
            
            return Ok(new {token, player});
        }

        [HttpPut("/api/Players/update/{id:length(24)}")]
        public async Task<IActionResult> UpdatePlayer(string id, Player updatedPlayer)
        {
            if(id != updatedPlayer.Id)
                return BadRequest();

            await _playerService.UpdatePlayer(updatedPlayer);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var player = _playerService.GetPlayerById(id);
            
            if(player == null)
            {
                return NotFound();
            }

            _playerService.DeletePlayer(id);

            return NoContent();
        }

    }
}