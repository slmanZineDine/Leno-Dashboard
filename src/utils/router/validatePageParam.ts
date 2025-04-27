function validatePageParam({ params }: { [key: string]: any }): boolean {
  if (
    typeof params.prefix === "undefined" ||
    typeof params.prefix !== "string" ||
    /^[a-z]+$/i.test(params.prefix)
  ) {
    throw new Response("Bad Request", {
      statusText: "المستخدم غير موجود.",
      status: 400,
    });
  }
  return true;
}
export default validatePageParam;
