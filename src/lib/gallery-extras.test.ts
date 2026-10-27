import { describe, expect, it } from "vitest";
import { galleryPreview, parseFilmExtras, withFilmExtras } from "./gallery-extras";

describe("gallery defaults", () => {
  it("uses compressed thumbnails for every gallery path", () => {
    for (const path of ["/2026/nina/photo.jpg", "/2027/new/photo.jpg"]) {
      const url = new URL(galleryPreview(path));
      expect(url.searchParams.get("format")).toBe("webp");
      expect(url.searchParams.get("size")).toBe("w640h480");
      expect(url.searchParams.get("mode")).toBe("thumb");
    }
  });
  it("offers both requested durations without invented prices", () => {
    const extras = parseFilmExtras([]).filter((item) => item.enabled);
    expect(extras.map((item) => item.title)).toEqual(["Social Media Short (20s)", "Social Media Short (40s)"]);
    expect(extras.map((item) => item.price)).toEqual([null, null]);
  });
  it("preserves removed extras and disabled choices", () => {
    expect(parseFilmExtras(withFilmExtras([], []))).toEqual([]);
    const extras = [{ id: "custom", title: "Custom", description: "", price: 75, enabled: false }];
    expect(parseFilmExtras(withFilmExtras([], extras))).toEqual(extras);
  });
  it("preserves film records while replacing metadata", () => {
    const film = { id: "film", url: "https://example.com/film" };
    expect(withFilmExtras(withFilmExtras([film], []), [])).toEqual([film, { booking_extras: [] }]);
  });
});