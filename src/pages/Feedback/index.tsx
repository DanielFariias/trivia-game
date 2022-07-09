import { MD5 } from 'crypto-js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveLocalStorageRanking } from '../../services/localStorage';
import { RootState } from '../../store';

export function Feedback() {
  const {
    player: {
      assertions, gravatarEmail, name, score,
    },
  } = useSelector((state: RootState) => ({ player: state.player }));

  function getGravatarImage() {
    const hash = MD5(gravatarEmail);
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  saveLocalStorageRanking({
    name, score, picture: getGravatarImage(),
  });

  return (
    <div>
      <h1>Tela de Feedback</h1>
      <img
        data-testid="header-profile-picture"
        src={getGravatarImage()}
        alt=""
      />
      <h2 data-testid="header-player-name">{name}</h2>
      <h2 data-testid="header-score">{score}</h2>
      <span data-testid="feedback-text">
        {
          assertions >= 3 ? 'Well Done!' : 'Could be better...'
        }
      </span>

      <div>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </div>

      <Link to="/" data-testid="btn-play-again">Play Again</Link>
      <Link to="/ranking" data-testid="btn-ranking">Ranking</Link>
    </div>
  );
}
