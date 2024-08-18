import { Navbar } from "@/components/navbar";
import Menu from "@/components/page-ui/menu";
import Cart from "@/components/page-ui/cart";
import Vendors from "@/components/page-ui/vendors";

export default function Home() {
  return (
    <section className="w-full min-h-screen ">
      <Navbar />
      <Menu />
      <Vendors/>
      <Cart/>
    </section>
  );
}
