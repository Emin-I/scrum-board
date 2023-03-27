import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
}

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  async login(credentials: LoginCredentials): Promise<void> {
    const response = await axios.post<AuthResponse>(API_URL + 'signin', credentials);
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    await axios.post(API_URL + 'signup', credentials);
  }

  getCurrentUser(): AuthResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  useAuth() {
	return [ () => getCurrentUser() != null, this.logout ]
  }
}

export default new AuthService();
