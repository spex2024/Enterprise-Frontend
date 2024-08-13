import Header from "../../../components/main/header";
import {VendorProvider} from "../../store/vendor";
import {MealProvider} from "../../store/meal";


export default function Layout({ children }) {
    return (
        <>
            <VendorProvider>
                <MealProvider>
             <Header/>
            <main>{children}</main>
              </MealProvider>
            </VendorProvider>
        </>

    )
}