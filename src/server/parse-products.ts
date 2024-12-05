"use server";

import { promises as fs } from "fs";
import createProductsStore from "@/server/create-products-store";

export default async function parseProducts(products: string[]) {
  let existingProducts: string[] = [];
  try {
    const file = await fs.readFile(process.cwd() + "/src/data.json", "utf8");
    existingProducts = JSON.parse(file)["hotwheels"] || [];
  } catch {
    createProductsStore();
  }

  const newDrops = products.filter(
    (product) => !existingProducts.includes(product)
  );

  return newDrops || [];
}
