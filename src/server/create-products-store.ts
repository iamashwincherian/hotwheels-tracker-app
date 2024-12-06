"use server";

import { put } from "@vercel/blob";

const DEFAULT_DATA = { hotwheels: [], updatedOn: null };

export default async function createProductsStore() {
  const blob = new Blob([JSON.stringify(DEFAULT_DATA)], {
    type: "application/json",
  });

  await put(process.env.DATA_FILE_NAME, blob, { access: "public" });
  return DEFAULT_DATA;
}
