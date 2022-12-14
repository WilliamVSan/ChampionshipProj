import { Player } from "./players";

export class Match {
    id!: string;
    gameName!: string;
    playerList!: Array<Player>;
    winnerId!: string;
    matchDate!: string;
}
