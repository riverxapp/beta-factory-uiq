"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

export default function EditContactPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch(`/api/contacts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch contact");
        const data: Contact = await res.json();
        setContact(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load contact");
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Failed to update contact");
      toast({ title: "Contact updated", description: "Changes saved successfully." });
      router.push(`/contacts/${id}`);
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Something went wrong", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-destructive">{error ?? "Contact not found"}</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Contact</h1>
          <p className="text-sm text-muted-foreground">Update details for {contact.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Make changes to the contact details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={contact.company}
                onChange={(e) => setContact({ ...contact, company: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={contact.notes}
                onChange={(e) => setContact({ ...contact, notes: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
