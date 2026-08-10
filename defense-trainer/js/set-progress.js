export const QUESTION_SET_SIZE = 10;

export function setWindow(questionIndex, totalQuestions, setSize = QUESTION_SET_SIZE) {
  if (!Number.isInteger(questionIndex) || questionIndex < 0 || questionIndex >= totalQuestions) {
    throw new RangeError("题目索引超出范围");
  }
  if (!Number.isInteger(setSize) || setSize < 1) throw new RangeError("每套题数必须为正整数");

  const setIndex = Math.floor(questionIndex / setSize);
  const start = setIndex * setSize;
  const end = Math.min(start + setSize, totalQuestions);
  return {
    setIndex,
    setNumber: setIndex + 1,
    setCount: Math.ceil(totalQuestions / setSize),
    start,
    end,
    length: end - start,
    position: questionIndex - start + 1,
    isLastQuestion: questionIndex === end - 1,
    hasNextSet: end < totalQuestions,
  };
}

export function scoreSummary(correctAnswers, answeredQuestions) {
  if (!Number.isInteger(correctAnswers) || !Number.isInteger(answeredQuestions)) {
    throw new TypeError("答题数必须为整数");
  }
  if (correctAnswers < 0 || answeredQuestions < 1 || correctAnswers > answeredQuestions) {
    throw new RangeError("答题统计无效");
  }
  return {
    correctAnswers,
    answeredQuestions,
    accuracy: Math.round((correctAnswers / answeredQuestions) * 100),
  };
}
