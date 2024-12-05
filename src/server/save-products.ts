"use server";

import { promises as fs } from "fs";

export default async function saveProducts(
  hotwheels: string[],
  newDrops: string[]
) {
  await fs.writeFile(
    process.cwd() + "/src/data.json",
    JSON.stringify({ hotwheels }, null, 2),
    "utf8"
  );

  console.log(newDrops.length, " cars added!");
}
