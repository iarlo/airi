import { Button } from '@components/Button';
import CustomCalendarPopover from '@components/calendar/Popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/Card';
import { Combobox } from '@components/Combobox';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, Form } from '@components/Form';
import { Input } from '@components/Input';
import i18n from '@config/i18n/main';
import { zodResolver } from '@hookform/resolvers/zod';
import { Appointment } from '@src/database/main';
import { createAppointment } from '@src/database/queries/create';
import { selectUserBySearch } from '@src/database/queries/select';
import '@styles/datepicker.css';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { asyncWrapper } from '@utils/asyncWrapper';
import { newAppointmentSchema } from '@utils/schema';
import { toastError, toastSuccess } from '@utils/toastMessage';
import { addDays } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import { enUS } from 'date-fns/locale/en-US';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const userSearchQuery = (value: string) =>
  queryOptions({
    queryFn: async () => {
      const [data] = await asyncWrapper(selectUserBySearch, value);
      return data;
    },
    queryKey: ['appointment', 'many', value],
  });

function NewAppointmentForm() {
  const [input, setInput] = useState<string>('');

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const tomorrow = addDays(new Date().setHours(8, 0, 0), 1).toISOString();

  const form = useForm<z.infer<typeof newAppointmentSchema>>({
    defaultValues: {
      date: isWeekday(new Date(tomorrow)) ? tomorrow : addDays(tomorrow, 2).toISOString(),
      user_id: '',
    },
    resolver: zodResolver(newAppointmentSchema),
  });

  const { refetch } = useQuery(userSearchQuery(input));

  const postAppointment = useMutation({
    mutationFn: async (data: Omit<Appointment, 'id'>) => {
      const [, error] = await asyncWrapper(createAppointment, data);
      if (error) return toastError();
      return toastSuccess(i18n.t('generic.created', { field: i18n.t('pages.appointments.title').toLocaleLowerCase() }));
    },
  });

  const onSubmit = (values: z.infer<typeof newAppointmentSchema>) => {
    const filter = (value: unknown) => ((value ?? '') === '' ? null : value);
    const data = Object.fromEntries(Object.entries(values).filter(([, value]) => filter(value)));
    postAppointment.mutate(data as never as Omit<Appointment, 'id'>);
  };

  const handleUserSearchChanged = async (value: string) => {
    await setInput(value);
    const query = await refetch();
    console.log(query.data);
    if (!query.data) return [];
    return (
      query.data?.map((user) => ({
        label: `${user.name}`,
        value: user.id.toString(),
      })) ?? []
    );
  };

  return (
    <div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{i18n.t('pages.form.schedule')}</CardTitle>
          <CardDescription>
            {i18n.t('pages.form.description.appoiintment', { action: i18n.t('actions.schedule').toLowerCase() })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form autoComplete="off" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="user_id"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>{i18n.t('table.columns.user')}</FormLabel>
                        <FormControl>
                          <Combobox
                            className="w-full"
                            onSearchChange={handleUserSearchChanged}
                            onSelect={field.onChange}
                          />
                        </FormControl>
                        <FormDescription className="text-red-500">
                          {fieldState.error && fieldState.error.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{i18n.t('pages.form.date.label')}</FormLabel>
                        <FormControl>
                          <DatePicker
                            calendarContainer={CustomCalendarPopover}
                            className="w-full"
                            customInput={<Input />}
                            dateFormat="Pp"
                            filterDate={isWeekday}
                            fixedHeight
                            locale={i18n.language === 'pt-BR' ? ptBR : enUS}
                            maxTime={new Date(0, 0, 0, 14, 0)}
                            minDate={new Date()}
                            minTime={new Date(0, 0, 0, 8, 0)}
                            onChange={(date) =>
                              field.onChange(fromZonedTime(new Date(date ?? ''), 'America/Sao_Paulo').toISOString())
                            }
                            popperClassName="first:rounded-lg"
                            popperPlacement="top"
                            selected={new Date(field.value)}
                            showTimeSelect
                            timeCaption="Hora"
                            timeFormat="p"
                            timeIntervals={30}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full" type="submit">
                  {i18n.t('actions.schedule')}
                </Button>
                <Button asChild className="w-full" type="reset" variant="outline">
                  <Link to="/appointment">{i18n.t('actions.cancel')}</Link>
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            {i18n.t('pages.form.user_does_not_exist')}{' '}
            <Link className="underline" to="/user/new">
              {i18n.t('pages.form.add', { field: i18n.t('table.columns.user').toLowerCase() })}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewAppointmentForm;
