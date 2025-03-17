import "../style/Question.css";

interface QuestionProps {
  question: string;
  options: string[];
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  correctAnswer: string;
  feedback: string;
}

export default function Question({ question, options, selectedAnswer, setSelectedAnswer, correctAnswer, feedback }: QuestionProps) {
    return (
      <div className="question-container">
        <h2 className="question-title">{question}</h2>
        <div className="question-options">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`question-option 
                ${selectedAnswer === option ? (feedback ? (option === correctAnswer ? "correct" : "incorrect") : "selected") : ""}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
