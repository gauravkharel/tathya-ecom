export type User = {
  id: Number;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
};

export interface AuthType {
  email?: string;
  accessToken?: string;
  roles?: number,
  password?: string;
}

export interface AuthContextType {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ErrorResponse {
    status: number;
    data: string;
}


