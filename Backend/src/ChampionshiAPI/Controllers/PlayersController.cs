using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChampionshiAPI.Models;
using ChampionshiAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChampionshiAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly PlayerService _playerService;

        public PlayersController(PlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public ActionResult<List<Player>> Get() =>
            _playerService.GetPlayer();

        [HttpGet("{id:length(24)}", Name = "GetPlayer")]
        public ActionResult<Player> Get(string id) =>
            _playerService.GetPlayerById(id);

        [HttpGet("{name}", Name = "GetByName")]
        public ActionResult<Player> GetByName(string name) =>
            _playerService.GetPlayerByName(name);
        
        [HttpPost]
        public ActionResult<Player> Post(Player player)
        {
            _playerService.CreatePlayer(player);

            return CreatedAtRoute("GetPlayer", new {id = player.Id.ToString() }, player);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Put(string id, Player playerIn)
        {
            var player = _playerService.GetPlayerById(id);

            if (player == null)
                return NotFound();

            _playerService.UpdatePlayer(id, playerIn);

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