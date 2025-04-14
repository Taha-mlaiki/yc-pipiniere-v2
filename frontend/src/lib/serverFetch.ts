import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export class ApiServerError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiServerError";
  }
}

class ApiServer {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  async request(
    url: string,
    method: string = "GET",
    data?: any,
    headers: Record<string, string> = {}
  ): Promise<any> {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    const fetchConfig: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Cookie: `jwt=${token}` } : {}),
        ...headers,
      },
    };

    if (data) {
      fetchConfig.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseURL}${url}`, fetchConfig);

    if (!response.ok) {
      if (response.status === 401) {
        throw new ApiServerError("Unauthenticated", 401);
      }

      if (response.status === 403) {
        throw new ApiServerError("Unauthorized", 403);
      }

      const errorData = await response.json();
      throw new ApiServerError(
        errorData.message || `${method} ${url} failed with status ${response.status}`,
        response.status
      );
    }

    return response.json();
  }

  get(url: string, headers: Record<string, string> = {}): Promise<any> {
    return this.request(url, "GET", undefined, headers);
  }

  post(url: string, data: any, headers: Record<string, string> = {}): Promise<any> {
    return this.request(url, "POST", data, headers);
  }

  patch(url: string, data: any, headers: Record<string, string> = {}): Promise<any> {
    return this.request(url, "PATCH", data, headers);
  }
 put(url: string, data: any, headers: Record<string, string> = {}): Promise<any> {
    return this.request(url, "PUT", data, headers);
  }

  delete(url: string, headers: Record<string, string> = {}): Promise<any> {
    return this.request(url, "DELETE", undefined, headers);
  }
}

export function handleApiError(error: unknown): never {
  if (error instanceof ApiServerError) {
    if (error.status === 401) {
      redirect("/login");
    }
    if (error.status === 403) {
      redirect("/");
    }
  }

  throw error;
}

export const serverFetch = new ApiServer();