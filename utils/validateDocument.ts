import { selectFromTableBy } from '@src/database/queries/select';

import { asyncWrapper } from './asyncWrapper';

const validateDocument = async (value?: string) => {
  if (!value) return true;
  const [query] = await asyncWrapper(selectFromTableBy, 'users', 'cns', value);
  if (query && query.length) return false;
  return true;
};

export default validateDocument;
