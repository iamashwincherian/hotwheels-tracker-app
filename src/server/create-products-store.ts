"use server";

import { promises as fs } from "fs";
import path from "path";

const DEFAULT_DATA = { hotwheels: [], updatedOn: null };

export default async function createProductsStore() {
  const filePath = path.join(process.cwd(), "data.json");
  const dirPath = path.dirname(filePath);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(DEFAULT_DATA, null, 2), "utf8");

  return DEFAULT_DATA;
}
