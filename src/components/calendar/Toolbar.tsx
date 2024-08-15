import i18n from '@config/i18n/main';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { ToolbarProps } from 'react-big-calendar';

import { Button } from '../Button';

function CalendarToolbar({ label, onNavigate, onView, view }: Readonly<ToolbarProps>) {
  return (
    <div className="flex items-center justify-between align-middle [&_button:not(:first-child>button:last-child):not(:hover):not(.active)]:bg-card mb-2">
      <div className="[&>:first-child]:rounded-r-none [&>:first-child]:border-r-0 [&>:nth-child(2)]:rounded-l-none">
        <Button className="align-middle" onClick={() => onNavigate('PREV')} size="icon" variant="outline">
          <ChevronLeft absoluteStrokeWidth size={16} strokeWidth={2} />
        </Button>
        <Button className="align-middle" onClick={() => onNavigate('NEXT')} size="icon" variant="outline">
          <ChevronRight absoluteStrokeWidth size={16} strokeWidth={2} />
        </Button>
        <Button asChild className="align-middle ms-2">
          <Link to="/">
            <Plus absoluteStrokeWidth size={16} strokeWidth={2} />
            <span className="ms-2">{i18n.t('actions.add')}</span>
          </Link>
        </Button>
      </div>
      <span className="capitalize font-bold">{label}</span>
      <div className="[&>:not(:first-child)]:rounded-l-none [&>:not(:last-child)]:rounded-r-none [&>:not(:last-child)]:border-r-0">
        <Button
          className={view === 'month' ? 'active border-l' : undefined}
          onClick={() => onView('month')}
          variant={view === 'month' ? 'default' : 'outline'}
        >
          {i18n.t('pages.appointments.other.month')}
        </Button>
        <Button
          className={view === 'week' ? 'active border-l' : undefined}
          onClick={() => onView('week')}
          variant={view === 'week' ? 'default' : 'outline'}
        >
          {i18n.t('pages.appointments.other.week')}
        </Button>
        <Button
          className={view === 'day' ? 'active border-l border-r' : undefined}
          onClick={() => onView('day')}
          variant={view === 'day' ? 'default' : 'outline'}
        >
          {i18n.t('pages.appointments.other.day')}
        </Button>
      </div>
    </div>
  );
}

export default CalendarToolbar;
