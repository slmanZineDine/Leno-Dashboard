type TParamsType = { [key: string]: string };

type TPagination = { pageCount: number; currentPage: number };

interface RTKError {
  status: number;
  data: {
    message: string;
    errors?: any;
    error?: string;
    isCompany?: boolean;
    isSupervisor?: boolean;
  };
}
