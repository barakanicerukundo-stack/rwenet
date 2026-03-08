import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2, Save, User } from "lucide-react";
import { motion } from "framer-motion";

const provinces = [
  "Kigali City", "Eastern Province", "Northern Province", "Southern Province", "Western Province",
];

const ProfileSettings = () => {
  const { user, role, profile } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [province, setProvince] = useState(profile?.province || "");
  const [school, setSchool] = useState(profile?.school || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch current avatar on mount
  const [loadedAvatar, setLoadedAvatar] = useState(false);
  if (!loadedAvatar && profile) {
    setFullName(profile.full_name || "");
    setPhone(profile.phone || "");
    setProvince(profile.province || "");
    setSchool(profile.school || "");
    setLoadedAvatar(true);
  }

  // Fetch avatar URL
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  if (!avatarLoaded && user) {
    supabase.from("profiles").select("avatar_url").eq("user_id", user.id).single().then(({ data }) => {
      if (data?.avatar_url) setAvatarUrl(data.avatar_url);
    });
    setAvatarLoaded(true);
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please select an image under 2MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", user.id);

    if (updateError) {
      toast({ title: "Failed to save avatar", description: updateError.message, variant: "destructive" });
    } else {
      setAvatarUrl(publicUrl + "?t=" + Date.now());
      toast({ title: "Avatar updated", description: "Your profile picture has been changed." });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        phone: phone.trim() || null,
        province: province || null,
        school: school.trim() || null,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated", description: "Your changes have been saved successfully." });
    }
    setSaving(false);
  };

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <DashboardLayout role={(role as "student" | "teacher" | "admin") || "student"} userName={fullName || "User"}>
      <div className="mx-auto max-w-2xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h2 className="font-display text-2xl font-bold text-foreground">Profile Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
        </motion.div>

        {/* Avatar Section */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Picture</CardTitle>
              <CardDescription>Upload a photo to personalize your account</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-border">
                  <AvatarImage src={avatarUrl || undefined} alt={fullName || "Avatar"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/40">
                    <Loader2 className="h-6 w-6 animate-spin text-primary-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {uploading ? "Uploading..." : "Change Photo"}
                </Button>
                <p className="text-xs text-muted-foreground">JPG, PNG or WebP. Max 2MB.</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ""} disabled className="opacity-60" />
                <p className="text-xs text-muted-foreground">Email cannot be changed here</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+250 7XX XXX XXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Enter your school name"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Role</p>
                  <p className="text-xs text-muted-foreground capitalize">{role || "—"}</p>
                </div>
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Member Since</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button onClick={handleSave} disabled={saving} className="w-full" size="lg">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings;
