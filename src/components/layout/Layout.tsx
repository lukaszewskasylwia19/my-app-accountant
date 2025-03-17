import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../../style/layout/Layout.css"; // ✅ Poprawiona ścieżka



interface LayoutProps {
  children: React.ReactNode;
  setSection: (section: string) => void;
}

export default function Layout({ children, setSection }: LayoutProps) {
  return (
    <div className="layout-container">
      <Navbar setSection={setSection} />
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
}
