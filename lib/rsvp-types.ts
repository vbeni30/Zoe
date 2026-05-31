export type RsvpEntry = {
  id: string;
  name: string;
  email: string;
  guests: string;
  attending: 'yes' | 'no' | 'maybe';
  submittedAt: string;
};

export type RsvpFormPayload = {
  name: string;
  email: string;
  guests: string;
  attending: 'yes' | 'no' | 'maybe';
};
