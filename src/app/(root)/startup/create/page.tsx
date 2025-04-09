import StartupForm from "@/components/StartupForm"
import { auth } from "../../../../../auth"
import { redirect } from "next/navigation";

StartupForm

const page = async () => {
    const session = await auth();

    if(!session) redirect('/');
    return (
        <>
            <section className="pink_container !min-h-[230px] pattern">
                <h1 className="heading">Submit your Startup Pitch</h1>
            </section>

            <StartupForm />
        </>
    )
}

export default page