import { Button } from '@components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/Card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@components/Form';
import { Input, MaskedInput } from '@components/Input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/Select';
import i18n from '@config/i18n/main';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@src/database/main';
import { createUser } from '@src/database/queries/create';
import { selectManyAgent } from '@src/database/queries/select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { asyncWrapper } from '@utils/asyncWrapper';
import { newUserSchema } from '@utils/schema';
import { toastError, toastSuccess } from '@utils/toastMessage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const NewUserForm = () => {
  const [docType, setDocType] = useState<null | string>(null);

  const { data: agents } = useQuery({
    queryFn: async () => {
      const [data] = await asyncWrapper(selectManyAgent);
      return data;
    },
    queryKey: ['agents'],
  });

  const postUser = useMutation({
    mutationFn: async (data: Omit<User, 'id'>) => {
      const [, error] = await asyncWrapper(createUser, data);
      if (error) return toastError();
      return toastSuccess(i18n.t('generic.created', { field: i18n.t('table.columns.user') }));
    },
  });

  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: '',
      phone: undefined,
      address: '',
      agent_id: undefined,
      birthdate: undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof newUserSchema>) => {
    const filter = (value: unknown) => ((value ?? '') === '' ? null : value);
    const data = Object.fromEntries(Object.entries(values).filter(([, value]) => filter(value)));
    postUser.mutate(data as never as Omit<User, 'id'>);
  };

  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">
            {i18n.t('pages.form.add', { field: i18n.t('table.columns.user').toLowerCase() })}
          </CardTitle>
          <CardDescription>
            {i18n.t('pages.form.description.user', { action: i18n.t('actions.create').toLowerCase() })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form autoComplete="off" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>{i18n.t('form.name.label')}</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="new-password"
                            id="name"
                            onChange={field.onChange}
                            type="text"
                            value={field.value}
                            placeholder={i18n.t('form.name.placeholder')}
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
                    name="address"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>{i18n.t('form.address.label')}</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="new-password"
                            id="address"
                            onChange={field.onChange}
                            type="text"
                            value={field.value}
                            placeholder={i18n.t('form.address.placeholder')}
                          />
                        </FormControl>
                        <FormDescription className="text-red-500">
                          {fieldState.error && fieldState.error.message}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{
                        onChange(e) {
                          console.log(e);
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('form.phone.label')}</FormLabel>
                          <FormControl>
                            <MaskedInput
                              autoComplete="new-password"
                              id="phone"
                              mask="(00) 0 0000-0000"
                              onAccept={field.onChange}
                              placeholder={i18n.t('form.phone.placeholder')}
                              type="tel"
                              unmask={true}
                              value={field.value}
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
                      name="gender"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('form.gender.label')}</FormLabel>
                          <FormControl>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <SelectTrigger id="gender">
                                <SelectValue placeholder={i18n.t('form.gender.placeholder')} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="M">{i18n.t('form.gender.options.M')}</SelectItem>
                                  <SelectItem value="F">{i18n.t('form.gender.options.F')}</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription className="text-red-500">
                            {fieldState.error && fieldState.error.message}
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="cns"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('form.document.label')}</FormLabel>
                          <FormControl>
                            <MaskedInput
                              autoComplete="off"
                              id="document"
                              mask={docType === 'cns' ? '000 0000 0000 0000' : '000.000.000-00*'}
                              onAccept={(value: string) => {
                                if (value.length >= 12) setDocType('cns');
                                else setDocType('cpf');
                                field.onChange(value);
                              }}
                              placeholder={i18n.t('form.document.placeholder')}
                              type="text"
                              unmask={true}
                              value={field.value}
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
                      name="agent_id"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('form.agent.label')}</FormLabel>
                          <FormControl>
                            <Select defaultValue={field.value?.toString()} onValueChange={field.onChange}>
                              <SelectTrigger id="gender">
                                <SelectValue placeholder={i18n.t('form.agent.placeholder')} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {agents?.map((data) => (
                                    <SelectItem key={data.id} value={data.id.toString()}>
                                      {data.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription className="text-red-500">
                            {fieldState.error && fieldState.error.message}
                          </FormDescription>
                        </FormItem>
                      )}
                      rules={{
                        onChange: (value: string) => Number(value),
                      }}
                    />
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">
                  {i18n.t('actions.register')}
                </Button>
                <Button asChild className="w-full" type="reset" variant="outline">
                  <Link to="/user">{i18n.t('actions.cancel')}</Link>
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            {i18n.t('pages.form.user_already_exists')}{' '}
            <Link className="underline" to="/">
              {i18n.t('pages.form.schedule')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewUserForm;
