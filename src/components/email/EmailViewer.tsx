import PostalMime from 'postal-mime';
import React, { useEffect, useRef, useState } from 'react';

import { Email } from '@/app/api/email/interfaces';

const EmailViewer = ({ email }: { email: Email }) => {
  const emailContainerRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    async function parseAndRenderEmail() {
      const emailContainer = emailContainerRef.current;

      if (emailContainer && email.body) {
        const parser = new PostalMime();

        // Filter body content based on Content-Type

        const filteredBody = extractHtmlContent(email.body);

        if (filteredBody) {
          const parsedEmail = await parser.parse(filteredBody);
          setHtmlContent(
            parsedEmail.html ? parsedEmail.html : parsedEmail.text
          );
        } else {
          console.log(
            'No matching Content-Type found. Conmtent probably raw text'
          );
          const parsedEmail = await parser.parse(email.body);
          setHtmlContent(
            parsedEmail.html ? parsedEmail.html : parsedEmail.text
          );
        }
      }
    }

    parseAndRenderEmail();
  }, [email]);

  // Function to filter body content based on Content-Type
  function extractHtmlContent(emailBody: string): string | null {
    const regex = /Content-Type: text\/html;([\s\S]*?)<\/html>/i;

    const match = emailBody.match(regex);

    if (match) {
      const htmlContentEntry = match.find((entry) =>
        entry.startsWith('Content-Type: text/html')
      );
      return htmlContentEntry ? htmlContentEntry.trim() : null;
    } else {
      return null;
    }
  }

  return (
    <div>
      <h2>{email.subject}</h2>
      <p>From: {email.from}</p>
      <p>To: {email.to}</p>
      <p>Date: {email.date}</p>
      <div className='body'>
        <span
          ref={emailContainerRef}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      <style jsx>{`
        h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        p {
          color: #666;
          margin-bottom: 0.5rem;
        }

        .body {
          align-self: center;
          margin: 0;
          background-color: rgb(173, 173, 173);
          padding: 1rem;
          margin-top: 2rem;
          width: 100% !important;
          max-width: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default EmailViewer;
