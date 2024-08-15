const formatPhone = (phone: string) => phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
const formatDocument = (document: string) =>
  document.replace(
    /^\s*(\d{3})(\d{3}|\d{4})(\d{3}|\d{4})(\d{4}|\d{2})\s*$/,
    `$1 $2 $3${document.length === 11 ? '-' : ' '}$4`
  );

export { formatPhone, formatDocument };
