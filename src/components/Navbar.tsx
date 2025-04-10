import Image from "next/image"
import Link from "next/link"
import { auth, signIn, signOut } from "../../auth"

const Navbar = async () => {

    const session = await auth();
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center gap-5 text-black' >
                <Link href={"/"}>
                    <Image
                        src={"/logo.png"}
                        alt="logo"
                        width={144}
                        height={30}
                        className="cursor-pointer"
                    />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session?.user ? (
                        <>
                            <Link href={"/startup/create"}>
                                <span>Create</span>
                            </Link>
                            
                            <form action={
                                async () => {
                                    "use server"
                                    await signOut();
                                }
                            }>
                                <button 
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    Logout
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span> {session?.user.name} </span>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={
                                async () => {
                                    "use server";
                                    await signIn("github");
                                }
                            }
                        >
                            <button 
                                type="submit"
                                className="cursor-pointer"
                            >
                                Login with GitHub
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar