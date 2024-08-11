import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <aside>
        <header>Airi</header>
        <nav>
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </>
  ),
});
