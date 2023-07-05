using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ChampionshiAPI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace ChampionshiAPI.Services
{
    public class PlayerService
    {
        private readonly IMongoCollection<Player> _players;

        private readonly string key;

        public PlayerService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("ChampionshipDb"));
            var database = client.GetDatabase("Championship");

            _players = database.GetCollection<Player>("Players");

            this.key = configuration.GetSection("JwtKey").ToString();
        }

        public string Authenticate(string email, string password)
        {
            var user = _players.Find(player => player.Email == email && player.Password == password).FirstOrDefault();

            if(user == null)
                return null;
            
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenKey = Encoding.ASCII.GetBytes(key);

            var tokenDescriptor = new SecurityTokenDescriptor() {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.Email, email),
                }),
                
                Expires = DateTime.UtcNow.AddHours(1),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string GetPlayerIdByEmail(string email)
        {
            var user = _players.Find(player => player.Email == email).FirstOrDefault();
            return user.Id;
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

        public async Task UpdatePlayer(Player updatedPlayer)
        {
           await _players.ReplaceOneAsync(player => player.Id == updatedPlayer.Id, updatedPlayer);
        }
        
        public void DeletePlayer(Player player) =>
            _players.DeleteOne(player => player.Id == player.Id);

        public void DeletePlayer(string id) =>
            _players.DeleteOne(player => player.Id == id);

    }
}