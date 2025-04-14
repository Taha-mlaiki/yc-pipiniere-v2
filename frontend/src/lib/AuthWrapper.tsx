import { serverFetch, ApiServerError } from "@/lib/serverFetch";
import { redirect } from "next/navigation";

export type Role = "client" | "employee" | "admin";

interface AuthWrapperProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export default async function AuthWrapper({ allowedRoles, children }: AuthWrapperProps) {
  try {
    const { role } = await serverFetch.get("/user");

    if (!allowedRoles.includes(role)) { // unauthorized
      if(role == "admin"){
        redirect("/dashboard");
      }
      if(role == "employee"){
        redirect("/plants1");
      }
      if(role == "client"){
        redirect("/");
      }
    }
  } catch (error: unknown) {
    if (error instanceof ApiServerError) {
      if (error.status === 401) {
        redirect("/login");
      }
      if (error.status === 403) {
        redirect("/"); // unauthorized
      }
    }
    throw error; // Rethrow for error.tsx
  }

  return <>{children}</>;
}