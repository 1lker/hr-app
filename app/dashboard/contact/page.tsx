'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Mail,
  Search,
  Linkedin,
  Twitter,
  Github,
  Phone,
  MapPin
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import PageContainer from '@/components/layout/page-container';

const boschColors = {
  lightBlue: '#1DA3CC',
  green: '#2F9F5A',
  red: '#AE1C22',
  darkBlue: '#1F4087',
  purple: '#843376',
  mediumBlue: '#1F6EAD',
  lightGreen: '#94BC5C',
  violet: '#513C8C',
  darkViolet: '#312C6C',
  darkGreen: '#197E38',
  gray: '#F5F5F5',
  darkGray: '#333333',
  white: '#FFFFFF'
};

type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  role: string;
  department: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

const candidates: Candidate[] = [
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1 234 567 8903',
    profilePicture: '/john-doe.jpg',
    role: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, USA',
    socialLinks: { linkedin: '#', twitter: '#' }
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'bob.williams@example.com',
    phone: '+1 234 567 8904',
    profilePicture: '/john-doe.jpg',
    role: 'Data Analyst',
    department: 'Analytics',
    location: 'Berlin, Germany',
    socialLinks: { linkedin: '#', github: '#' }
  },
  {
    id: '5',
    name: 'Eva Davis',
    email: 'eva.davis@example.com',
    phone: '+1 234 567 8905',
    profilePicture: '/john-doe.jpg',
    role: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Paris, France',
    socialLinks: { twitter: '#' }
  }
];

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="overflow-hidden border-none bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="h-2 bg-gradient-to-r " />
      <CardContent className="px-6 pb-4 pt-6">
        <div className="mb-4 flex items-center">
          <Image
            src={candidate.profilePicture}
            alt={`${candidate.name}'s profile picture`}
            width={80}
            height={80}
            className="rounded-full border-2 border-lightBlue"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold text-darkBlue">
              {candidate.name}
            </h2>
            <p className="text-sm text-mediumBlue">{candidate.role}</p>
            <p className="text-sm text-darkGray">{candidate.department}</p>
          </div>
        </div>
        <div className="mb-4 space-y-2">
          <p className="flex items-center text-sm text-darkGray">
            <Mail className="mr-2 h-4 w-4" /> {candidate.email}
          </p>
          <p className="flex items-center text-sm text-darkGray">
            <Phone className="mr-2 h-4 w-4" /> {candidate.phone}
          </p>
          <p className="flex items-center text-sm text-darkGray">
            <MapPin className="mr-2 h-4 w-4" /> {candidate.location}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {candidate.socialLinks.linkedin && (
              <a
                href={candidate.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-mediumBlue transition-colors duration-300 hover:text-darkBlue" />
              </a>
            )}
            {candidate.socialLinks.twitter && (
              <a
                href={candidate.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5 text-mediumBlue transition-colors duration-300 hover:text-darkBlue" />
              </a>
            )}
            {candidate.socialLinks.github && (
              <a
                href={candidate.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5 text-mediumBlue transition-colors duration-300 hover:text-darkBlue" />
              </a>
            )}
          </div>
          <Button className="bg-darkBlue text-white transition-colors duration-300 hover:bg-mediumBlue">
            <Mail className="mr-2 h-4 w-4" /> Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const CandidateContactPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);

  useEffect(() => {
    const filtered = candidates.filter(
      (candidate) =>
        (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.department
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (departmentFilter === '' || candidate.department === departmentFilter)
    );
    setFilteredCandidates(filtered);
  }, [searchTerm, departmentFilter]);

  const departments = Array.from(new Set(candidates.map((c) => c.department)));

  return (
    <PageContainer>
      <div className="container mx-auto min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <motion.h1
          className="mb-2 text-center text-4xl font-extrabold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Candidate Directory
        </motion.h1>
        <motion.p
          className="mb-8 text-center text-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Connect with our talented professionals
        </motion.p>

        <motion.div
          className="mx-auto mb-12 flex max-w-4xl flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-mediumBlue" />
            <Input
              type="text"
              placeholder="Search candidates..."
              className="w-full border-lightBlue py-2 pl-10 pr-4 focus:border-darkBlue focus:ring-darkBlue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select onValueChange={setDepartmentFilter} value={departmentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            {filteredCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCandidates.length === 0 && (
          <motion.p
            className="mt-8 text-center text-darkGray"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No candidates found matching your search.
          </motion.p>
        )}
      </div>
    </PageContainer>
  );
};

export default CandidateContactPage;
