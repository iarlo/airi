import BentoCardComponent from '@components/BentoCard';
import CalendarComponent from '@components/calendar/Calendar';
import Meteors from '@components/Meteors';
import Particles from '@components/Particles';
import { ProfileMarqueeVertical } from '@components/ProfileMarquee';
import { homePageCount } from '@src/database/queries/count';
import { selectRandomFromTable } from '@src/database/queries/select';
import { useQueries } from '@tanstack/react-query';
import { asyncWrapper } from '@utils/asyncWrapper';
import { Calendar, CloudSunIcon, UserCheckIcon } from 'lucide-react';

const HomePage = () => {
  const [{ data: users }, { data: count }] = useQueries({
    queries: [
      {
        queryFn: async () => {
          const [query] = await asyncWrapper(selectRandomFromTable, 'users', ['name'], 40);
          return query;
        },
        queryKey: ['profile', 'marquee'],
      },
      {
        queryFn: async () => {
          const [query] = await asyncWrapper(homePageCount);
          console.log(query);
          return query && query[0];
        },
        queryKey: ['count'],
      },
    ],
  });

  const cardItems = [
    {
      background: <CalendarComponent />,
      className: 'col-span-3 lg:col-span-2 lg:row-span-2',
      desc: `Você tem ${count?.nextAppointments} agendamentos pendentes`,
      icon: Calendar,
      title: 'Consultas marcadas',
    },
    {
      background: (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <Meteors number={30} />
        </div>
      ),
      className: 'col-span-3 lg:col-span-1',
      icon: CloudSunIcon,
      title: 'Bom dia',
    },
    {
      background: <ProfileMarqueeVertical data={users ?? []} />,
      className: 'col-span-3 lg:col-span-1 lg:row-span-2',
      desc: `Você já cadastrou ${count?.usersCount} pacientes`,
      icon: UserCheckIcon,
      title: 'Pacientes',
    },
    {
      className: 'col-span-3 lg:col-span-2',
      desc: `Consultas agendadas para hoje`,
      icon: CloudSunIcon,
      title: 'Bom dias',
    },
    {
      background: (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <Particles className="absolute inset-0" color={'#E11D48'} ease={10} quantity={500} refresh />
        </div>
      ),
      className: 'col-span-3 lg:col-span-3',
      desc: `${count?.todayAppointments} consultas agendadas para hoje`,
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
