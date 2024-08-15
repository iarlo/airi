import i18n from '@config/i18n/main';
import { z } from 'zod';

import validateDocument from './validateDocument';

const invalid = i18n.t('errors.form.invalid');
const required = i18n.t('errors.form.required');

const name = z.string().min(1, required);

const gender = z.enum(['F', 'M'], { message: required });

const document = z
  .union([
    z.string().length(0, invalid),
    z.string().regex(/^(?=(.{11}|.{15})$)\s*(\d{3})(\d{3}|\d{4})(\d{3}|\d{4})(\d{4}|\d{2})\s*$/, invalid),
  ])
  .optional()
  .transform((e) => (typeof e === 'string' && e === '' ? undefined : e))
  .refine(validateDocument, i18n.t('errors.form.unique', { what: i18n.t('table.columns.document').toLowerCase() }));

const phone = z
  .union([
    z.string().length(0, invalid),
    z.string().regex(/^(?=.{11}$)\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/, invalid),
  ])
  .optional()
  .transform((e) => (typeof e === 'string' && e === '' ? undefined : e));

const newUserSchema = z.object({
  address: z.string().optional(),
  agent_id: z
    .string()
    .regex(/^[0-9]*$/)
    .optional(),
  cns: document,
  gender,
  name,
  phone,
  birthdate: z.date().optional(),
});

export { phone, document, gender, name, newUserSchema };
