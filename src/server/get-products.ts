"use server";
import { URL } from "@/constants";
import { parse } from "node-html-parser";

export async function getProducts() {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const html = await response.text();
      const root = parse(html);
      const productsContainer = root.querySelector(".product-show-right");
      if (!productsContainer) return;

      const products = (productsContainer
        .querySelectorAll(".show-product-small-bx")
        ?.map((product) =>
          product
            .querySelector(".detail-text")
            ?.querySelector("h3")
            ?.text.trim()
        ) || []) as string[];

      return products;
    }
  } catch (err) {
    console.error(err);
  }

  return;
}
