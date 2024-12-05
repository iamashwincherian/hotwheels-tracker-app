"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/server/get-products";
import parseProducts from "@/server/parse-products";
import sendEmail from "@/server/send-email";
import saveProducts from "@/server/save-products";

export default function Home() {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data || []);
      if (data?.length) {
        parseProducts(data).then((newDrops) => {
          if (newDrops.length) sendEmail(newDrops);
          saveProducts(data, newDrops);
        });
      }
    });
  }, []);

  return (
    <div>
      <h3>Hot wheels tracker App</h3>
      {products.map((name) => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
}
