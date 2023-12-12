'use client';

import axios from 'axios'; // Import Axios
import React, { useEffect } from 'react';

import EmailViewer, { Email } from '@/components/email/EmailViewer';

const EmailPage = () => {
  const [emailContent, setEmailContent] = React.useState<Email | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/email');
        console.log('json');
        console.log(response.data);

        // Assuming the response.data contains the email content
        setEmailContent(response.data);
      } catch (error) {
        console.error('Error fetching email content:', error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const emailId = urlParams.get('emailId');
  //   if (emailId) {
  //     fetch(`http://localhost:3000/api/email/${emailId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setEmailContent(data.content);
  //       });
  //   }
  // }, []);

  return (
    <div>
      <h2>Email Content</h2>
      {emailContent && <EmailViewer email={emailContent} />}
    </div>
  );
};

export default EmailPage;
