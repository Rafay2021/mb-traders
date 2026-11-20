import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import 'dotenv/config';
import 'server-only';
import type { Contract } from '@/prisma/contract';
import contractJson from '@/prisma/contract.json' with { type: 'json' };

const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: process.env['DATABASE_URL']!,
});
