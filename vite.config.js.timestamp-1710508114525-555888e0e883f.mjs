// vite.config.js
import { defineConfig } from "file:///C:/Users/Khusbu%20gupta/OneDrive/Documents/Unr-Khusbu(sungstaff)/SnugStaff-React/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Khusbu%20gupta/OneDrive/Documents/Unr-Khusbu(sungstaff)/SnugStaff-React/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material/Tooltip"
    ]
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxLaHVzYnUgZ3VwdGFcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXFVuci1LaHVzYnUoc3VuZ3N0YWZmKVxcXFxTbnVnU3RhZmYtUmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEtodXNidSBndXB0YVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcVW5yLUtodXNidShzdW5nc3RhZmYpXFxcXFNudWdTdGFmZi1SZWFjdFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvS2h1c2J1JTIwZ3VwdGEvT25lRHJpdmUvRG9jdW1lbnRzL1Vuci1LaHVzYnUoc3VuZ3N0YWZmKS9TbnVnU3RhZmYtUmVhY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogW1xyXG4gICAgICAnQGVtb3Rpb24vcmVhY3QnLCBcclxuICAgICAgJ0BlbW90aW9uL3N0eWxlZCcsIFxyXG4gICAgICAnQG11aS9tYXRlcmlhbC9Ub29sdGlwJ1xyXG4gICAgXSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KHtcclxuICAgICAganN4SW1wb3J0U291cmNlOiAnQGVtb3Rpb24vcmVhY3QnLFxyXG4gICAgICBiYWJlbDoge1xyXG4gICAgICAgIHBsdWdpbnM6IFsnQGVtb3Rpb24vYmFiZWwtcGx1Z2luJ10sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG59KVxyXG5cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0YSxTQUFTLG9CQUFvQjtBQUN6YyxPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixpQkFBaUI7QUFBQSxNQUNqQixPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsdUJBQXVCO0FBQUEsTUFDbkM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
