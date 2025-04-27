export type TComplaintStatus = "open" | "inProgress" | "resolved";

export type TComplaint = {
  id: number;
  description: string;
  customer: {
    name: string;
    image: string;
    phone: string;
  };
  location: {
    city: {
      id: number;
      name: string;
    };
    region: {
      id: number;
      name: string;
    };
  };
  created_at: string;
  status: TComplaintStatus;
};
