import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/Select';
import { Switch } from '@components/Switch';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lng: (typeof i18n.languages)[number]) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Português', value: 'pt-BR' },
  ];

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">{t('pages.settings.title')}</h1>
      </div>
      <div className="grid gap-6">
        <Card className="inline-flex items-center flex-nowrap">
          <CardHeader>
            <CardTitle>{t('pages.settings.other.theme.label')}</CardTitle>
            <CardDescription>{t('pages.settings.other.theme.description')}</CardDescription>
          </CardHeader>
          <div className="px-6">
            <Switch checked={theme === 'dark'} onCheckedChange={handleThemeChange} />
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.settings.other.language.label')}</CardTitle>
            <CardDescription>{t('pages.settings.other.language.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 text-muted-foreground text-xs">
            {t('pages.settings.other.language.footer')}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default SettingsPage;
