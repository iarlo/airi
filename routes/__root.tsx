import { navbarLinks } from '@config/routes';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { cn } from '@utils/cn';

const rootComponent = () => {
  return (
    <>
      <aside>
        <header>Airi</header>
        <nav
          className={cn(
            // Mobile
            'flex flex-row gap-2 w-full items-center max-w-full px-6 py-8 max-md:[&_span]:hidden',
            // Desktop
            'md:flex-col md:gap-2 md:h-full md:items-center md:px-6 md:py-8'
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
      <main>
        <Outlet />
      </main>
    </>
  );
};

export const Route = createRootRoute({
  component: rootComponent,
});
