"use server";

import { supabase } from "./supabase-client";
import createProductsStore from "./create-products-store";

export default async function getCurrentProducts() {
  let existingProducts: string[] = [];
  let updatedOn = null;

  const { data: fileData, error: fileError } = await supabase.storage
    .from(process.env.SUPABASE_STORAGE_BUCKET_NAME)
    .download(process.env.DATA_FILE_NAME);

  if (fileData && !fileError) {
    const content = await fileData.text();
    const parsed = JSON.parse(content);
    existingProducts = parsed.hotwheels;
    updatedOn = parsed.updatedOn ? new Date(parsed.updatedOn) : null;
  } else {
    const data = await createProductsStore();
    existingProducts = data.hotwheels;
    updatedOn = data.updatedOn ? new Date(data.updatedOn) : null;
  }

  return { products: existingProducts, updatedOn };
}
