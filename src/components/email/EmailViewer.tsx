import React from 'react';

export interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  body: string;
}

const EmailViewer = ({ email }: { email: Email }) => {
  return (
    <div>
      <h2>{email.subject}</h2>
      <p>From: {email.from}</p>
      <p>Date: {email.date}</p>
      <div className='body'>
        <pre className='body-text'>{email.body}</pre>
        {/* You can add more formatting or styling as needed */}
      </div>
      <style jsx>{`
        div {
          max-width: 90%;
          margin: auto;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin-top: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

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
          background-color: rgb(228, 228, 228);

          margin-top: 2rem;
          width: 100% !important;
          max-width: 100% !important;
        }
        .body-text {
          text-wrap: pretty;
          font-weight: 600;
          font-size: 1rem;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default EmailViewer;
