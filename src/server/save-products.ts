"use server";

import { promises as fs } from "fs";

export default async function saveProducts(
  hotwheels: string[],
) {
  const data = { hotwheels, updatedOn: new Date() };
  await fs.writeFile(
    process.cwd() + "/src/data.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return data;
}
