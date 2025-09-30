export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface Message {
  role: MessageRole;
  content: string;
}

export enum Persona {
  INTELLECTUAL = 'intellectual',
  LABREGO = 'labrego',
  SARCASTIC = 'sarcastic',
  UNHINGED = 'unhinged',
}
