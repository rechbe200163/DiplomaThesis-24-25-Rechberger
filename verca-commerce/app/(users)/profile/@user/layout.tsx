
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow ">
      <div>{children}</div>
    </div>
  );
}
