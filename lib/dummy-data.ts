// lib/dummy-data.ts
import { Candidate } from '@/types/candidate';

export const dummyCandidates: Candidate[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    dateOfBirth: '1990-01-15',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      country: 'USA',
      zipcode: '12345'
    },
    job: {
      title: 'Software Engineer',
      department: 'Engineering',
      startDate: '2023-01-01'
    },
    employmentStatus: 'Full-time',
    salary: {
      amount: 85000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    gender: 'Female',
    dateOfBirth: '1992-05-20',
    address: {
      street: '456 Elm St',
      city: 'Other City',
      state: 'NY',
      country: 'USA',
      zipcode: '67890'
    },
    job: {
      title: 'Marketing Specialist',
      department: 'Marketing',
      startDate: '2023-02-15'
    },
    employmentStatus: 'Part-time',
    salary: {
      amount: 60000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-02-15T00:00:00.000Z',
    updatedAt: '2023-02-15T00:00:00.000Z'
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-123-4567',
    gender: 'Female',
    dateOfBirth: '1985-11-30',
    address: {
      street: '789 Oak St',
      city: 'Big City',
      state: 'TX',
      country: 'USA',
      zipcode: '23456'
    },
    job: {
      title: 'Product Manager',
      department: 'Product',
      startDate: '2023-03-01'
    },
    employmentStatus: 'Full-time',
    salary: {
      amount: 95000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-03-01T00:00:00.000Z',
    updatedAt: '2023-03-01T00:00:00.000Z'
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob.williams@example.com',
    phone: '222-333-4444',
    gender: 'Male',
    dateOfBirth: '1988-07-10',
    address: {
      street: '101 Maple St',
      city: 'Small Town',
      state: 'FL',
      country: 'USA',
      zipcode: '34567'
    },
    job: {
      title: 'Sales Executive',
      department: 'Sales',
      startDate: '2023-04-01'
    },
    employmentStatus: 'Full-time',
    salary: {
      amount: 75000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-04-01T00:00:00.000Z',
    updatedAt: '2023-04-01T00:00:00.000Z'
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    phone: '111-222-3333',
    gender: 'Male',
    dateOfBirth: '1993-03-25',
    address: {
      street: '102 Birch St',
      city: 'Anycity',
      state: 'IL',
      country: 'USA',
      zipcode: '45678'
    },
    job: {
      title: 'Graphic Designer',
      department: 'Design',
      startDate: '2023-05-15'
    },
    employmentStatus: 'Part-time',
    salary: {
      amount: 55000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-05-15T00:00:00.000Z',
    updatedAt: '2023-05-15T00:00:00.000Z'
  },
  {
    id: 6,
    firstName: 'Diana',
    lastName: 'Garcia',
    email: 'diana.garcia@example.com',
    phone: '444-555-6666',
    gender: 'Female',
    dateOfBirth: '1982-08-15',
    address: {
      street: '103 Cedar St',
      city: 'Middletown',
      state: 'NJ',
      country: 'USA',
      zipcode: '56789'
    },
    job: {
      title: 'Human Resources Manager',
      department: 'HR',
      startDate: '2023-06-01'
    },
    employmentStatus: 'Full-time',
    salary: {
      amount: 90000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-06-01T00:00:00.000Z',
    updatedAt: '2023-06-01T00:00:00.000Z'
  },
  {
    id: 7,
    firstName: 'Ethan',
    lastName: 'Miller',
    email: 'ethan.miller@example.com',
    phone: '777-888-9999',
    gender: 'Male',
    dateOfBirth: '1995-12-05',
    address: {
      street: '104 Pine St',
      city: 'River City',
      state: 'GA',
      country: 'USA',
      zipcode: '67890'
    },
    job: {
      title: 'Data Analyst',
      department: 'Analytics',
      startDate: '2023-07-01'
    },
    employmentStatus: 'Full-time',
    salary: {
      amount: 80000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-07-01T00:00:00.000Z',
    updatedAt: '2023-07-01T00:00:00.000Z'
  },
  {
    id: 8,
    firstName: 'Fiona',
    lastName: 'Martinez',
    email: 'fiona.martinez@example.com',
    phone: '666-777-8888',
    gender: 'Female',
    dateOfBirth: '1989-04-18',
    address: {
      street: '105 Fir St',
      city: 'Springfield',
      state: 'OH',
      country: 'USA',
      zipcode: '78901'
    },
    job: {
      title: 'Business Analyst',
      department: 'Business',
      startDate: '2023-08-01'
    },
    employmentStatus: 'Full-time',
    salary: {
      amount: 87000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-08-01T00:00:00.000Z',
    updatedAt: '2023-08-01T00:00:00.000Z'
  },
  {
    id: 9,
    firstName: 'George',
    lastName: 'Harris',
    email: 'george.harris@example.com',
    phone: '333-444-5555',
    gender: 'Male',
    dateOfBirth: '1987-09-12',
    address: {
      street: '106 Maple St',
      city: 'Lakeview',
      state: 'WI',
      country: 'USA',
      zipcode: '89012'
    },
    job: {
      title: 'Operations Manager',
      department: 'Operations',
      startDate: '2023-09-01'
    },
    employmentStatus: 'Full-time',
    salary: {
      amount: 93000,
      currency: 'USD'
    },
    profilePicture: null,
    createdAt: '2023-09-01T00:00:00.000Z',
    updatedAt: '2023-09-01T00:00:00.000Z'
  }
  // Add more dummy candidates as needed
];
