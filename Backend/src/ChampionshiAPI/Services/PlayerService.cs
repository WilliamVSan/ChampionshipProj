using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChampionshiAPI.Data;
using ChampionshiAPI.Models;
using MongoDB.Driver;

namespace ChampionshiAPI.Services
{
    public class PlayerService
    {
        private readonly IMongoCollection<Player> _players;

        public PlayerService(IChampionshipDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _players = database.GetCollection<Player>(settings.PlayersCollectionName);
        }

        public List<Player> GetPlayer() =>
            _players.Find(player => true).ToList();
        
        public Player GetPlayerById(string id) =>
            _players.Find<Player>(player => player.Id == id).FirstOrDefault();
        
        public Player GetPlayerByName(string name) =>
            _players.Find<Player>(player => player.PlayerName == name).FirstOrDefault();

        public Player CreatePlayer(Player player)
        {
            _players.InsertOne(player);
            return player;
        }

        public void UpdatePlayer(string id, Player playerIn) =>
            _players.ReplaceOne(player => player.Id == id, playerIn);
        
        public void DeletePlayer(Player player) =>
            _players.DeleteOne(player => player.Id == player.Id);

        public void DeletePlayer(string id) =>
            _players.DeleteOne(player => player.Id == id);

    }
}