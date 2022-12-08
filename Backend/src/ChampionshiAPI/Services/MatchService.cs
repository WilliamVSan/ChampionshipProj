using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChampionshiAPI.Data;
using ChampionshiAPI.Models;
using MongoDB.Driver;

namespace ChampionshiAPI.Services
{
    public class MatchService
    {
        private readonly IMongoCollection<Match> _matches;
        public MatchService(IChampionshipDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _matches = database.GetCollection<Match>(settings.MatchesCollectionName);
        }

        public List<Match> GetMatch() =>
            _matches.Find(match => true).ToList();
        public Match GetMatchById(string id) =>
            _matches.Find<Match>(match => match.Id == id).FirstOrDefault();
        
        public Match CreateMatch(Match match)
        {
            _matches.InsertOne(match);
            return match;
        }

        public void UpdateMatch(string id, Match matchIn) =>
            _matches.ReplaceOne(match => match.Id == id, matchIn);
        
        public void DeleteMatch(Match matchIn) =>
            _matches.DeleteOne(matchIn => matchIn.Id == matchIn.Id);
        
        public void DeleteMatch(string id) =>
            _matches.DeleteOne(match => match.Id == id);

    }
}