import { MD5 } from 'crypto-js';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function Header() {
  const {
    player: {
      name,
      gravatarEmail,
      score,
    },
  } = useSelector((state:RootState) => ({ player: state.player }));

  function getGravatarImage() {
    const hash = MD5(gravatarEmail);

    return `https://www.gravatar.com/avatar/${hash}`;
  }
  return (
    <div>
      <img
        data-testid="header-profile-picture"
        src={getGravatarImage()}
        alt="User profile"
      />
      <span data-testid="header-player-name">
        {name}
      </span>
      <p data-testid="header-score">
        {score}
      </p>
    </div>
  );
}
