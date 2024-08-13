import db, { Agent, Appointment, User } from '../main';

const createUser = async (bind: Omit<User, 'id'>) =>
  await db.execute(
    'INSERT into users (name, phone, address, agent_id, birthdate, cns, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [bind.name, bind.phone, bind.address, bind.agent_id, bind.birthdate, bind.cns, bind.gender]
  );

const createAgent = async (bind: Omit<Agent, 'id'>) =>
  await db.execute('INSERT into agents (name, birthdate, gender, phone) VALUES ($1, $2, $3, $4)', [
    bind.name,
    bind.birthdate,
    bind.gender,
    bind.phone,
  ]);

const createAppointment = async (bind: Omit<Appointment, 'id'>) =>
  await db.execute('INSERT into appointments (user_id, agent_id, date) VALUES ($1, $2, $3)', [
    bind.user_id,
    bind.agent_id,
    bind.date,
  ]);

export { createUser, createAppointment, createAgent };
