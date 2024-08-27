import { Button } from '@components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/Card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@components/Form';
import { BirthDateField, PhoneField } from '@components/form/MaskedInputs';
import { Input, MaskedInput } from '@components/Input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/Select';
import i18n from '@config/i18n/main';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@src/database/main';
import { selectFromTable, selectManyAgent } from '@src/database/queries/select';
import { updateUser } from '@src/database/queries/update';
import { useMutation, useQueries } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { asyncWrapper } from '@utils/asyncWrapper';
import { updateUserSchema } from '@utils/schema';
import { toastError, toastSuccess } from '@utils/toastMessage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const EditUserForm = () => {
  const { id } = useParams({ strict: false });
  const [docType, setDocType] = useState<null | string>('cns');

  const [{ data: agents }, { data: user }] = useQueries({
    queries: [
      {
        queryFn: async () => {
          const [data] = await asyncWrapper(selectManyAgent);
          return data;
        },
        queryKey: ['agents'],
      },
      {
        queryFn: async () => {
          const [data] = await asyncWrapper(selectFromTable, 'users', Number(id));
          return data && data[0];
        },
        queryKey: ['user', id],
      },
    ],
  });

  const postUser = useMutation({
    mutationFn: async (data: User) => {
      const [, error] = await asyncWrapper(updateUser, data);
      if (error) return toastError();
      return toastSuccess(i18n.t('generic.created', { field: i18n.t('table.columns.user') }));
    },
  });

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: '',
      address: '',
    },
    values: {
      gender: user?.gender,
      name: user?.name,
      cns: user?.cns ?? undefined,
      phone: user?.phone ?? undefined,
      address: user?.address ?? undefined,
      agent_id: user?.agent_id?.toString(),
      birthdate: user?.birthdate ? new Date(user?.birthdate) : undefined,
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const onSubmit = (values: z.infer<typeof updateUserSchema>) => {
    const dirty = form.formState.dirtyFields;
    const data = Object.fromEntries(Object.keys(dirty).map((key) => [key, values[key as never]]));
    postUser.mutate({
      id: Number(id),
      ...values,
      ...data,
      // birthdate: format(new Date(data.birthdate), 'yyyy-MM-dd HH:mm:ss'),
    } as never as User);
  };

  return (
    form.getValues('name') && (
      <div>
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              {i18n.t('pages.form.edit', { field: i18n.t('table.columns.user').toLowerCase() })}
            </CardTitle>
            <CardDescription>
              {i18n.t('pages.form.description.user', { action: i18n.t('actions.edit').toLowerCase() })}
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
                      <PhoneField name="phone" control={form.control} />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>{i18n.t('form.gender.label')}</FormLabel>
                            <FormControl>
                              <Select defaultValue={field.value} value={field.value} onValueChange={field.onChange}>
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
                                  return field.onChange(value);
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
                              <Select defaultValue={field.value} value={field.value} onValueChange={field.onChange}>
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
                    <BirthDateField control={form.control} name="birthdate" />
                  </div>
                  <Button className="w-full mt-4" type="submit">
                    {i18n.t('actions.save')}
                  </Button>
                  <Button asChild className="w-full" type="reset" variant="outline">
                    <Link to="/user">{i18n.t('actions.cancel')}</Link>
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default EditUserForm;
