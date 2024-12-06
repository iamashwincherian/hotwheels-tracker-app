import updateHotwheels from "@/server/update-hotwheels";

export async function GET() {
  const products = await updateHotwheels();
  return Response.json({ products });
}
