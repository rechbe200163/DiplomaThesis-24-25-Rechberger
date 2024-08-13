import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
