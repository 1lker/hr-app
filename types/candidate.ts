export type Candidate = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  dateOfBirth?: string; // ISO 8601 format: YYYY-MM-DD
  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
  };
  job: {
    title: string;
    department: string;
    startDate: string; // ISO 8601 format: YYYY-MM-DD
    endDate?: string; // ISO 8601 format: YYYY-MM-DD, for former employees
  };
  employmentStatus:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Internship'
    | 'Former';
  salary?: {
    amount: number;
    currency: string;
  };
  profilePicture?: string | null;
  createdAt: string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
  updatedAt: string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
};
