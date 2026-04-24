--- a/app/contacts/new/page.tsx
+++ b/app/contacts/new/page.tsx
@@ -4,11 +4,8 @@ import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
-import { Textarea } from "@/components/ui/textarea";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { Separator } from "@/components/ui/separator";
 import Link from "next/link";
 
 export default function NewContactPage() {
   return (
@@ -101,7 +98,7 @@ export default function NewContactPage() {
               <div className="grid gap-2">
                 <Label htmlFor="notes">Notes</Label>
-                <Textarea
+                <textarea
                   id="notes"
                   placeholder="Additional notes about this contact..."
                   className="min-h-[120px]"