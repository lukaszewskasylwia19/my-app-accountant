import { useState } from "react";

interface AddQuestionFormProps {
  onAddQuestion: (question: string, correctAnswer: string, options: string[]) => void;
}

export default function AddQuestionForm({ onAddQuestion }: AddQuestionFormProps) {
  const [newQuestion, setNewQuestion] = useState("");
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", ""]);

  const handleSubmit = () => {
    if (newQuestion && newCorrectAnswer && newOptions.every(opt => opt.trim() !== "")) {
      onAddQuestion(newQuestion, newCorrectAnswer, newOptions);
      setNewQuestion("");
      setNewCorrectAnswer("");
      setNewOptions(["", "", ""]);
    }
  };

  return (
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
      <button onClick={handleSubmit}>Dodaj pytanie</button>
    </div>
  );
}
