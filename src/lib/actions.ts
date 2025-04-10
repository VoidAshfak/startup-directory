"use server"

import { writeClient } from "@/sanity/lib/write-client";
import { auth } from "../../auth";
import slugify from "slugify"

export const createIdea = async (state: any, data:any) => {
    const session:any = await auth();

    if (!session) return JSON.parse(JSON.stringify({ error: "Not signed in", status: "ERROR" }));

    const { title, description, category, pitch, link } = data;

    // const { title, description, category, link, pitch } = Object.fromEntries(
    //     Array.from(form),
    //   );

      const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            catagory:category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch,
            views: 0
        };

        console.log("SUBMITTED DATA: ", startup);
        
        const result = await writeClient.create({_type: "startup", ...startup})
        return JSON.parse(JSON.stringify({result, error: "", status: "SUCCESS"} ))
        
    } catch (error) {
        console.log(error);
    }
}