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

const API_URL = 'http://localhost:8080/';

class AuthService {
  async login(email: string, password: string): Promise<void> {
  
	const configHeaders = {
		"content-type": "application/json",
		"Accept": "application/json"//,
		//"Authorization:": "bearer " + localStorage.getItem('token');
	};
	
    const response = await axios.post<AuthResponse>(API_URL + 'token', {'username': email, 'password': password}, {headers: configHeaders});

	if (response.status == 200 && response.data) {
      localStorage.setItem('user', email);
	  localStorage.setItem('token', response.data);
    }
  }

  logout(): void { 
    localStorage.removeItem('user');
	localStorage.removeItem('token');
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    await axios.post(API_URL + 'signup', credentials);
  }

  getCurrentUser(): AuthResponse | null {
    const user = localStorage.getItem('user');
    return user;// ? JSON.parse(user) : null;
  }
  
  useAuth() {
	return [ () => getCurrentUser() != null, this.logout ]
  }
}

export default new AuthService();