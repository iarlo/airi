import { QueryResult } from '@tauri-apps/plugin-sql';

import db, { Tables } from '../main';

const deleteFromTable = async (table: keyof Tables, id: number): Promise<QueryResult> =>
  await db.execute(`DELETE FROM ${table} WHERE id = $1`, [id]);

export { deleteFromTable };
