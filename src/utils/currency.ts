export function formatCurrencyMask(value: string | number): string {
  if (!value) return '';

  // Remove non-digit characters
  const numericValue = value.toString().replace(/\D/g, '');

  if (numericValue === '') return '';

  // Convert to number and divide by 100 for cents
  const amount = Number(numericValue) / 100;

  // Format as BRL currency without the R$ prefix since the Input might already have the prefix
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
