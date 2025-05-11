import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { catsTable } from './db/schema.js';

const db = drizzle({ connection: { uri: process.env.DATABASE_URL } });

//for past data
/*
async function setData() {
  const cat1: typeof catsTable.$inferInsert = {
    name: 'Fluffy',
    age: 12.5
  };
  const cat2: typeof catsTable.$inferInsert = {
    name: 'Tom',
    age: 3
  };
  const cat3: typeof catsTable.$inferInsert = {
    name: 'Sindy',
    age: 0.8
  };
  await db.insert(catsTable).values(cat1);
  await db.insert(catsTable).values(cat2);
  await db.insert(catsTable).values(cat3);
}
setData();
*/

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/cats', async (c) => {
  const cats = await db.select().from(catsTable);
  let data = '<h1>Cats</h1>';
  for (let i = 0; i < cats.length; i++) {
    data += '<ol><a href="/cats/' + cats[i].id + '">' + cats[i].name + '</a></ol>';
  }
  return c.html(data);
})

app.get('/cats/:id', async (c) => {
  const cat = await db.select().from(catsTable).where(eq(catsTable.id, c.req.param('id')));
  return c.html('<p>Cat: ' + cat[0].name + ', ' + cat[0].age + '</p>');
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
