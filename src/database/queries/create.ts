import db, { User } from '../main';

const createUser = async (bind: User) =>
  await db.execute(
    'INSERT into users (name, phone, address, agent_id, birthdate, cns, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [bind.name, bind.phone, bind.address, bind.agent_id, bind.birthdate, bind.cns, bind.gender]
  );

export { createUser };
