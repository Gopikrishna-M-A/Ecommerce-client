// import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios';
const baseURL = process.env.BASE_URL 

export const options = {
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "#2F2E2E", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log("user", user, "account", account, "profile", profile);
            const newUser = {
                name: user.name,
                email: user.email,
                image: user.image,
                oAuthId: user.id,
              };
              const response = await fetch(`${baseURL}/api/user`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
              });
              const data = await response.json();
            //   console.log(data);
              return true;
        },
        async session({ session }) {
              const response = await fetch(`${baseURL}/api/user/email/${session.user.email}`, { method: 'GET' });
              const data = await response.json();
              const res = await axios.get(`${baseURL}/api/cart/${data[0]._id}`);
              const userCart = res.data;
              session.user._id = data[0]._id;
              session.user.cart = userCart;
              session.user.phone = data[0].phone;
              session.user.address = data[0].address;
            return session
        }
    }
} 