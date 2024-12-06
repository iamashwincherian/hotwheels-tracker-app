"use server";

import { promises as fs } from "fs";
import createProductsStore from "./create-products-store";

export default async function getCurrentProducts() {
  let existingProducts: string[] = [];
  try {
    const file = await fs.readFile(process.cwd() + "/src/data.json", "utf8");
    existingProducts = JSON.parse(file)["hotwheels"] || [];
  } catch {
    await createProductsStore();
  }

  return existingProducts;
}
