import getProducts from "@/server/get-products";
import parseProducts from "@/server/parse-products";
import saveProducts from "@/server/save-products";
import sendEmail from "@/server/send-email";

export default async function updateHotwheels() {
  const products = await getProducts();

  if (products?.length) {
    const newDrops = await parseProducts(products);
    if (newDrops.length) await sendEmail(newDrops);
    await saveProducts(products, newDrops);
  }

  return products;
}
