"use server";

import { promises as fs } from "fs";
import path from "path";

const DEFAULT_DATA = { hotwheels: [], updatedOn: new Date() };

export default async function createProductsStore() {
  const filePath = path.join(process.cwd(), "src", "data.json");
  const dirPath = path.dirname(filePath);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(DEFAULT_DATA, null, 2), "utf8");
}
