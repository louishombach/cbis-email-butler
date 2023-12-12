'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Email } from '@/app/api/email/interfaces';

const TopicPage = ({ params }: { params: { topicName: string } }) => {
  const [topicData, setTopicData] = useState<{
    topic: string;
    emails: Email[];
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/email/topic/${params.topicName}`
        );
        setTopicData(response.data);
      } catch (error) {
        console.error('Error fetching topic data:', error);
      }
    };

    fetchData();
  }, [params.topicName]);

  if (!topicData) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='container mx-auto'>
        <Link href='/'>
          <p
            className='cursor-pointer text-blue-500 underline'
            onClick={handleBack}
          >
            Back
          </p>
        </Link>
        <h1 className='my-4 text-3xl font-bold'>{topicData.topic}</h1>
        <div className='grid gap-4'>
          {topicData.emails.map((email, index) => (
            <Link key={index} href={`/email/${email.id}`}>
              <div className='flex cursor-pointer flex-col rounded-md border bg-white p-4 shadow-md'>
                <h2 className='mb-2 text-lg font-semibold'>{email.from}</h2>
                <DisplayEmailBody email={email} />
                <p className='text-right text-gray-500'>{email.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

function DisplayEmailBody({ email }: { email: Email }) {
  if (!email.body) return null;

  return (
    <p className='flex-grow text-gray-700'>
      {email.body?.substring(0, 200)}
      {email.body?.length > 200 && '...'}
    </p>
  );
}

export default TopicPage;
