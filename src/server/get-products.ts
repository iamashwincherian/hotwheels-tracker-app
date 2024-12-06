"use server";

import { parse } from "node-html-parser";
import { URL } from "@/constants";

export default async function getProducts() {
  let page = 1;
  const allProducts = [];

  while (true) {
    try {
      const response = await fetch(`${URL}?page=${page}`);
      if (response.ok) {
        const html = await response.text();
        const root = parse(html);
        const productsContainer = root.querySelector(".product-show-right");
        if (productsContainer) {
          const products = (productsContainer
            .querySelectorAll(".show-product-small-bx")
            ?.map((product) =>
              product
                .querySelector(".detail-text")
                ?.querySelector("h3")
                ?.text.trim()
            ) || []) as string[];

          allProducts.push(...products);
          page += 1;
        } else {
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return allProducts;
}
