import i18n from '@config/i18n/main';
import { toast } from '@hooks/useToast';

const toastError = (message?: string) =>
  toast({
    variant: 'destructive',
    title: i18n.t('general.status.error'),
    description: `${message ?? i18n.t('general.errors.generic')}`,
  });

const toastSuccess = (description?: string) =>
  toast({
    variant: 'default',
    title: i18n.t('general.status.success'),
    description,
  });

export { toastError, toastSuccess };
