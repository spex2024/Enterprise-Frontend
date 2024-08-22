import Header from "../../../components/main/header";
import {VendorProvider} from "../../store/vendor";


export default function Layout({ children }) {
    return (
        <>
            <VendorProvider>

             <Header/>
            <main>{children}</main>
            </VendorProvider>
        </>

    )
}