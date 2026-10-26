import path from 'node:path';
import { KbApiClient } from './kb-client';
import { TicketRepository } from './ticket-repository';
import { buildCliApp } from './cli-app';

const DB_PATH = path.resolve(process.cwd(), 'tickets.json');
const KB_API_URL = process.env.KB_API_URL || 'https://jsonplaceholder.typicode.com';

const kbClient = new KbApiClient(KB_API_URL);
const repo = new TicketRepository(DB_PATH);

const program = buildCliApp(kbClient, repo);
program.parse(process.argv);