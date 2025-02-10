import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
  // secret: process.env.NEXTAUTH_SECRET,
  providers: [Google],
  callbacks: {
    async signIn({user,account}){
        console.log("User:",user);
        console.log("Account:", account);

        if(account.provider === "google"){
          try {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
              method: "POST",
              body: JSON.stringify({email: user.email}),
              headers: {
                "Content-Type": "application/json"
              }
            })
          } catch (error) {
            
          }
        }
        return user;
    },
  } 
})