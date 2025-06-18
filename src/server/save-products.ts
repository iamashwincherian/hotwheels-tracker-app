"use server";

import { supabase } from "./supabase-client";
const { DATA_FILE_NAME } = process.env;

export default async function saveProducts(hotwheels: string[]) {
  const data = { hotwheels, updatedOn: new Date() };
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  const arrayBuffer = await blob.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  await supabase.storage.from("hotwheels").upload(DATA_FILE_NAME!, fileBuffer, {
    contentType: "application/json",
    upsert: true,
  });
  return data;
}
