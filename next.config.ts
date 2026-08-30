import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Native/server-only database packages must not be bundled by the compiler.
  serverExternalPackages: ["mongodb", "mongodb-memory-server"],
};

export default nextConfig;
