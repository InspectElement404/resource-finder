export { default } from "next-auth/middleware";

// Only run this middleware on the dashboard and its sub-pages
export const config = {
  matcher: ["/dashboard/:path*"],
};
