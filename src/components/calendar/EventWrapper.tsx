import Avatar from '@components/Avatars';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/HoverCard';
import { cn } from '@utils/cn.ts';
import { EventWrapperProps } from 'react-big-calendar';

function CalendarEventWrapper({ className, event, style }: Readonly<EventWrapperProps>) {
  // const navigate = useNavigate();
  const name = event.title?.toString().toLowerCase();
  const phone = event?.resource?.user?.phone;
  const dateString = `${event?.start?.getHours()}:${event?.start?.getMinutes() || '00'}`;

  const phoneStyle = cn('text-xs', !phone && '!text-border-3');
  const realWidth = (width: number) => {
    if (width === 100) return 100;
    return width / 1.8;
  };

  return (
    <HoverCard>
      <HoverCardTrigger
        className={cn(
          className,
          'max-w-[14.2857%] cursor-pointer top-2 max-w-[calc(100%)] w-[calc(100%-1rem)] px-2 pr-1 overflow-x-clip text-ellipsis whitespace-nowrap overflow-clip rounded-lg bg-primary-foreground text-primary'
        )}
        // onClick={() => navigate(`/appointment/${event.resource?.id}`)}
        style={{
          height: `${style?.height}%`,
          left: `${style?.xOffset}%`,
          top: style?.top && `${style?.top}%`,
          width: `${realWidth(Number(style?.width ?? 0))}%`,
        }}
      >
        <span className="capitalize text-xs max-w-full">{name}</span>
      </HoverCardTrigger>
      <HoverCardContent className="!z-[1000] w-64">
        <section className="flex gap-2 items-center relative">
          <span className="shrink-0">
            <Avatar name={name} size="small" />
          </span>
          <section className="relative inline-flex flex-col flex-wrap w-[calc(100%-3rem)]">
            <span className="!capitalize w-full text-ellipsis whitespace-nowrap overflow-hidden">{name}</span>
            <span className={phoneStyle}>{phone ?? 'Sem número de telefone'}</span>
          </section>
        </section>
        <section className="mt-2">
          <span className="text-sm">
            Consulta agendada para as <span className="text-primary-red-1 font-bold">{dateString}</span>
          </span>
        </section>
      </HoverCardContent>
    </HoverCard>
  );
}

export default CalendarEventWrapper;
