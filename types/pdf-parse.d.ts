declare module "pdf-parse" {
  const pdfParse: (data: unknown, options?: unknown) => Promise<{ text: string }>;
  export default pdfParse;
}
