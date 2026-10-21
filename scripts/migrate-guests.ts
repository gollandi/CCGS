import postgres from 'postgres';
import { readFileSync } from 'node:fs';
const schema = readFileSync(new URL('../migrations/001-guests.sql', import.meta.url), 'utf8');
const productionBuild = process.argv.includes('--if-production');
if (productionBuild && process.env.VERCEL_ENV !== 'production') {
  console.log('No production migration in this environment.');
} else if (!productionBuild && !process.argv.includes('--apply')) {
  console.log('Dry run: creates ccgs_guests, ccgs_sessions and ccgs_limits if absent. No existing rows are changed.');
  console.log(schema);
} else {
  if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL through your secure environment first.');
  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  try { await sql.begin(async tx => { await tx.unsafe(schema); }); console.log('Guest schema applied.'); }
  finally { await sql.end(); }
}
