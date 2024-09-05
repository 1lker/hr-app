// lib/dummyData.ts
import { subDays, format } from 'date-fns';

export const generateDailyData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
    value: Math.floor(Math.random() * 100)
  })).reverse();
};

export const applicationStatuses = ['Pending Review', 'Approved', 'Rejected'];
export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance'
];
export const educationLevels = ['Bachelor', 'Master', 'PhD', 'Other'];
export const experienceLevels = ['Junior', 'Mid-level', 'Senior'];

export const generateRandomData = (categories: string[], total: number) => {
  let remaining = total;
  return categories.map((category, index) => {
    if (index === categories.length - 1) {
      return { name: category, value: remaining };
    }
    const value = Math.floor(
      Math.random() * (remaining - (categories.length - index - 1))
    );
    remaining -= value;
    return { name: category, value };
  });
};

// Örnek kullanım:
export const applicationStatusData = generateRandomData(
  applicationStatuses,
  100
);
export const departmentData = generateRandomData(departments, 500);
export const educationLevelData = generateRandomData(educationLevels, 200);
export const experienceLevelData = generateRandomData(experienceLevels, 150);

export const dailyApplications = generateDailyData(30);

export const topPositions = [
  { name: 'Software Engineer', applications: 50 },
  { name: 'Product Manager', applications: 35 },
  { name: 'Data Analyst', applications: 30 },
  { name: 'UX Designer', applications: 25 },
  { name: 'Sales Representative', applications: 20 }
];

export const employeePerformance = [
  { name: 'Alice Johnson', score: 95 },
  { name: 'Bob Smith', score: 92 },
  { name: 'Charlie Brown', score: 90 },
  { name: 'Diana Ross', score: 88 },
  { name: 'Edward Norton', score: 87 }
];

export const documentTypes = ['Resume', 'Contract', 'ID', 'Other'];
export const documentTypeData = generateRandomData(documentTypes, 300);

export const recentDocuments = [
  { name: 'John_Doe_Resume.pdf', type: 'Resume', date: '2023-08-29' },
  { name: 'Jane_Smith_Contract.docx', type: 'Contract', date: '2023-08-28' },
  { name: 'Mike_Johnson_ID.jpg', type: 'ID', date: '2023-08-27' },
  { name: 'Sarah_Williams_CoverLetter.pdf', type: 'Other', date: '2023-08-26' },
  { name: 'Chris_Brown_Certificate.pdf', type: 'Other', date: '2023-08-25' }
];
