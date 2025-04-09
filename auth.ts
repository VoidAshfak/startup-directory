import { client } from "@/sanity/lib/client"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_QUERY } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_QUERY, { id: profile?.id });

            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id: profile?.id,
                    name: user?.name,
                    username: profile?.login,
                    email: user?.email,
                    image: user?.image,
                    bio: profile?.bio || ""
                })
            } 
            
            return true;
        },

        async jwt({ token, account, profile }) {
            
            if(account && profile) {
                const user = await client.fetch(AUTHOR_BY_GITHUB_QUERY, { id: profile?.id });
                token.id = user?._id
            }
            
            return token
        },

        async session({ session, token }) {
            Object.assign(session, { id: token.id })
            return session
        }
    
    },

    // session: {
    //     strategy: "jwt"
    // }
})