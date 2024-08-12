import Database from '@tauri-apps/plugin-sql';

export interface User {
  address: null | string;
  agent_id: null | number;
  birthdate: Date | null;
  cns: null | string;
  created_at?: Date;
  gender: 'F' | 'M';
  id: number;
  name: null | string;
  phone: null | string;
  updated_at?: Date;
}

export interface Appointment {
  agent_id: null | number;
  created_at?: Date;
  date: Date | null;
  id: number;
  updated_at?: Date;
  user_id: number;
}

export interface Agent {
  created_at?: Date;
  gender: 'F' | 'M';
  id: number;
  name: null | string;
  phone: null | string;
  updated_at?: Date;
}

export interface Tables {
  agents: Agent;
  appointments: Appointment;
  users: User;
}

const db = await Database.load('sqlite:airi.db');

export default db;
