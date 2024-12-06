"use client";

import getCurrentProducts from "@/server/get-current-products";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    getCurrentProducts().then(setProducts);
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
