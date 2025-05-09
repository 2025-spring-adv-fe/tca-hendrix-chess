import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

interface ChessGameProps {
  moves: string[];
  onMoveUpdate: (moves: string[]) => void;
}

const ChessGame: React.FC<ChessGameProps> = ({ moves, onMoveUpdate }) => {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState("start");

  // reset the game when moves are cleared
  useEffect(() => {
    if (moves.length === 0 && gameRef.current.history().length > 0) {
      gameRef.current.reset();
      setFen(gameRef.current.fen());
    }
  }, [moves]);

const safeGameMutate = (modify: (g: Chess) => void) => {
  const game = gameRef.current;
  modify(game);
  setFen(game.fen());
  onMoveUpdate(game.history()); // This is the move history updating in real time! 
};


  const onDrop = (source: string, target: string): boolean => {
    let move = null;
    safeGameMutate((g) => {
      move = g.move({
        from: source,
        to: target,
        promotion: "q",
      });
    });
    return move !== null;
  };

  return (
    <Chessboard
      position={fen}
      onPieceDrop={onDrop}
      boardWidth={400}
    />
  );
};

export default ChessGame;


