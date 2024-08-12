import { Calendar, Newspaper, Settings, Stethoscope, User } from 'lucide-react';

import i18next from './i18n/main';

export const navbarLinks = [
  {
    icon: Newspaper,
    name: i18next.t('pages.home'),
    path: '/',
  },
  {
    icon: Calendar,
    name: i18next.t('pages.appointment'),
    path: '/appointment',
  },
  {
    icon: User,
    name: i18next.t('pages.user'),
    path: '/user',
  },
  {
    icon: Stethoscope,
    name: i18next.t('pages.agent'),
    path: '/agent',
  },
  {
    icon: Settings,
    name: i18next.t('pages.settings'),
    path: '/settings',
  },
];
