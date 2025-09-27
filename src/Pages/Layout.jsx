
import Navbar from "../Components/Navbar";

export default function Layout({ children }) {
  return (
   <div className="relative min-h-screen pb-16">
  {children}
  <Navbar />
</div>

  );
}
