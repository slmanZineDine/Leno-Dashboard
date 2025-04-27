export type TCompany = {
  id: number;
  name: string;
  email: null | string;
  phone: string;
  website: null | string;
  logo: null | string;
  description: null | string;
  location: {
    region: { id: number; name: string };
    city: { id: number; name: string };
  } | null;
  status: TCompanyStatus;
};

export type TCompanyStatus = "active" | "pending" | "suspended" | "banned";
