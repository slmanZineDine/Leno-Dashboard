export type TAuth = {
  token: string | null;
  deviceToken: string | null;
  userId: number | null;
  username: string | null;
  image: string | null;
  email: string | null;
  role: string | null;
  isAdmin: boolean;
  isSupervisor: boolean;
};

export type TResetPassword = {
  phone: string;
  code: string;
  password: string;
  password_confirmation: string;
};
