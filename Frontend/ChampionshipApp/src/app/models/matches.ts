import { PlayerResponse } from "./Players";

export interface Match{
    _id: string;
    GameName: string;
    Description: string;
    PlayerList: Array<string>;
    WinnerName: string;
    MatchDate: string;
    LogoURL: string;
    Cover: string;
}
export interface MatchResponse{
  _id: string;
  GameName: string;
  Description: string;
  PlayerList: Array<PlayerResponse>;
  WinnerName: string;
  MatchDate: string;
  LogoURL: string;
  Cover: string;
}
