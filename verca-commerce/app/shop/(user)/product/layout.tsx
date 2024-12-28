import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import Breadcrumbs from '@/components/nav/BreadCrumps';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
