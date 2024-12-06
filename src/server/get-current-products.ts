"use server";

import { promises as fs } from "fs";
import createProductsStore from "./create-products-store";

export default async function getCurrentProducts() {
  let existingProducts: string[] = [];
  let updatedOn = null;

  try {
    const file = await fs.readFile(process.cwd() + "data.json", "utf8");
    const data = JSON.parse(file);
    existingProducts = data.hotwheels;
    updatedOn = data.updatedOn && new Date(data.updatedOn);
  } catch {
    const data = await createProductsStore();
    updatedOn = data.updatedOn && new Date(data.updatedOn);
  }

  return { products: existingProducts, updatedOn };
}
