import "/src/style/layout/Footer.css";


export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Księgowość Quiz. Wszelkie prawa zastrzeżone.</p>
    </footer>
  );
}
