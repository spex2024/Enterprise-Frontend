import { Navbar } from "@/components/navbar";
import Menu from "@/components/page-ui/menu";


export default function Home() {
  return (
    <section className="w-full min-h-screen ">
    <Navbar/>
      <Menu/>
    </section>
  );
}
