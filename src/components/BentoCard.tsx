import i18n from '@config/i18n/main';
import { cn } from '@utils/cn';
import { ArrowRightIcon, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface LogoProps {
  background?: JSX.Element;
  className?: string;
  desc?: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  title: string;
}

function BentoCardComponent({ background, className, desc, icon: Icon, title }: Readonly<LogoProps>) {
  return (
    <div
      className={cn(
        'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
        'bg-card [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        'transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
        className
      )}
      key={title}
    >
      <div className="bg-gradient-to-t from-background h-full to-transparent w-full z-10 border rounded-xl" />
      <div className="absolute -translate-y-12 w-full">{background}</div>
      <div className="absolute bottom-0 pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <Icon className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="max-w-lg text-muted-foreground rounded-lg leading-7">{desc}</p>
      </div>

      <div
        className={cn(
          'z-50 pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
        )}
      >
        <span className=" bg-primary-foreground/40 text-primary pointer-events-auto gap-2 inline-flex items-center max-w-fit p-2 rounded-lg text-sm transition">
          {i18n.t('actions.see_more')}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
}

export default BentoCardComponent;
