import { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DASHBOARD_PAGES } from "./pages-url.config";
import VK from "next-auth/providers/vk";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
  
            if (!response.ok) {
              console.error("Invalid credentials");
              return null;
            }
            let userWithoutPass = {
                email: credentials.email
            }
            return userWithoutPass as User;
          } catch (error) {
            console.error("Authorization error:", error);
            return null;
          }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login'
  }
};
