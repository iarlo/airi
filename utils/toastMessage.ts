import i18n from '@config/i18n/main';
import { toast } from '@hooks/useToast';

const toastError = (message?: string) =>
  toast({
    variant: 'destructive',
    title: i18n.t('generic.error'),
    description: `${message ?? i18n.t('generic.error_message')}`,
  });

const toastSuccess = (description?: string) =>
  toast({
    variant: 'default',
    title: i18n.t('generic.success'),
    description,
  });

export { toastError, toastSuccess };
