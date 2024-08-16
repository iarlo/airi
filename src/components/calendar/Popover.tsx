import { cn } from '@utils/cn';
import { CalendarProps } from 'react-big-calendar';
import { CalendarContainer } from 'react-datepicker';

function CustomCalendarPopover({ children, className }: CalendarProps) {
  return (
    <div className="rounded-lg relative">
      <CalendarContainer className={cn(className, 'rounded-lg')}>
        <div className="relative rounded-lg">{children}</div>
      </CalendarContainer>
    </div>
  );
}

export default CustomCalendarPopover;
