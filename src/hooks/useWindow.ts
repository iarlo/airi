import { isTauri } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';

function useWindow() {
  const isApp = isTauri();
  if (isApp) return [getCurrentWindow()] as const;
  return [null] as const;
}

export default useWindow;
