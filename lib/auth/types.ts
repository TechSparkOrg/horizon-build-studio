export type TokenPayload = Readonly<{
  userId: string;
  role: "admin" | "editor";
  type: "access";
}>;

export type AuthUser = Readonly<{
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "editor";
}>;

export type LoginResult = Readonly<{
  user: AuthUser;
  accessToken: string;
}>;
