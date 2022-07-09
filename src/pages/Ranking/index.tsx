import { Link } from 'react-router-dom';
import { getLocalStorageRanking } from '../../services/localStorage';

interface IUser {
  id: number
  name: string
  picture: string
  score: number
}

export function Ranking() {
  const users: IUser[] = getLocalStorageRanking();
  const sortedRanking = users.sort((a:IUser, b:IUser) => (b.score - a.score));
  return (
    <div>
      <Link to="/" data-testid="btn-go-home">Play Again</Link>
      <h1 data-testid="ranking-title">Ranking</h1>
      {
        sortedRanking.map((user) => (
          <div key={user.id}>
            <img src={user.picture} alt="" />
            <p data-testid={`player-name-${user.id}`}>{user.name}</p>
            <p data-testid={`player-score-${user.id}`}>{user.score}</p>
          </div>
        ))
      }

    </div>
  );
}
