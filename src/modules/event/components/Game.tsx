/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';

export default function Game({ question }) {
  const [isOver, setIsOver] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<any>(0);
  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState(
    question[currentQuestionIndex] ? question[currentQuestionIndex].answer : ''
  );
  const [correctAnswerTotal, setCorrectAnswerTotal] = useState(0);
  const [incorrectAnswerTotal, setIncorrectAnswerTotal] = useState(0);
  const [timer, setTimer] = useState(100);

  useEffect(() => {
    if (!isOver) {
      const interval = setInterval(() => {
        if (timer > 0)
          setTimer((timer) => Math.floor(timer - Math.floor(question[currentQuestionIndex].time / 1000)));
      }, 1000);

      if (timer == 0 && question.length - 1 == currentQuestionIndex) setIsOver(true);
      if (timer == 0 && isOver == false) setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (timer == 0 && isOver == false) setTimer(100);
      if (timer == 0 && isOver == false) setIncorrectAnswerTotal(incorrectAnswerTotal + 1);

      return () => clearInterval(interval);
    } else {
      setTimer(0);
    }
  }, [timer, isOver]);

  const handleReplay = () => {
    setIsOver(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswerTotal(0);
    setIncorrectAnswerTotal(0);
  };

  function handleClick(ans) {
    setCurrentQuestionIndex((currentQuestionIndex) => {
      ans === currentQuestionAnswer
        ? setCorrectAnswerTotal(correctAnswerTotal + 1)
        : setIncorrectAnswerTotal(incorrectAnswerTotal + 1);
      if (timer !== 0 && isOver == false && question.length - 1 == currentQuestionIndex)
        return setIsOver(true);
      if (timer !== 0 && isOver == false) setTimer(100);
      if (timer !== 0 && isOver == false) setCurrentQuestionAnswer(question[currentQuestionIndex + 1].answer);
      if (timer !== 0 && isOver == false) return currentQuestionIndex + 1;
    });
  }

  return (
    <div className="overflow-hidden select-none relative h-screen">
      {isOver ? (
        <div className="backdrop-blur-md z-50 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
          <div className="bg-gray-100 p-6 w-full md:w-1/2 2xl:w-1/3 border shadow-2xl mx-auto flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Your score</h2>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-8xl">
                    {correctAnswerTotal} / {question.length}
                  </h3>
                  <div className="mt-4 mb-4">Incorrect Answer: {incorrectAnswerTotal}</div>
                  <button
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2 rounded-full text-white font-bold hover:opacity-75"
                    type="button"
                    onClick={handleReplay}
                  >
                    Play again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="absolute top-0 h-2 z-10 bg-gray-300 w-full" style={{ width: `${timer}%` }}></div>
      <div className="h-[45vh] p-6 mb-4 flex items-center justify-center relative">
        <div className="bg-gradient-to-b from-blue-500 to-white absolute top-0 left-0 right-0 bottom-0"></div>
        <h3 className="absolute top-2 left-3 z-10">
          <div className="font-bold">
            Question: <span id="totalQuestion">{question.length}</span>
          </div>
          <div className="font-bold">
            Correct: <span id="totalCorrect">{correctAnswerTotal}</span>
          </div>
          <div className="font-bold">
            Incorrect: <span id="totalIncorrect">{incorrectAnswerTotal}</span>
          </div>
        </h3>
        <div className="font-bold text-4xl z-10 text-center">
          {question.length - 1 >= currentQuestionIndex ? question[currentQuestionIndex].question : ''}
        </div>
      </div>

      <div className="h-[50vh] flex justify-between items-center space-x-5 mx-5">
        {question.length - 1 >= currentQuestionIndex
          ? question[currentQuestionIndex].choices.map((seg) => {
              return (
                <div
                  key={seg}
                  onClick={() => handleClick(seg)}
                  className="p-4 bg-blue-400 border-blue-500 hover:bg-blue-600 hover:border-blue-600 duration-300 border-2 h-80 w-full rounded-lg cursor-pointer flex items-center justify-center"
                >
                  <div className="text-white font-sans font-bold text-2xl text-center">{seg}</div>
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
}
