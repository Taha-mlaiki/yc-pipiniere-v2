const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
  headers?: { [key: string]: string };
  [key: string]: any;
}

interface ApiResponse {
  message?: string;
  [key: string]: any;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  async request(config: RequestConfig): Promise<ApiResponse> {
    const {
      url,
      method = 'GET',
      data = null,
      headers = {},
      ...rest
    } = config;

    const fetchConfig: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers,
      },
      credentials: 'include', // Send HTTP-only cookies
      ...rest,
    };

    if (data) {
      fetchConfig.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseURL}${url}`, fetchConfig);

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      throw new Error(errorData.message || `${method} ${url} failed`);
    }

    return response.json();
  }

  get(url: string, config: Partial<RequestConfig> = {}): Promise<any> {
    return this.request({ url, method: 'GET', ...config });
  }

  post(url: string, data: any = {}, config: Partial<RequestConfig> = {}): Promise<any> {
    return this.request({ url, method: 'POST', data, ...config });
  }

  patch(url: string, data: any, config: Partial<RequestConfig> = {}): Promise<any> {
    return this.request({ url, method: 'PATCH', data, ...config });
  }

  put(url: string, data: any, config: Partial<RequestConfig> = {}): Promise<any> {
    return this.request({ url, method: 'PUT', data, ...config });
  }

  delete(url: string, config: Partial<RequestConfig> = {}): Promise<any> {
    return this.request({ url, method: 'DELETE', ...config });
  }
}

export const clientFetch = new ApiClient()