
import ProductList from "@/app/components/page-ui/product-card";
import Menu from "@/app/components/page-ui/menu";
import Header from "@/app/components/page-ui/header";

export default function Home() {
    return (
        <main className="w-full flex min-h-screen flex-col items-center justify-between py-5">
            <Header/>
            <Menu/>
            <ProductList/>
        </main>
    );
}
