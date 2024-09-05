'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from "@/components/ui/badge";
import {
  IconBriefcase,
  IconClipboardList,
  IconFileText,
  IconInfoCircle,
  IconUsers,
  IconRocket,
  IconCalendar,
  IconBook,
  IconBuildingCommunity,
  IconChartBar,
  IconAward
} from '@tabler/icons-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  white: '#FFFFFF',
  yellow: '#FFD700'
};

const BoschOnboardingDashboard = () => {
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         clearInterval(timer);
  //         return 100;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    if (showWelcomeModal == false && progress == 0) {
      startWalkthrough();
    }
  });

  useEffect(() => {
    if (progress === null) {
      startWalkthrough();
    }
  }, [progress]);

  const startWalkthrough = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#welcome-banner',
          popover: {
            title: 'Welcome to Bosch',
            description:
              "Your journey with us begins here. Let's explore your personalized dashboard."
          }
        },
        {
          element: '#progress-tracker',
          popover: {
            title: 'Your Onboarding Progress',
            description:
              'Track your journey through the onboarding process here.'
          }
        },
        {
          element: '#quick-actions',
          popover: {
            title: 'Quick Actions',
            description:
              'Access frequently used tools and complete important tasks from here.'
          }
        },
        {
          element: '#upcoming-events',
          popover: {
            title: 'Upcoming Events',
            description:
              'Stay informed about orientation sessions, team meetings, and training workshops.'
          }
        },
        {
          element: '#learning-path',
          popover: {
            title: 'Your Learning Path',
            description:
              'Explore curated courses and resources to help you excel in your role.'
          }
        },
        {
          element: '#company-insights',
          popover: {
            title: 'Company Insights',
            description:
              "Dive deep into Bosch's history, values, and latest news."
          }
        },
        {
          element: '#team-introduction',
          popover: {
            title: 'Meet Your Team',
            description:
              "Get to know the colleagues 'll be working closely with."
          }
        }
      ]
    });
    driverObj.drive();
  };

  const teamMembers = [
    {
      name: 'Elif Funda Çaliskan',
      role: 'Yöneticin',
      avatar: '/avatars/elif.jpg'
    },
    {
      name: 'Ahmet Bakkal',
      role: '"Pate"n (Sana rehberlik edecek kişi)',
      avatar: '/avatars/ahmet.jpg'
    }
  ];

  const WelcomeModal = () => (
    <AnimatePresence>
      {showWelcomeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="max-w-md rounded-lg bg-white p-8 shadow-xl"
          >
            <h2 className="mb-4 text-2xl font-bold text-blue-950">
              Welcome to Bosch!
            </h2>
            <p className="mb-6">
              We are excited to have you on board. Your journey with us begins
              now. Are you ready to explore your personalized dashboard?
            </p>
            <Button
              onClick={() => setShowWelcomeModal(false)}
              className="w-full bg-red-600 text-white transition-colors hover:bg-red-800"
            >
              Lets Get Started!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="from-bosch-gray to-bosch-white dark:from-bosch-darkGray dark:to-bosch-darkViolet h-screen overflow-auto bg-gradient-to-br p-8">
      <WelcomeModal />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <header
          id="welcome-banner"
          className="mb-8 rounded-lg bg-gradient-to-r from-[#1DA3CC] via-[#1F6EAD] to-[#2F9F5A] p-6 text-slate-100 shadow-lg"
        >
          <h1 className="mb-2 text-4xl font-bold">
            Welcome to Bosch, John Doe!
          </h1>
          <p className="text-xl">
            Empowering Your Journey: Innovate, Inspire, Impact
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card id="progress-tracker" className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-950">
                <IconRocket className="mr-2" />
                Your Onboarding Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-2 h-4 w-full" />
              <p className="text-sm text-gray-800">
                {progress.toFixed(0)}% Complete
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2 font-semibold">Completed Tasks</h3>
                  <ul className="list-inside list-disc text-sm">
                    <li>Welcome orientation</li>
                    <li>IT setup</li>
                    <li>Company policies review</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Upcoming Tasks</h3>
                  <ul className="list-inside list-disc text-sm">
                    <li>Department introduction</li>
                    <li>First project briefing</li>
                    <li>Benefits enrollment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="quick-actions">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <IconClipboardList className="mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full bg-blue-500 text-white transition-colors hover:bg-blue-600">
                  Complete Profile
                </Button>
                <Button className="w-full bg-green-500 text-white transition-colors hover:bg-green-800">
                  Schedule IT Setup
                </Button>
                <Button className="w-full bg-purple-500 text-white transition-colors hover:bg-violet-600">
                  Review Policies
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* <Card id="upcoming-events">
            <CardHeader>
              <CardTitle className="flex items-center text-purple">
                <IconCalendar className="mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Badge className="mr-2 bg-purple-300 text-gray-800">Today</Badge>
                  <span>Team Welcome Lunch (12:00 PM)</span>
                </li>
                <li className="flex items-center">
                  <Badge className="mr-2 bg-green-300 text-gray-800">Tomorrow</Badge>
                  <span>IT Systems Training (10:00 AM)</span>
                </li>
                <li className="flex items-center">
                  <Badge className="mr-2 bg-blue-500 text-white">Next Week</Badge>
                  <span>Department Overview (Monday, 9:00 AM)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card id="learning-path" className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-blue">
                <IconBook className="mr-2" />
                Your Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="required" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="required">Required</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="optional">Optional</TabsTrigger>
                </TabsList>
                <TabsContent value="required">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Company Values and Ethics</span>
                      <Badge className="bg-red-500 text-white">High Priority</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Safety Procedures</span>
                      <Badge className="bg-orange-400 text-white">Medium Priority</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Data Protection Basics</span>
                      <Badge className="bg-yellow-400 text-gray-800">Low Priority</Badge>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="recommended">
                  <ul className="space-y-2">
                    <li>Introduction to Bosch Technologies</li>
                    <li>Effective Communication in Teams</li>
                    <li>Innovation at Bosch</li>
                  </ul>
                </TabsContent>
                <TabsContent value="optional">
                  <ul className="space-y-2">
                    <li>German Language Basics</li>
                    <li>Advanced Excel Skills</li>
                    <li>Project Management Fundamentals</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card> */}

          <Card id="company-insights">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <IconBuildingCommunity className="mr-2" />
                Company Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="values">Values</TabsTrigger>
                  <TabsTrigger value="news">News</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                  <p className="text-sm">
                    Founded in 1886, Bosch has been at the forefront of
                    innovation for over 130 years...
                  </p>
                </TabsContent>
                <TabsContent value="values">
                  <ul className="list-inside list-disc text-sm">
                    <li>Future and Result Focus</li>
                    <li>Responsibility and Sustainability</li>
                    <li>Initiative and Determination</li>
                    <li>Openness and Trust</li>
                    <li>Fairness</li>
                    <li>Reliability, Credibility, and Legality</li>
                    <li>Cultural Diversity</li>
                  </ul>
                </TabsContent>
                <TabsContent value="news">
                  <ul className="space-y-2 text-sm">
                    <li>Bosch launches new AI-powered IoT device</li>
                    <li>
                      Sustainability efforts reduce carbon footprint by 15%
                    </li>
                    <li>New partnership announced with leading tech company</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card id="team-introduction" className="p-4 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <IconUsers className="mr-2" aria-hidden="true" />
                Meet Your Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-center space-y-4 pb-4 sm:flex-col md:flex-row md:space-x-8 md:space-y-0">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex w-full max-w-xs flex-col items-center rounded-lg bg-gradient-to-r from-[#1DA3CC] via-[#1F6EAD] to-[#2F9F5A] p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl md:max-w-sm"
                    aria-labelledby={`member-${index}-name`}
                    aria-describedby={`member-${index}-role`}
                  >
                    <Avatar className="mb-2 h-20 w-20">
                      <AvatarImage
                        src={member.avatar}
                        alt={`${member.name}'s avatar`}
                      />
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      id={`member-${index}-name`}
                      className="text-lg font-semibold text-white"
                    >
                      {member.name}
                    </span>
                    <span
                      id={`member-${index}-role`}
                      className="text-center text-sm text-gray-200"
                    >
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* <Card id="performance-metrics">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <IconChartBar className="mr-2" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={[
                    { name: 'Week 1', value: 20 },
                    { name: 'Week 2', value: 40 },
                    { name: 'Week 3', value: 60 },
                    { name: 'Week 4', value: 80 },
                  ]}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line type="monotone" dataKey="value" stroke={boschColors.mediumBlue} yAxisId={0} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Key Achievements:</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Completed onboarding tasks 2 days ahead of schedule</li>
                  <li>Contributed to team project within first week</li>
                  <li>Received positive feedback from team lead</li>
                </ul>
              </div>
            </CardContent>
          </Card> */}

          <Card id="bosch-innovation" className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-red flex items-center">
                <IconAward className="mr-2" />
                Bosch Innovation Spotlight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-500 bg-opacity-10 p-4">
                  <h3 className="mb-2 font-semibold text-blue-800">
                    AI-Powered Solutions
                  </h3>
                  <p className="text-sm">
                    Discover how Bosch is leveraging artificial intelligence to
                    revolutionize industries.
                  </p>
                </div>
                <div className="rounded-lg bg-green-500 bg-opacity-10 p-4">
                  <h3 className="mb-2 font-semibold text-green-800">
                    Sustainable Technologies
                  </h3>
                  <p className="text-sm">
                    Learn about our commitment to developing eco-friendly and
                    sustainable technologies.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-500 bg-opacity-10 p-4">
                  <h3 className="text-purple mb-2 font-semibold">
                    Internet of Things (IoT)
                  </h3>
                  <p className="text-sm">
                    Explore Bosch s cutting-edge IoT solutions transforming
                    homes and industries.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="mb-20 mt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 Robert Bosch GmbH. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue mr-4 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-blue mr-4 hover:underline">
              Terms of Use
            </a>
            <a href="#" className="text-blue hover:underline">
              Contact HR
            </a>
          </div>
        </footer>

        <Button
          onClick={startWalkthrough}
          className="fixed bottom-4 right-4 bg-red-500 text-white transition-colors hover:bg-red-800"
        >
          Restart Tour
        </Button>
      </motion.div>
    </div>
  );
};

export default BoschOnboardingDashboard;
