const formatter = Intl.NumberFormat('pt-BR');

function formatValue(value) {
  return formatter.format(value);
}

export { formatValue };
