```diff
--- a/app/layout.tsx
+++ b/app/layout.tsx
@@ -1,7 +1,7 @@
 import type { Metadata } from "next";
 import { Inter } from "next/font/google";
 import { ThemeProvider } from "next-themes";
-import { Toaster } from "@/components/ui/toaster";
+import { Toaster } from "sonner";
 import "./globals.css";
 
 const inter = Inter({ subsets: ["latin"] });
```