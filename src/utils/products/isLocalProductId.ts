const FIRST_LOCAL_PRODUCT_ID = 100000;

export const isLocalProductId = (productId: number) =>
  productId >= FIRST_LOCAL_PRODUCT_ID;
