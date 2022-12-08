using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChampionshiAPI.Data
{
    public class ChampionshipDatabaseSettings : IChampionshipDatabaseSettings
    {
        public string MatchesCollectionName { get; set; }
        public string PlayersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
    public interface IChampionshipDatabaseSettings
    {
        string MatchesCollectionName { get; set; }
        public string PlayersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}