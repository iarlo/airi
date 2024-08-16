import db, { Tables } from '../main';

type CountTableResponse = [{ rowCount: number }];

interface HomePageCount {
  agentsCount: number;
  nextAppointments: number;
  previousAppointments: number;
  usersCount: number;
  todayAppointments: number;
}

const countTable = async (table: keyof Tables): Promise<CountTableResponse> =>
  await db.select(`SELECT COUNT(*) AS rowCount FROM ${table}`, []);

const homePageCount = async (): Promise<HomePageCount[]> =>
  await db.select(
    `SELECT (SELECT COUNT(*) FROM appointments WHERE DATE(date) = date('now','localtime','start of day')) as todayAppointments, (SELECT COUNT(*) FROM appointments WHERE date > date('now')) AS nextAppointments, (SELECT COUNT(*) FROM appointments WHERE date < date('now')) AS previousAppointments, (SELECT COUNT(*) FROM users) AS usersCount, (SELECT COUNT(*) FROM agents) AS agentsCount`,
    []
  );

export { countTable, homePageCount };
