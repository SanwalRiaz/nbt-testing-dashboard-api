export type CompanyPayload = {
  name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
};

export type Company = CompanyProps & {
  id: number;
};

export type ProjectPayload = {
  name: string;
  project_description: string;
  start_date: string;
  end_date: string;
  company_id: number;
};

export type Project = ProjectPayload & {
  id: number;
};

export type UserPayload = {
  username: string;
  name: string;
  sex: string;
  address: string;
  mail: string;
  birthdate: string;
  title: string;
  company_id: number;
};

export type User = UserPayload & {
  id: number;
};
