import './styles.css';

function Answers({
  answer,
  showColor,
  onClick,
  isDisabled,
}: any) {
  const className = answer.isCorrect ? 'correct-answer' : 'incorrect-answer';

  return (
    <button
      className={showColor ? className : ''}
      type="button"
      data-testid={answer.testId}
      onClick={onClick}
      disabled={isDisabled}
    >
      {answer.title}
    </button>
  );
}

export default Answers;
