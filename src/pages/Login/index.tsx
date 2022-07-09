import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSessionApiToken } from '../../services/api';
import { saveLocalStorageToken } from '../../services/localStorage';
import { loggingUser } from '../../store/features/playerSlice';

export function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (event:MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await getSessionApiToken();

    saveLocalStorageToken(token);
    dispatch(loggingUser({ name, email }));

    navigate('/game');
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="input-player-name">
          Seu Nome:
          <input
            data-testid="input-player-name"
            id="input-player-name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Seu Email:
          <input
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={!name || !email}
        >
          Play
        </button>
      </form>
      <button
        type="button"
        data-testid="btn-settings"
        onClick={() => navigate('/settings')}
      >
        Configurações
      </button>
    </div>
  );
}
