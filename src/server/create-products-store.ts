"use server";

import { supabase } from "./supabase-client";

const DEFAULT_DATA = { hotwheels: [], updatedOn: null };

export default async function createProductsStore() {
  const blob = new Blob([JSON.stringify(DEFAULT_DATA)], {
    type: "application/json",
  });

  const arrayBuffer = await blob.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from("hotwheels")
    .upload(process.env.DATA_FILE_NAME, fileBuffer, {
      contentType: "application/json",
    });

  if (error) {
    console.log(error);
    throw new Error("Failed to create product store");
  }

  return DEFAULT_DATA;
}
