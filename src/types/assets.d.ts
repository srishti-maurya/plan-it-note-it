declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}


declare module "jwt-encode" {
  function sign(payload: Record<string, unknown>, secret: string): string;
  export default sign;
}
