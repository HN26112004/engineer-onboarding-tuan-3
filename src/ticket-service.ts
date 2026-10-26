import { randomUUID } from 'node:crypto';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Ticket {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  createdAt: string;
}

export interface TicketInput {
  title: string;
  priority?: Priority;
}

export function validateAndCreateTicket(input: TicketInput): Ticket {
  const trimmed = input.title?.trim();
  if (!trimmed) {
    throw new Error('Title is required');
  }

  return {
    id: randomUUID(),
    title: trimmed,
    status: 'OPEN',
    priority: input.priority ?? 'MEDIUM',
    createdAt: new Date().toISOString(),
  };
}