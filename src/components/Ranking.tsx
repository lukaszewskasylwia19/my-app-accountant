interface RankingProps {
    ranking: number[];
    resetRanking: () => void;
  }
  
  export default function Ranking({ ranking, resetRanking }: RankingProps) {
    return (
      <div className="ranking-container">
        <h3>Ranking</h3>
        <ul>
          {ranking.map((score, index) => (
            <li key={index}>Gracz {index + 1}: {score} pkt</li>
          ))}
        </ul>
        <button onClick={resetRanking}>Resetuj ranking</button>
      </div>
    );
  }
  