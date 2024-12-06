import updateHotwheels from "@/server/update-hotwheels";

export async function GET() {
  const response = await updateHotwheels();
  return Response.json(response);
}
