import LogoComponent from '@components/Logo';
import Titlebar from '@components/Titlebar';
import { Toaster } from '@components/Toaster';
import { navbarLinks } from '@config/routes';
import useWindow from '@hooks/useWindow';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { cn } from '@utils/cn';

const rootComponent = () => {
  const [w] = useWindow();
  return (
    <>
      <Titlebar />
      <header className={cn('row-start-2', !w && 'mt-4')}>
        <LogoComponent size="2rem" center />
      </header>
      <aside className="flex flex-wrap justify-center relative">
        <nav
          className={cn(
            'flex flex-row gap-2 w-full items-center max-w-full px-6 py-8 max-md:[&_span]:hidden',
            'md:flex-col md:gap-2 md:h-full md:items-center md:px-6'
          )}
        >
          {navbarLinks.map(({ icon: Icon, name, path }) => (
            <Link
              key={path}
              to={path}
              className="flex flex-nowrap gap-2 items-center last-of-type:mt-auto p-2 px-4 rounded-lg w-full max-md:justify-center"
            >
              <Icon size={16} />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-4">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};

export const Route = createRootRoute({
  component: rootComponent,
});
