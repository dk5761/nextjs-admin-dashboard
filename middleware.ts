import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({ debug: true });
export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
