"use server";

import getCurrentProducts from "./get-current-products";

export default async function parseProducts(products: string[]) {
  const { products: existingProducts } = await getCurrentProducts();

  const newDrops = products.filter(
    (product) => !existingProducts.includes(product)
  );

  return newDrops || [];
}
