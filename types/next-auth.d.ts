import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: "admin" | "editor";
  }
  interface Session {
    user: {
      role?: "admin" | "editor";
    } & import("next-auth").DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "editor";
  }
}
