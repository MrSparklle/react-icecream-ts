export const validateDescription = (description: string) => {
  return description ? null : 'You must enter a description';
};

export const validateQuantity = (quantity: number, inStock: boolean) => {
  return inStock && (quantity === 0)
    ? 'An in stock item should have a quantity'
    : null;
};

export const validatePrice = (price: number) => {
  return !price || price <= 0 ? 'You must enter a valid price' : null;
};
