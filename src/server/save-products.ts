"use server";

import { put, del, list } from "@vercel/blob";

export default async function saveProducts(hotwheels: string[]) {
  const data = { hotwheels, updatedOn: new Date() };
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  const { blobs: cloudBlobs } = await list();
  const file = cloudBlobs.find((file) => file.pathname === "data.json");
  if (file) del(file.downloadUrl);
  await put("data.json", blob, { access: "public" });
  return data;
}
