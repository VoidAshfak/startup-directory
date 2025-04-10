import { formatDate, cn } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Skeleton } from "./ui/skeleton"


const StartupCard = ({ post }: any) => {

    return (
        <>
            <li className="startup-card group">
                <div className="flex-between">
                    <p className="startup-card_date">
                        {formatDate(post._createdAt)}
                    </p>
                    <div className="flex gap-1.5">
                        <EyeIcon className="size-6 text-primary" />
                        <p className="text-16-medium">{post.views}</p>
                    </div>
                </div>

                <div className="flex-between mt-5 gap-5">
                    <div className="flex-1">
                        <Link href={`/user/${post.autor?._id}`}>
                            <p className="text-16-medium line-clamp-1">
                                {post.author?.name}
                            </p>
                        </Link>
                        <Link href={`/startup/${post._id}`}>
                            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
                        </Link>
                    </div>
                    <Link href={`/user/${post.autor?._id}`}>
                        <Image
                            src={post.author?.image}
                            alt="author"
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    </Link>
                </div>
                <Link href={`/startup/${post._id}`}>
                    <p className="startup-card_desc">
                        {post.description}
                    </p>
                    <img src={post.image} alt="startup" className="startup-card_img" />
                </Link>

                <div className="flex-between mt-5 gap-3">
                    <Link href={`/?query=${post.catagory?.toLowerCase()}`}>
                        <p className="text-16-medium "> {post.catagory} </p>
                    </Link>
                    <Button className="startup-card_btn" asChild>
                        <Link href={`/startup/${post._id}`}>
                            Details
                        </Link>
                    </Button>
                </div>

            </li>
        </>
    )
}

export const StartupCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index: number) => (
            <li key={cn("skeleton", index)}>
                <Skeleton className="startup-card_skeleton" />
            </li>
        ))}
    </>
);

export default StartupCard