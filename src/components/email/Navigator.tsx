'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { RefreshButton } from '@/components/buttons/RefreshButton';

import {
  FilteredEmailsBySender,
  FilteredEmailsByTopic,
} from '@/app/api/email/interfaces';

export default function Navigator() {
  const [emailTopics, setEmailTopics] = useState<FilteredEmailsByTopic>([]);
  const [emailSenders, setEmailSenders] = useState<FilteredEmailsBySender>([]);

  const handleRefresh = async () => {
    try {
      // Fetch data from the offline endpoint
       const response = await axios.get(
         'http://localhost:3000/api/email/offline'
       );

      //const response = await axios.get('http://localhost:3000/api/email');

      // Assuming the response.data contains the filtered email data
      const { byTopic, bySender } = response.data;

      // Update state with the new data
      setEmailTopics(byTopic);
      setEmailSenders(bySender);
    } catch (error) {
      console.error('Error refreshing email content:', error);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    handleRefresh();
  }, []);

  return (
    <section>
      <div className='layout relative flex min-h-screen flex-col items-center justify-start py-6 text-center'>
        {/* Display email topics in cards */}
        <div className='mb-4 flex w-full items-end justify-center p-4'>
          <h2 className='mt-6 text-2xl font-bold'>Email Topics</h2>
          <RefreshButton handleRefresh={handleRefresh} />
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {emailTopics.map((topic) => (
            <Link
              href={`/email/topic/${encodeURIComponent(topic.topic)}`}
              key={topic.topic}
            >
              <div className='rounded border bg-white p-4 shadow-md'>
                <h3 className='mb-2 text-lg font-bold'>{topic.topic}</h3>
                {/* Display additional details or links if needed */}
                {/* You can also map through topic.emails for more details */}
              </div>
            </Link>
          ))}
        </div>

        {/* Display email senders in a classic list */}
        <h2 className='mt-6 text-2xl font-bold'>Email Senders</h2>
        <ul className='list-disc text-left'>
          {emailSenders.map((sender) => (
            <Link
              href={`/email/sender/${encodeURIComponent(sender.sender)}`}
              key={sender.sender}
            >
              <li className='mb-4 flex items-center'>
                <div className='mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white'>
                  {sender.emails.length}
                </div>
                <span className='cursor-pointer text-lg font-semibold'>
                  {sender.sender}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
}
