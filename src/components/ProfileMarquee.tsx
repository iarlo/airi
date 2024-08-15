import { cn } from '../../utils/cn';
import Avatar from './Avatars';
import Marquee from './Marquee';

const ReviewCard = ({ img: Img, name }: { img: JSX.Element; name: string }) => {
  return (
    <figure
      className={cn('border bg-card rounded-lg p-2 w-full', 'inline-flex flex-col items-center justify-center min-w-0')}
    >
      {Img}
      <figcaption className="text-xs font-medium max-w-full truncate mt-2">{name}</figcaption>
    </figure>
  );
};

export function ProfileMarqueeVertical({ data }: { data: { name: string }[] }) {
  const firstRow = data && data.slice(0, data.length / 2);
  const secondRow = data && data.slice(data.length / 2);
  return (
    data && (
      <div className="relative flex h-[400px] flex-row items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Marquee className="[--duration:120s] flex-1" pauseOnHover vertical>
          {firstRow?.map(({ name }, i) => (
            <ReviewCard img={<Avatar name={name} size="small" />} key={`${name}-${i}`} name={name} />
          ))}
        </Marquee>
        <Marquee className="[--duration:120s] flex-1" pauseOnHover reverse vertical>
          {secondRow?.map(({ name }, i) => (
            <ReviewCard img={<Avatar name={name} size="small" />} key={`${name}-${i}`} name={name} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
      </div>
    )
  );
}
