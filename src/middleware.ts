import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/auth/login", // ✅ correct
  },
});

export const config = { matcher: ["/profile"] };
