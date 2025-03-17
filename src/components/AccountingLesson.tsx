import { useState, useEffect, useMemo } from "react";
import Layout from "./layout/Layout";
import Home from "./Home"; // Strona główna
import Card from "./Card";
import Button from "./Button";
import Ranking from "./Ranking";
import CategorySelection from "./CategorySelection";
import Question from "./Question";
import "../style/AccountingLesson.css";

const shuffleArray = (array: string[]) => {
  return [...array]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

interface Exercise {
  question: string;
  correctAnswer: string;
  options: string[];
}

interface Exercises {
  [key: string]: Exercise[];
}

export default function AccountingLesson() {
  const [currentView, setCurrentView] = useState("home"); // Domyślnie strona główna
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState<number[]>(() => {
    const savedRanking = localStorage.getItem("ranking");
    return savedRanking ? JSON.parse(savedRanking) : [];
  });

  const [userQuestions, setUserQuestions] = useState<Exercise[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");
  const [newOptions, setNewOptions] = useState<string[]>(["", "", ""]);

  const addQuestion = () => {
    if (newQuestion && newCorrectAnswer && newOptions.every(opt => opt.trim() !== "")) {
      setUserQuestions(prev => [...prev, {
        question: newQuestion,
        correctAnswer: newCorrectAnswer,
        options: shuffleArray(newOptions)
      }]);
      setNewQuestion("");
      setNewCorrectAnswer("");
      setNewOptions(["", "", ""]);
    }
  };

  const exercises: Exercises = useMemo(() => {
    return {
      Faktury: [...userQuestions,
        {
          question: "Jak zaksięgować fakturę kosztową na 1000 zł?",
          correctAnswer: "Wn: Koszty 1000 zł / Ma: Zobowiązania 1000 zł",
          options: shuffleArray([
            "Wn: Koszty 1000 zł / Ma: Zobowiązania 1000 zł",
            "Wn: Przychody 1000 zł / Ma: Koszty 1000 zł",
            "Wn: Aktywa 1000 zł / Ma: Kapitał 1000 zł"
          ])
        }
      ],
      "Środki trwałe": [
        {
          question: "Jak zaksięgować zakup środka trwałego za 5000 zł?",
          correctAnswer: "Wn: Środki trwałe 5000 zł / Ma: Zobowiązania 5000 zł",
          options: shuffleArray([
            "Wn: Środki trwałe 5000 zł / Ma: Zobowiązania 5000 zł",
            "Wn: Kapitał 5000 zł / Ma: Przychody 5000 zł",
            "Wn: Koszty 5000 zł / Ma: Zobowiązania 5000 zł"
          ])
        }
      ]
    };
  }, [userQuestions]);

  useEffect(() => {
    localStorage.setItem("ranking", JSON.stringify(ranking));
  }, [ranking]);

  const checkAnswer = () => {
    if (!selectedCategory || exercises[selectedCategory].length === 0) return;
    
    if (selectedAnswer === exercises[selectedCategory][questionIndex]?.correctAnswer) {
      setFeedback("✅ Poprawna odpowiedź!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("❌ Spróbuj ponownie!");
    }
  };

  return (
    <Layout >
      {currentView === "home" && <Home setView={setCurrentView} />}
      
      {currentView === "start" && !selectedCategory && (
  <div>
    <button onClick={() => setCurrentView("home")}>⬅️ Cofnij</button>
    <CategorySelection
      categories={Object.keys(exercises)}
      onSelectCategory={setSelectedCategory}
    />
  </div>
)}


{currentView === "start" && selectedCategory && (
  <div>
    <button onClick={() => setSelectedCategory(null)}>⬅️ Cofnij</button>
    <Card>
      <Question
        question={exercises[selectedCategory][questionIndex]?.question || ""}
        options={exercises[selectedCategory][questionIndex]?.options || []}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        correctAnswer={exercises[selectedCategory][questionIndex]?.correctAnswer || ""}
        feedback={feedback}
      />
      <div className="lesson-buttons">
        <Button onClick={checkAnswer}>Sprawdź</Button>
        <Button onClick={() => setQuestionIndex(Math.floor(Math.random() * exercises[selectedCategory].length))}>
          Następne pytanie
        </Button>
        <Button onClick={() => setSelectedCategory(null)}>Powrót do kategorii</Button>
      </div>
      {feedback && <p className={`lesson-feedback ${feedback.includes("✅") ? "correct" : "incorrect"}`}>{feedback}</p>}
      <p className="lesson-score">Twój wynik: {score}</p>
    </Card>
  </div>
)}


      {currentView === "ranking" && <Ranking ranking={ranking} resetRanking={() => setRanking([])} />}
      
      {currentView === "add-question" && (
        <div className="add-question-form">
          <h3>Dodaj nowe pytanie</h3>
          <input type="text" placeholder="Treść pytania" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
          <input type="text" placeholder="Poprawna odpowiedź" value={newCorrectAnswer} onChange={(e) => setNewCorrectAnswer(e.target.value)} />
          {newOptions.map((option, index) => (
            <input key={index} type="text" placeholder={`Opcja ${index + 1}`} value={option} onChange={(e) => {
              const updatedOptions = [...newOptions];
              updatedOptions[index] = e.target.value;
              setNewOptions(updatedOptions);
            }} />
          ))}
          <button onClick={addQuestion}>Dodaj pytanie</button>
        </div>
      )}
    </Layout>
  );
}
