import { Calendar, Newspaper, Settings, Stethoscope, User } from 'lucide-react';

import i18next from './i18n/main';

export const navbarLinks = [
  {
    icon: Newspaper,
    name: i18next.t('pages.home.title'),
    path: '/',
  },
  {
    icon: Calendar,
    name: i18next.t('pages.appointments.title'),
    path: '/appointment',
  },
  {
    icon: User,
    name: i18next.t('pages.users.title'),
    path: '/user',
  },
  {
    icon: Stethoscope,
    name: i18next.t('pages.agents.title'),
    path: '/agent',
  },
  {
    icon: Settings,
    name: i18next.t('pages.settings.title'),
    path: '/settings',
  },
];

// export const settingsNavbarLinks = [
//   {
//     name: i18next.t('pages.settings.title'),
//     path: '/settings',
//   },
//   {
//     name: i18next.t('pages.appointments.title'),
//     path: '/appointment',
//   },
//   {
//     name: i18next.t('pages.users.title'),
//     path: '/user',
//   },
//   {
//     name: i18next.t('pages.agents.title'),
//     path: '/agent',
//   },
// ];
