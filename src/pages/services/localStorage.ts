export const saveLocalStorageToken = (token:string) => {
  localStorage.setItem('token', (token));
};

export const getLocalStorageToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    saveLocalStorageToken('');
    return null;
  }
  return token;
};

export const deleteToken = () => {
  localStorage.removeItem('token');
};

export const saveLocalStorageRanking = (userRanking) => {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (!ranking) {
    userRanking.id = 0;
    localStorage.setItem('ranking', JSON.stringify([userRanking]));
    return null;
  }
  userRanking.id = ranking.length;
  const newRanking = [...ranking, userRanking];
  return localStorage.setItem('ranking', JSON.stringify(newRanking));
};

export const getLocalStorageRanking = () => {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (!ranking) {
    return [];
  }
  return ranking;
};
