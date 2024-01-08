import { NextResponse } from 'next/server';

import { filterEmailsBySender, filterEmailsByTopic } from './filter';
import { FilterKeyWords, IGetCategorisedEmails } from './interfaces';
import { searchAllEmails } from './search';
import { connectToImap } from './util';
import { saveResultToFile } from './util';

export async function GET() {
  const keywords: FilterKeyWords[] = [
    {
      topic: 'Newsletter',
      positiveFilters: ['newsletter', 'update', 'freeCodeCamp', 'musikbunker'],
      negativeFilters: ['billing', 'rechnung', 'payment'],
    },
    {
      topic: 'Billing',
      positiveFilters: ['rechnung', 'payment'],
      negativeFilters: [],
    },
    {
      topic: 'Banking',
      positiveFilters: ['banking', 'bank', 'dkb', 'Volksbank', 'Sparkasse'],
      negativeFilters: ['tier.app', 'heygen', 'interactive brokers', '1&1'],
    },

    //social should be filtered by sender
    // {
    //   topic: 'Social',
    //   positiveFilters: ['twitter', 'facebook', 'instagram', 'linkedin', 'youtube'],
    //   negativeFilters: [],
    // }
  ];

  return getFilteredEmails(keywords)
    .then((filteredEmails) => {
      return NextResponse.json(filteredEmails);
    })
    .catch((error) => {
      console.error('Error:', error.message);
      return NextResponse.error();
    });
}

// Function to retrieve emails based on specific keywords
async function getFilteredEmails(
  keywords: FilterKeyWords[]
): Promise<IGetCategorisedEmails> {
  try {
    const connection = await connectToImap();
    const results = await searchAllEmails(connection);
    const filteredByTopic = filterEmailsByTopic(results, keywords);
    const filteredBySender = filterEmailsBySender(results);

    const result = {
      byTopic: filteredByTopic,
      bySender: filteredBySender,
    };

    // Save the result locally in a JSON file
    saveResultToFile(result);

    return result;
  } catch (error) {
    console.error('Error retrieving or processing emails:', error);
    throw new Error('Failed to retrieve and filter emails');
  }
}
