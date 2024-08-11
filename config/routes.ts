import { Calendar, Newspaper, Settings, Stethoscope, User } from 'lucide-react';

export const navbarLinks = [
  {
    icon: Newspaper,
    name: 'Relatório',
    path: '/',
  },
  {
    icon: Calendar,
    name: 'Agendamentos',
    path: '/appointment',
  },
  {
    icon: User,
    name: 'Pacientes',
    path: '/user',
  },
  {
    icon: Stethoscope,
    name: 'Agentes',
    path: '/agent',
  },
  {
    icon: Settings,
    name: 'Configurações',
    path: '/settings',
  },
];
