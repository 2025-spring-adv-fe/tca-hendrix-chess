//
// Exported Interface...
//


export interface GameResult {
    winner: string;
    players: string[];
    start: string;
    end: string;
};

export interface LeaderboardEntry {
    wins: number;
    losses: number;
    average: string;
    player: string;
}

//
// Exported Functions...
//

export const getLeaderboard = (
    results: GameResult[]
): LeaderboardEntry[] => 
    getPreviousPlayers(results)
        .map(
            x => getLeaderboardEntry(
                    results
                    , x
                )
        )
        .sort(
            (a, b) => {
                if (Number(b.average) - Number(a.average) && a.wins > 0) {
                    return (b.wins + b.losses) - (a.wins + a.losses);
                }

                if (0 === a.wins && 0 === b.wins) {
                    return (a.wins + a.losses) - (b.wins + b.losses);
                }

                return Number(b.average) - Number(a.average);
            }
        )
;

//
// Helper Functions...
//

const getLeaderboardEntry = (
    results: GameResult[]
    , player: string
): LeaderboardEntry => {

    const totalGamesForPlayer = results.filter(
        x => x.players.some(
            y => player === y
        )
    ).length;


    const wins = results.filter(
        x => x.winner === player 
    ).length;

   
    const avg = totalGamesForPlayer > 0
        ? wins / totalGamesForPlayer
        : 0
    ;

    return {
        wins: wins
        , losses: totalGamesForPlayer - wins
        , average: avg.toFixed(3)
        , player: player
    };
};

const getPreviousPlayers = (
    results: GameResult[]
) => {
    const allPlayersForAllGamesWithDupes = results.flatMap(
        x => x.players
    );

    return [
        ...new Set(allPlayersForAllGamesWithDupes)
    ].sort(
        (a, b) => a.localeCompare(b)
    );
};