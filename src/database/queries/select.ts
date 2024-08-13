import db, { Agent, Tables, User } from '../main';

const selectFromTable = async (table: keyof Tables, id: number) =>
  await db.select(`SELECT * FROM ${table} WHERE id = $1`, [id]);

const selectFromTableBy = async <T extends keyof Tables, U extends Tables[T], V extends keyof U>(
  table: T,
  key: V,
  value: U[V]
): Promise<U[]> => await db.select(`SELECT id FROM ${table} WHERE ${key.toString()} = $1`, [value]);

const selectManyUser = async (limit: number, offset: number): Promise<(User & { agent_name: string | null })[]> =>
  await db.select(
    'SELECT users.*, agents.name AS agent_name FROM users LEFT JOIN agents ON agents.id = users.agent_id LIMIT $1 OFFSET $2',
    [limit, offset]
  );

const selectAppointmentsByDate = async (firstDate: Date, lastDate: Date) =>
  await db.select(
    'SELECT *, users.name as user_name FROM appointments WHERE date BETWEEN $1 AND $2 LEFT JOIN users ON users.id = appointments.user_id',
    [firstDate, lastDate]
  );

const selectManyAgent = async (): Promise<Agent[]> => await db.select(`SELECT * FROM agents`);

export { selectManyUser, selectManyAgent, selectAppointmentsByDate, selectFromTable, selectFromTableBy };
