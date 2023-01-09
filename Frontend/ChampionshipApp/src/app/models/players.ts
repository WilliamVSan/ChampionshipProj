export interface Player{
    _id: string;
    PlayerName: string;
    Password: string;
    ImageURL: string;
    TotalPoints: number;
    Wins: number;
}
export interface PlayerResponse{
  _id: string;
  PlayerName: string;
  ImageURL: string;
  TotalPoints: number;
  Wins: number;
}
