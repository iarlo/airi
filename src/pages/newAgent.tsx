import { Button } from '@components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/Card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@components/Form';
import { Input, MaskedInput } from '@components/Input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/Select';
import i18n from '@config/i18n/main';
import { zodResolver } from '@hookform/resolvers/zod';
import { Agent } from '@src/database/main';
import { createAgent } from '@src/database/queries/create';
import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { asyncWrapper } from '@utils/asyncWrapper';
import { newAgentSchema } from '@utils/schema';
import { toastError, toastSuccess } from '@utils/toastMessage';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const NewAgentForm = () => {
  const postAgent = useMutation({
    mutationFn: async (data: Omit<Agent, 'id'>) => {
      const [, error] = await asyncWrapper(createAgent, data);
      if (error) return toastError();
      return toastSuccess(i18n.t('generic.created', { field: i18n.t('table.columns.agent_name') }));
    },
  });

  const form = useForm<z.infer<typeof newAgentSchema>>({
    resolver: zodResolver(newAgentSchema),
    defaultValues: {
      name: '',
      phone: undefined,
      birthdate: undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof newAgentSchema>) => {
    const filter = (value: unknown) => ((value ?? '') === '' ? null : value);
    const data = Object.fromEntries(Object.entries(values).filter(([, value]) => filter(value)));
    postAgent.mutate(data as never as Omit<Agent, 'id'>);
  };

  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">
            {i18n.t('pages.form.add', { field: i18n.t('table.columns.agent_name').toLowerCase() })}
          </CardTitle>
          <CardDescription>
            {i18n.t('pages.form.description.agent', { action: i18n.t('actions.create').toLowerCase() })}
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
                <Button className="w-full mt-4" type="submit">
                  {i18n.t('actions.register')}
                </Button>
                <Button asChild className="w-full" type="reset" variant="outline">
                  <Link to="/agent">{i18n.t('actions.cancel')}</Link>
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewAgentForm;
