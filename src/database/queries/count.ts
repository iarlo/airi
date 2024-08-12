import db, { Tables } from '../main';

type CountTableResponse = [{ rowCount: number }];

const countTable = async (table: keyof Tables): Promise<CountTableResponse> =>
  await db.select(`SELECT COUNT(*) AS rowCount FROM ${table}`, []);

export { countTable };
