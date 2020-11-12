const numberFormatter = Intl.NumberFormat('pt-BR');

const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const percentageFormatter = Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
});

function formatNumber(number) {
  return numberFormatter.format(number);
}

function formatMoney(number) {
  return moneyFormatter.format(number);
}

function formatPercentage(number) {
  //return `(${number.toFixed(2).replace('.', ',')}%)`;
  return `(${percentageFormatter.format(number / 100)})`;
}

export { formatNumber, formatMoney, formatPercentage };
