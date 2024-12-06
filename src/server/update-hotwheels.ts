import getProducts from "@/server/get-products";
import parseProducts from "@/server/parse-products";
import saveProducts from "@/server/save-products";
import sendEmail from "@/server/send-email";

export default async function updateHotwheels() {
  const products = await getProducts();
  let updatedData = null;
  let newDrops: string[] = [];

  if (products?.length) {
    newDrops = await parseProducts(products);
    if (newDrops.length) await sendEmail(newDrops);
    updatedData = await saveProducts(products);
  }

  return {
    updatedOn: updatedData?.updatedOn,
    products: products,
    newDrops,
  };
}
