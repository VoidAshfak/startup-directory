import Image from "next/image";
import { auth } from "../../../auth";

export default async function Home() {
    const session = await auth();
    return (
        <div>
            <h1 className="heading">Home</h1>
            {/* <p>{JSON.stringify(session)}</p> */}
        </div>
    );
}
