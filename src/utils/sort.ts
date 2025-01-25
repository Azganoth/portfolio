export const compareOrderBy =
  <T, R>(order: R[], getValue: (item: T) => R) =>
  (a: T, b: T) => {
    const indexA = order.indexOf(getValue(a));
    const indexB = order.indexOf(getValue(b));

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  };
