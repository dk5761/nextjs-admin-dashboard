import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({ debug: true });
export default authMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
