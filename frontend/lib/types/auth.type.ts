export interface AuthType {
    email?: string;
    accessToken?: string;
    roles?: number;
    password?: string;
  }
  
  export interface AuthContextType {
    auth: AuthType;
    setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
    clearAuth: () => void;
  }
  