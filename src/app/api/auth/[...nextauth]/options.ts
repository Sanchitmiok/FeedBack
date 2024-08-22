import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            //email ya fir username se serach karega
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            console.log("User not found");
            throw new Error("No user found with this email or username");
          }
          console.log("User = > ",user);
          

          if (!user.isVerified) {
            console.log("User not verified")
            throw new Error("Please verify your account before login");
          }
          // console.log("isVerified= > ",user.isVerified);

          const isPassCorrect = await bcrypt.compare( // ye compare karega given password aur database me store password ko
            credentials.password,
            user.password
          );
          // if(isPassCorrect) console.log("Password is also correct");
          

          if (!isPassCorrect) {
            console.log("Password incorrect")
            throw new Error("Incorrect Password");
          }
            return user  // ye user vapas provider ke pass jyega aur fir aage use hoga
        } catch (error: any) {
          console.log("Backend Error" , error)
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks : {
    // User ke login ke time JWT token ko customize karta hai.
      async jwt ({token , user}){
        if(user){
          token._id = user._id?.toString();
          token.isVerified = user.isVerified;
          token.isAcceptingMessages = user.isAcceptingMessages;
          token.username = user.username;
        }
        return token;
      },

      // Session create hone ke time session object ko customize karta hai.
      async session({session , token}){
        if(token){
          session.user._id = token._id;
          session.user.isVerified = token.isVerified;
          session.user.isAcceptingMessages = token.isAcceptingMessages;
          session.user.username = token.username;
        }
        return session;
      }

      // Ye callbacks ensure karte hain ki user ke additional details JWT token aur session object me store ho, jo aapke application me user ke state ko manage karne me madadgar hote hain.
  },
  
  session:{
    strategy:'jwt'
  },

  // NextAuth.js configuration me ek secret key set karti hai jo JWT tokens aur session cookies ko sign aur encrypt karne ke liye use hoti hai.
  secret : process.env.NEXTAUTH_SECRET,

  //jab user sign-in karne ki koshish karega, to /sign-in page pe redirect hoga.
  pages:{
    signIn : '/sign-in',
  }
};
