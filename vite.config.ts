export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "/",
  plugins: [
    react(),
    mode === "development"
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
