export interface User {
  id: number;
  userType: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  authdata?: string;
}
