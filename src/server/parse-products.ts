"use server";

import { promises as fs } from "fs";

export default async function parseProducts(products: string[]) {
  let existingProducts: string[] = [];
  const file = await fs.readFile(process.cwd() + "/src/data.json", "utf8");
  if (file) {
    existingProducts = JSON.parse(file)["hotwheels"] || [];
  }

  const newDrops = products.filter(
    (product) => !existingProducts.includes(product)
  );

  return newDrops || [];
}
