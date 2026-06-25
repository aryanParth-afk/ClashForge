export const PROFILE_KEY = "clashforge_linked_profile_tag";

export function getLinkedProfile(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PROFILE_KEY);
}

export function setLinkedProfile(tag: string) {
  if (typeof window !== "undefined") {
    // Normalize tag before saving
    const cleanTag = tag.replace(/^#/, "").toUpperCase();
    localStorage.setItem(PROFILE_KEY, `#${cleanTag}`);
  }
}

export function unlinkProfile() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(PROFILE_KEY);
  }
}
