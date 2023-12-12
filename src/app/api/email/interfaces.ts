export interface IGetCategorisedEmails {
  byTopic: FilteredEmailsByTopic;
  bySender: FilteredEmailsBySender;
}

export interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  body?: string;
}

export type FilteredEmailsByTopic = Array<{
  topic: string;
  emails: Email[];
}>;

export type FilteredEmailsBySender = Array<{
  sender: string;
  emails: Email[];
}>;

export interface FilterKeyWords {
  // Der Name des Topics
  topic: string;

  // Die Wörter, die in der Email vorkommen müssen, damit sie diesem Topic zugeordnet wird
  positiveFilters: string[];

  // Die Wörter, die nicht in der Email vorkommen dürfen
  negativeFilters: string[];
}

export interface ISenderAllEmails {
  sender: string;
  emails: Email[];
}

export interface ITopicAllEmails {
  sender: string;
  emails: Email[];
}
