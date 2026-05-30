export type RsvpEntry = {
  id: string;
  name: string;
  email: string;
  guests: string;
  attending: 'yes' | 'no' | 'maybe';
  dietary: string;
  submittedAt: string;
};

export type RsvpFormPayload = {
  name: string;
  email: string;
  guests: string;
  attending: 'yes' | 'no' | 'maybe';
  dietary: string;
};
