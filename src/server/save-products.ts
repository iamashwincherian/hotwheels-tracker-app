"use server";

import { put, del, list } from "@vercel/blob";
const { DATA_FILE_NAME } = process.env;

export default async function saveProducts(hotwheels: string[]) {
  const data = { hotwheels, updatedOn: new Date() };
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  const { blobs: cloudBlobs } = await list();
  const file = cloudBlobs.find((file) => file.pathname === DATA_FILE_NAME);
  if (file) del(file.downloadUrl);
  await put(DATA_FILE_NAME, blob, { access: "public" });
  return data;
}
