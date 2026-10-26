import { describe, expect, it } from "vitest";
import { dropboxVideoUrl, gallerySlug, validGalleryFilm, validGalleryFolder } from "./gallery-media";

describe("client gallery sources", () => {
  it("plays Dropbox shared files directly, preserving their access parameter", () => {
    expect(dropboxVideoUrl("https://www.dropbox.com/scl/fi/abc/film.mp4?rlkey=publickey&dl=0")).toBe("https://www.dropbox.com/scl/fi/abc/film.mp4?rlkey=publickey&raw=1");
  });
  it("supports older Dropbox file links", () => {
    expect(dropboxVideoUrl("https://www.dropbox.com/s/abc/film.mp4?dl=1")).toBe("https://www.dropbox.com/s/abc/film.mp4?raw=1");
  });
  it("does not treat folder links or lookalike hosts as playable files", () => {
    expect(dropboxVideoUrl("https://www.dropbox.com/scl/fo/abc/folder?dl=0")).toBeNull();
    expect(dropboxVideoUrl("https://www.dropbox.com.evil.test/s/abc/film.mp4")).toBeNull();
    expect(validGalleryFilm("javascript:alert(1)")).toBe(false);
  });
  it("retains existing Wistia films", () => {
    expect(validGalleryFilm("https://hugo.wistia.com/medias/abc123")).toBe(true);
    expect(validGalleryFilm("abc123")).toBe(true);
  });
  it("accepts photo folders supported by the existing photo service", () => {
    expect(validGalleryFolder("/2026/Karo_Amir")).toBe(true);
    expect(validGalleryFolder("https://www.dropbox.com/scl/fo/abc")).toBe(false);
  });
  it("creates readable gallery names", () => {
    expect(gallerySlug("Karo + Amir")).toBe("karo-amir");
  });
});