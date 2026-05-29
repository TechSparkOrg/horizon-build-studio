export type AuthUser = Readonly<{
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "editor";
}>;

export type LoginResult = Readonly<{
  user: AuthUser;
}>;
