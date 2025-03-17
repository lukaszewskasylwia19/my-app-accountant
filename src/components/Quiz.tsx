import Card from "./Card";
import Button from "./Button";
import Question from "./Question";
import Ranking from "./Ranking";

interface QuizProps {
  questions: { question: string; correctAnswer: string; options: string[] }[];
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  questionIndex: number;
  setQuestionIndex: (index: number) => void;
  checkAnswer: () => void;
  feedback: string;
  score: number;
  ranking: number[];
  resetRanking: () => void;
}

export default function Quiz({
  questions,
  selectedAnswer,
  setSelectedAnswer,
  questionIndex,
  setQuestionIndex,
  checkAnswer,
  feedback,
  score,
  ranking,
  resetRanking
}: QuizProps) {
  return (
    <div className="lesson-container">
      <Card>
        <Question
          question={questions[questionIndex]?.question || ""}
          options={questions[questionIndex]?.options || []}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          correctAnswer={questions[questionIndex]?.correctAnswer || ""}
          feedback={feedback}
        />
        <div className="lesson-buttons">
          <Button onClick={checkAnswer}>Sprawdź</Button>
          <Button onClick={() => setQuestionIndex(Math.floor(Math.random() * questions.length))}>
            Następne pytanie
          </Button>
          <Button onClick={resetRanking}>Resetuj ranking</Button>
        </div>
        {feedback && (
          <p className={`lesson-feedback ${feedback.includes("✅") ? "correct" : "incorrect"}`}>
            {feedback}
          </p>
        )}
        <p className="lesson-score">Twój wynik: {score}</p>
        <Ranking ranking={ranking} resetRanking={resetRanking} />
      </Card>
    </div>
  );
}
