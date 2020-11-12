function getFactorialFrom(number) {
  if (number <= 1) {
    return 1;
  }

  return number * getFactorialFrom(number - 1);
}

export { getFactorialFrom };
