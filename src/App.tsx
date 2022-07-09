import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Feedback } from './pages/Feedback';
import { Game } from './pages/Game';
import { Login } from './pages/Login';
import { Ranking } from './pages/Ranking';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
