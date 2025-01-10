import NavBar from "@/app/ui/NavBar";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        {/* nav */}
        <NavBar />
        {/* invoice form */}
      </header>
      <main>{children}</main>
    </div>
  );
}
