import axiosInstance from "./axiosInstance";

interface AuthResponse {
  message: string;
  data?: any;
  token?: string;
  isValid?:boolean;
  verified?:boolean;
}

interface UpdateUserDetails {
  email?: string;
  password?: string;
  recoveryEmail?: string;
}

const authService = {
  // Signup with email and password
  signupWithEmailAndPassword: async (email: string, password: string,role:string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/signup/emailandpassword', { email, password , role});
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Verify email
  verifyEmail: async (userId: string, token: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.get<AuthResponse>(`/auth/verify?user=${userId}&token=${token}`);
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Login
  login: async (email: string, password: string,role:string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/login', { email, password , role});
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Update user details
  updateUserDetails: async (token: string, details: UpdateUserDetails): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.put<AuthResponse>(
        '/auth/update',
        details,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Delete account
  deleteAccount: async (token: string, email:string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.delete<AuthResponse>(`/auth/delete?email=${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Disable account
  disableAccount: async (token: string, email:string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.put<AuthResponse>(
        '/auth/disable',
        {email},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Forgot password
  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Reset password
  resetPassword: async (resetToken: string, newPassword: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `/auth/reset-password?resetToken=${resetToken}`,
        { newPassword }
      );
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Admin signup
  adminSignup: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/signup/admin', { email, password });
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // Check if token is valid
  isValid: async (token: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.get<AuthResponse>('/auth/is-valid', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  },
  // check if account is verified
  accountVerificationStatus: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.get<AuthResponse>(`/auth/account-verification-status?email=${email}`)
      return response.data
    }
    catch(error: any){
      throw error.response
    }
  },
  sendVerifyMail: async (email:string) : Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(`/auth/resend-verification-email`,{
        email
      })
      return response.data
    }
    catch(error: any){
      throw error.response
    }
  }
};

export default authService;
