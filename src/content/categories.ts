export const categories = ["kitchen", "wardrobe", "living", "commercial"] as const;
export type Category = (typeof categories)[number];
