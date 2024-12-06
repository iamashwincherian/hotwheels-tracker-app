"use server";

import { list } from "@vercel/blob";
import createProductsStore from "./create-products-store";

export default async function getCurrentProducts() {
  let existingProducts: string[] = [];
  let updatedOn = null;
  const { blobs } = await list();
  const file = blobs.find((file) => file.pathname === "data.json");

  if (file) {
    const data = await fetch(file.downloadUrl).then((res) => res.json());
    existingProducts = data.hotwheels;
    updatedOn = data.updatedOn && new Date(data.updatedOn);
  } else {
    const data = await createProductsStore();
    updatedOn = data.updatedOn && new Date(data.updatedOn);
  }

  return { products: existingProducts, updatedOn };
}
