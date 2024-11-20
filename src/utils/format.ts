export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const formatPercentage = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(value)
}

export const formatNumberWithCommas = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
