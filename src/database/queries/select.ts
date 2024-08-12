import db, { User } from '../main';

const selectUser = async (id: number) => await db.select('SELECT * from users WHERE id = $1', [id]);
const selectManyUser = async (limit: number, offset: number): Promise<(User & { agent_name: string | null })[]> =>
  await db.select(
    `SELECT users.*,
            agents.name AS agent_name
    FROM users
    LEFT JOIN agents ON agents.id = users.agent_id
    LIMIT $1
    OFFSET $2`,
    [limit, offset]
  );

export { selectUser, selectManyUser };
