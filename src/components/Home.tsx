import Button from "./Button";
import "../style/Home.css"; // Stylizacja strony głównej

interface HomeProps {
  setView: (view: string) => void;
}

export default function Home({ setView }: HomeProps) {
  return (
    <div className="home-container">
      <h1>Witaj w Księgowość Quiz!</h1>
      <p>Wybierz opcję, aby rozpocząć:</p>
      <div className="home-buttons">
        <Button onClick={() => setView("start")}>Start</Button>
        <Button onClick={() => setView("ranking")}>Ranking</Button>
        <Button onClick={() => setView("add-question")}>Dodaj pytanie</Button>
      </div>
    </div>
  );
}
