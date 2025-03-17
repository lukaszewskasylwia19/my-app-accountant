import "../../../style/layout/Navbar.css"; // ✅ Poprawiona ścieżka

interface NavbarProps {
  setSection: (section: string) => void;
}

export default function Navbar({ setSection }: NavbarProps) {
  return (
    <nav className="navbar">
      <button onClick={() => setSection("home")}>Strona główna</button>
      <button onClick={() => setSection("ranking")}>Ranking</button>
      <button onClick={() => setSection("add-question")}>Dodaj pytanie</button>
    </nav>
  );
}
