import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentApplications = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    position: 'Software Engineer'
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    position: 'Product Manager'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    position: 'Data Analyst'
  },
  {
    name: 'William Kim',
    email: 'william.kim@email.com',
    position: 'UX Designer'
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    position: 'Marketing Specialist'
  }
];

export function RecentApplications() {
  return (
    <div className="space-y-8">
      {recentApplications.map((application, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {application.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {application.name}
            </p>
            <p className="text-sm text-muted-foreground">{application.email}</p>
          </div>
          <div className="ml-auto font-medium">{application.position}</div>
        </div>
      ))}
    </div>
  );
}
