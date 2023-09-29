export function formatAmount (
  amount: number,
  locales: string | undefined = 'fr-FR',
  currency: string | undefined = 'EUR'
): string {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency
  }).format(amount)
}
