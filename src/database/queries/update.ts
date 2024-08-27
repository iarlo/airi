import db, { User } from '../main';

const updateUser = async (bind: User) =>
  await db.execute(
    'UPDATE users SET name = $2, birthdate = $3, gender = $4, cns = $5, address = $6, phone = $7, agent_id = $8 WHERE id = $1',
    [bind.id, bind.name, bind.birthdate, bind.gender, bind.cns, bind.address, bind.phone, bind.agent_id]
  );

export { updateUser };
