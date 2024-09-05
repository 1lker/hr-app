'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  IconEye,
  IconDownload,
  IconUpload,
  IconTrash,
  IconHelpCircle
} from '@tabler/icons-react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { AnimatePresence } from 'framer-motion';
import {
  FileAudio,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Presentation,
  File
} from 'lucide-react';

interface Document {
  D_id: number;
  DocumentName: string;
  Type: string;
  Status: string;
  UploadDate: string;
}

const getIconForDocumentType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
    case 'doc':
    case 'docx':
      return <FileText className="h-6 w-6" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FileImage className="h-6 w-6" />;
    case 'ppt':
    case 'pptx':
      return <Presentation className="h-6 w-6" />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <FileSpreadsheet className="h-6 w-6" />;
    case 'mp3':
    case 'wav':
      return <FileAudio className="h-6 w-6" />;
    case 'mp4':
    case 'avi':
    case 'mov':
      return <FileVideo className="h-6 w-6" />;
    case 'js':
    case 'ts':
    case 'py':
    case 'java':
    case 'html':
    case 'css':
      return <FileCode className="h-6 w-6" />;
    default:
      return <File className="h-6 w-6" />;
  }
};

const getDocumentGuide = (documentName: string) => {
  switch (documentName.toLowerCase()) {
    case 'öğrenci belgesi':
      return {
        title: 'Öğrenci Belgesi Nasıl Alınır?',
        steps: [
          'E-Devlet sistemine giriş yapın.',
          'https://www.turkiye.gov.tr/yok-ogrenci-belgesi-sorgulama adresine gidin.',
          'Üniversitenizi ve bölümünüzü seçin.',
          'Belgenizi oluşturun ve indirin.'
        ],
        link: 'https://www.turkiye.gov.tr/yok-ogrenci-belgesi-sorgulama'
      };
    case 'cv':
      return {
        title: 'CV Nasıl Hazırlanır?',
        steps: [
          'Kişisel bilgilerinizi ekleyin.',
          'Eğitim geçmişinizi yazın.',
          'İş deneyimlerinizi belirtin.',
          'Becerilerinizi ve yetkinliklerinizi listeleyin.',
          'Referanslarınızı ekleyin (opsiyonel).'
        ],
        link: 'https://www.youthemployment.org.uk/cv-templates/'
      };
    default:
      return {
        title: `${documentName} Nasıl Elde Edilir?`,
        steps: [
          'İlgili kuruma başvurun.',
          'Gerekli bilgileri ve belgeleri sağlayın.',
          'Belgenin hazırlanmasını bekleyin.',
          'Hazır olduğunda belgenizi alın veya indirin.'
        ],
        link: ''
      };
  }
};

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

const statusColors = {
  uploaded: boschColors.green,
  submitted: boschColors.lightBlue,
  rejected: boschColors.red,
  pending: boschColors.yellow,
  approved: boschColors.purple,
  blank: boschColors.gray
};

export const DocumentCard: React.FC<{ document: Document }> = ({
  document
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const startTour = () => {
    const guide = getDocumentGuide(document.DocumentName);
    const guideContent = `
      <ol style="list-style-type: decimal; padding-left: 20px;">
        ${guide.steps
          .map((step) => `<li style="margin-bottom: 8px;">${step}</li>`)
          .join('')}
      </ol>
      ${
        guide.link
          ? `<a href="${guide.link}" target="_blank" rel="noopener noreferrer" style="color: ${boschColors.red}; text-decoration: underline; display: block; margin-top: 16px;">Resmi Sayfaya Git</a>`
          : ''
      }
    `;

    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: `#view-${document.D_id}`,
          popover: {
            title: 'View Document',
            description: 'Click here to view the document details.'
          }
        },
        {
          element: `#download-${document.D_id}`,
          popover: {
            title: 'Download',
            description: 'Download the document to your device.'
          }
        },
        {
          element: `#upload-${document.D_id}`,
          popover: {
            title: 'Upload',
            description: 'Upload a new version of this document.'
          }
        },
        {
          element: `#delete-${document.D_id}`,
          popover: {
            title: 'Delete',
            description: 'Remove this document from the system.'
          }
        },
        {
          element: `#how-to-use-${document.D_id}`,
          popover: {
            title: guide.title,
            description: guideContent
          }
        }
      ]
    });
    driverObj.drive();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="h-full w-full border-2 border-transparent bg-white shadow-lg transition-all duration-300 hover:border-[#1DA3CC] hover:shadow-xl dark:bg-gray-800">
        <CardHeader
          className={`bg-gradient-to-r from-[${boschColors.darkBlue}] to-[${boschColors.mediumBlue}] p-4 text-slate-900`}
        >
          <CardTitle className="flex items-center justify-between">
            <span
              className="truncate text-lg font-semibold"
              title={document.DocumentName}
            >
              {document.DocumentName}
            </span>
            <Badge
              variant={document.Status === 'Blank' ? 'secondary' : 'default'}
              className="ml-2 rounded-full px-2 py-1 text-xs font-semibold"
              style={{
                backgroundColor:
                  document.Status === 'Blank'
                    ? statusColors.blank
                    : statusColors.uploaded,
                color:
                  document.Status === 'Blank'
                    ? boschColors.darkGray
                    : boschColors.white
              }}
            >
              {document.Status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            {getIconForDocumentType(document.Type)}
            <span className="font-medium">{document.Type.toUpperCase()}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Uploaded: {document.UploadDate}
          </p>
          <Progress value={75} className="mt-4" />
          <p className="mt-1 text-right text-xs text-gray-500">75% Complete</p>
        </CardContent>
        <CardFooter className="rounded-b-xl bg-gray-50 p-4 dark:bg-gray-700">
          <div className="flex w-full justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        id={`view-${document.D_id}`}
                        className="flex-1"
                        aria-label="View document"
                      >
                        <IconEye className="h-5 w-5" stroke={1.5} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{document.DocumentName}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <p>Document details would be displayed here.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View document details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    id={`download-${document.D_id}`}
                    className="flex-1"
                    aria-label="Download document"
                  >
                    <IconDownload className="h-5 w-5" stroke={1.5} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download this document</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    id={`upload-${document.D_id}`}
                    className="flex-1"
                    aria-label="Upload new version"
                  >
                    <IconUpload className="h-5 w-5" stroke={1.5} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a new version</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    id={`delete-${document.D_id}`}
                    className="flex-1"
                    aria-label="Delete document"
                  >
                    <IconTrash className="h-5 w-5" stroke={1.5} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete this document</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-2 top-2"
            >
              <Button
                onClick={startTour}
                variant="secondary"
                size="sm"
                className="bg-white text-black shadow-md hover:bg-gray-100"
                id={`how-to-use-${document.D_id}`}
              >
                <IconHelpCircle className="mr-2" size={16} />
                How to get this document?
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
