type MoveHistoryProps = {
    moves: string[]; // e.g., ['e4', 'e5', 'Nf3', 'Nc6', ...]
  };
  
  export const MoveHistory = ({ moves }: MoveHistoryProps) => {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Move History</h2>
        <ol className="list-decimal list-inside space-y-1">
          {moves.map((move, index) => (
            <li key={index} className="text-lg">
              {move}
            </li>
          ))}
        </ol>
      </div>
    );
  };