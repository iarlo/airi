import { cn } from '@utils/cn';
import { HeartHandshake } from 'lucide-react';

interface LogoProps {
  center?: boolean;
  minimal?: boolean;
  size: string;
}

function LogoComponent({ center, minimal, size }: Readonly<LogoProps>) {
  return (
    <section
      className={cn(
        'flex font-sans italic font-medium items-center align-middle px-4',
        center ? 'justify-center' : 'justify-start'
      )}
    >
      {!minimal && <HeartHandshake size={size} />}
      <span style={{ fontSize: size }}>Airi</span>
    </section>
  );
}

export default LogoComponent;
