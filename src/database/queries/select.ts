import db, { Agent, Appointment, Tables, User } from '../main';

const selectRandomFromTable = async <T extends keyof Tables, U extends Tables[T]>(
  table: T,
  select: (keyof U)[] | '*',
  limit: number
): Promise<U[]> =>
  await db.select(
    `SELECT ${typeof select === 'string' ? select : select.join(',')} FROM ${table} ORDER BY RANDOM() LIMIT $1`,
    [limit]
  );

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

const selectAppointmentsByDate = async (
  firstDate: Date,
  lastDate: Date
): Promise<(Appointment & { user_name: string | null })[]> =>
  await db.select(
    'SELECT appointments.*, users.name as user_name FROM appointments LEFT JOIN users ON users.id = appointments.user_id WHERE date BETWEEN $1 AND $2',
    [firstDate, lastDate]
  );

const selectManyAgent = async (): Promise<Agent[]> => await db.select(`SELECT * FROM agents`);

const selectUserBySearch = async (input: string): Promise<(User & { agent_id: number })[]> =>
  await db.select(
    `SELECT users.* FROM users WHERE name LIKE '%' || $1 || '%' ORDER BY CASE WHEN name LIKE $1 || '%' THEN 1 WHEN name LIKE '%' || $1 THEN 3 ELSE 2 END LIMIT 5`,
    [input]
  );

export {
  selectRandomFromTable,
  selectManyUser,
  selectManyAgent,
  selectAppointmentsByDate,
  selectFromTable,
  selectFromTableBy,
  selectUserBySearch,
};
