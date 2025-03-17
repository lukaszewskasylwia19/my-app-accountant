import "../../../style/layout/Footer.css"; // ✅ Poprawiona ścieżka

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Księgowość Quiz. Wszelkie prawa zastrzeżone.</p>
    </footer>
  );
}
