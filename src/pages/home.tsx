import BentoCardComponent from '@components/BentoCard';
import CalendarComponent from '@components/calendar/Calendar';
import { ProfileMarqueeVertical } from '@components/ProfileMarquee';
import { selectRandomFromTable } from '@src/database/queries/select';
import { useQuery } from '@tanstack/react-query';
import { asyncWrapper } from '@utils/asyncWrapper';
import { Calendar, CloudSunIcon, UserCheckIcon } from 'lucide-react';

const HomePage = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const [query] = await asyncWrapper(selectRandomFromTable, 'users', ['name'], 40);
      return query;
    },
    queryKey: ['profile', 'marquee'],
  });

  const cardItems = [
    {
      background: <CalendarComponent />,
      className: 'col-span-3 lg:col-span-2 lg:row-span-2',
      desc: 'Você tem 24 agendamentos pendentes',
      icon: Calendar,
      title: 'Consultas marcadas',
    },
    {
      // background: <MeteorBackground />,
      className: 'col-span-3 lg:col-span-1',
      icon: CloudSunIcon,
      title: 'Bom dia',
    },
    {
      background: <ProfileMarqueeVertical data={data ?? []} />,
      className: 'col-span-3 lg:col-span-1 lg:row-span-2',
      desc: 'Você já cadastrou 8 pacientes',
      icon: UserCheckIcon,
      title: 'Pacientes',
    },
    {
      className: 'col-span-3 lg:col-span-2',
      desc: '2 consultas agendadas para hoje',
      icon: CloudSunIcon,
      title: 'Bom dias',
    },
    {
      // background: <ParticlesBackground />,
      className: 'col-span-3 lg:col-span-3',
      desc: '2 consultas agendadas para hoje',
      icon: CloudSunIcon,
      title: '',
    },
  ];
  return (
    <div className="grid w-full auto-rows-[11rem] grid-cols-3 gap-4">
      {cardItems.map(({ background, className, desc, icon, title }) => (
        <BentoCardComponent
          background={background}
          className={className}
          desc={desc}
          icon={icon}
          key={title}
          title={title}
        />
      ))}
    </div>
  );
};

export default HomePage;
