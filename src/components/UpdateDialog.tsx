import useUpdates from '@hooks/useUpdates';
import { useQuery } from '@tanstack/react-query';
import { relaunch } from '@tauri-apps/plugin-process';
import { useEffect, useState } from 'react';

import { asyncWrapper } from '../../utils/asyncWrapper';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './AlertDialog';

function UpdateDialog() {
  const [checkForUpdate] = useUpdates();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data } = useQuery({
    queryFn: checkForUpdate,
    queryKey: ['checkForUpdate'],
  });

  const handleCancel = () => setIsOpen(false);
  const handleConfirm = async () => {
    if (!data) return;
    await asyncWrapper(data.downloadAndInstall);
    await relaunch();
  };

  useEffect(() => {
    if (data && !isOpen) setIsOpen(true);
  }, [data]);
  return (
    data?.available && (
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Uma atualização está disponível</AlertDialogTitle>
            <AlertDialogDescription>
              Atualizar para a versão mais recente garante que você possa usar as novas funcionalidades, e que o
              aplicativo esteja funcionando corretamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Atualizar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
}

export default UpdateDialog;
