import { check } from '@tauri-apps/plugin-updater';

function useUpdates() {
  const checkForUpdate = async () => {
    const update = await check();
    return update;
  };

  return [checkForUpdate] as const;
}

export default useUpdates;
