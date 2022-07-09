import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Answers from '../../components/Answers';
import { Header } from '../../components/Header';

import { getQuestionsApi } from '../../services/api';
import { deleteToken, getLocalStorageToken } from '../../services/localStorage';
import { answerCorrect } from '../../store/features/playerSlice';
import { IAnswers, IPointsMeasure, IQuestions } from './types';

export function Game() {
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showColor, setShowColor] = useState(false);
  const [time, setTime] = useState(30);
  const [isDisabled, setIsDisabled] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const timer = useRef<number | undefined>(undefined);

  function startTimer() {
    timer.current = setInterval(() => setTime((state) => state - 1), 1000);
  }

  function resetTimer() {
    setTime(30);
  }

  function stopTimer() {
    clearInterval(timer.current);
  }

  useEffect(() => {
    if (time === 0) {
      setIsDisabled(true);
      setCanNext(true);
      return stopTimer();
    }
  }, [time]);

  function getCurrentQuestions(asking: IQuestions[]) {
    const array = asking.map(((question: IQuestions) => {
      const answers = question.incorrect_answers
        .map((answer, index) => ({
          title: answer,
          isCorrect: false,
          testId: `wrong-answer-${index}`,
        }));

      answers.push({
        title: question.correct_answer,
        isCorrect: true,
        testId: 'correct-answer',
      });

      const middleNumber = 0.5;
      answers.sort(() => Math.random() - middleNumber);

      return {
        ...question, answers,
      };
    }));
    setQuestions(array);
  }

  useEffect(() => {
    const getAa = async () => {
      const token = getLocalStorageToken() as string;
      const response = await getQuestionsApi(token);

      if (response.response_code === 3) {
        deleteToken();
        return navigate('/');
      }

      getCurrentQuestions(response.results);
    };
    getAa();

    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  function handleClickAnswer(answer: IAnswers) {
    const { difficulty } = questions[currentIndex];

    stopTimer();

    const pointsMeasure: IPointsMeasure = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    if (!answer.isCorrect) {
      setShowColor(true);
      setCanNext(true);
      setIsDisabled(true);
      return;
    }

    const points = (time * pointsMeasure[difficulty]) + 10;

    dispatch(answerCorrect(points));

    setShowColor(true);
    setCanNext(true);
    setIsDisabled(true);
  }

  function handleClickNext() {
    if (currentIndex + 1 === 5) return navigate('/feedback');

    setShowColor(false);
    setCanNext(false);
    setIsDisabled(false);
    setCurrentIndex((state) => state + 1);

    resetTimer();
    startTimer();
  }

  if (!questions.length) return <h1>Carregando...</h1>;

  return (
    <div>
      <Header />
      <p data-testid="counter">
        time:
        {' '}
        {time}
      </p>
      <div>
        <p data-testid="question-category">{questions[currentIndex].category}</p>
        <p data-testid="question-text">{questions[currentIndex].question}</p>
        <div data-testid="answer-options">
          { questions[currentIndex]?.answers?.map(((answer) => (
            <Answers
              key={answer.testId}
              answer={answer}
              showColor={showColor}
              onClick={() => handleClickAnswer(answer)}
              isDisabled={isDisabled}
            />
          )))}
        </div>
        {
          canNext && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={handleClickNext}
            >
              Next
            </button>
          )
        }

      </div>
    </div>
  );
}
