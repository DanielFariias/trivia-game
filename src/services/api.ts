const getSessionApiToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';

  const { token } = await fetch(url)
    .then((res) => res.json());

  return token;
};

const getQuestionsApi = (token: string) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const response = fetch(url)
    .then((res) => res.json());

  return response;
};

export { getSessionApiToken, getQuestionsApi };
