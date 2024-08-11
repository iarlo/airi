import useWindow from '@hooks/useWindow';
import { MaximizeIcon, MinusIcon, XIcon } from 'lucide-react';

import { cn } from '../../utils/cn';

function Titlebar() {
  const size = 16;
  const [w] = useWindow();
  const windowButtons = [
    {
      action: () => w?.minimize(),
      classname: 'hover:bg-accent-foreground/10',
      icon: <MinusIcon size={size} />,
    },
    {
      action: () => w?.toggleMaximize(),
      classname: 'hover:bg-accent-foreground/10',
      icon: <MaximizeIcon size={size} />,
    },
    {
      action: () => w?.close(),
      classname: 'hover:bg-accent',
      icon: <XIcon size={size} />,
    },
  ];
  return (
    <>
      <nav
        className={cn(w && 'flex items-center justify-between select-none w-full col-start-2')}
        data-tauri-drag-region
      >
        {w && (
          <>
            <h1 className="text-transparent">Airi</h1>
            <section className="flex items-center" id="titlebar-buttons">
              {windowButtons.map(({ action, classname, icon }, i) => (
                <div className={cn(classname, 'h-full px-4 py-2')} key={`tb-${i}`} onClick={() => action()}>
                  {icon}
                </div>
              ))}
            </section>
          </>
        )}
      </nav>
    </>
  );
}

export default Titlebar;
