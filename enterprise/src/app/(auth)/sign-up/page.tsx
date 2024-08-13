import Image from "next/image"
import SignUp from "@/components/auth/sign-up";


export default function Register() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] ">
            <div className="flex items-center justify-center py-12">

               <SignUp/>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1720541343/hero-1_raxkds.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover object-center brightness-[0.2] grayscale"
                />
            </div>
        </div>
    )
}
