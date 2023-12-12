'use client';

// Import necessary modules and components
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import EmailViewer from '@/components/email/EmailViewer';

import { Email } from '@/app/api/email/interfaces';

// Functional component for the /email/[emailId] page
const EmailPage = ({ params }: { params: { emailId: string } }) => {
  const router = useRouter();
  const [email, setEmail] = useState<Email | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/email/${params.emailId}`);
        setEmail(response.data);
      } catch (error) {
        console.error('Error fetching email data:', error);
      }
    };

    fetchData();
  }, [params.emailId]);

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='container mx-auto'>
        <button
          className='text-blue-500 underline'
          onClick={() => router.back()}
        >
          Back
        </button>
        <div className='my-4'>
          <EmailViewer email={email} />
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
