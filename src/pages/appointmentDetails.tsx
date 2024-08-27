import { Button } from '@components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Card';
import { Label } from '@components/Label';
import i18n from '@config/i18n/main';
import { selectAppointmentById } from '@src/database/queries/select';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { asyncWrapper } from '@utils/asyncWrapper';
import { formatDocument } from '@utils/format';
import { format } from 'date-fns';

const AppointmentDetails = () => {
  const { id } = useParams({ strict: false });

  const { data: appointment } = useQuery({
    queryFn: async () => {
      const [data] = await asyncWrapper(selectAppointmentById, Number(id));
      console.log(data, Number(id));
      return data && data[0];
    },
    queryKey: ['user', id],
  });

  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl capitalize">{i18n.t('pages.appointments.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full gap-4 justify-start flex-wrap">
            <div className="grid max-w-sm grow items-center gap-1.5">
              <Label className="font-semibold">{i18n.t('pages.form.user.label')}</Label>
              <span className="capitalize">{appointment?.user_name?.toLowerCase()}</span>
            </div>
            <div className="grid max-w-sm grow items-center gap-1.5">
              <Label className="font-semibold">{i18n.t('form.document.label')}</Label>
              <span>{formatDocument(appointment?.user_cns ?? '')}</span>
            </div>
            <div className="grid max-w-sm grow items-center gap-1.5">
              <Label className="font-semibold">{i18n.t('pages.form.date.label')}</Label>
              <span>{format(new Date(appointment?.date ?? 0), 'dd/MM/yyyy HH:mm')}</span>
            </div>
            <div className="grid max-w-sm grow items-center gap-1.5">
              <Label className="font-semibold">{i18n.t('form.agent.label')}</Label>
              <span>{appointment?.agent_name}</span>
            </div>
          </div>
          <Button className="w-full mt-4" type="submit" variant={'destructive'}>
            {i18n.t('actions.delete')}
          </Button>
          <Button asChild className="w-full mt-4" type="reset" variant="outline">
            <Link to="/appointment">{i18n.t('actions.cancel')}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentDetails;
