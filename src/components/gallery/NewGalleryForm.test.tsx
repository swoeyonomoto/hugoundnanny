import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NewGalleryForm from "./NewGalleryForm";

const { insert, single } = vi.hoisted(() => ({ insert: vi.fn(), single: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: () => ({ insert }) } }));

describe("new client gallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    insert.mockReturnValue({ select: () => ({ single }) });
    single.mockResolvedValue({ data: { id: "created-gallery" }, error: null });
  });

  it("creates a new inactive photo and film gallery without changing existing galleries", async () => {
    const onCreated = vi.fn();
    render(<NewGalleryForm onCreated={onCreated} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("Namen"), { target: { value: "Karo + Amir" } });
    fireEvent.change(screen.getByLabelText("Dropbox-Ordner für Fotos"), { target: { value: "/2026/Karo_Amir" } });
    fireEvent.change(screen.getByLabelText("Dropbox-Dateilink oder Wistia-Link für den Film"), { target: { value: "https://www.dropbox.com/s/abc/film.mp4?dl=0" } });
    fireEvent.click(screen.getByRole("button", { name: "Galerie als Entwurf erstellen" }));
    await waitFor(() => expect(onCreated).toHaveBeenCalledWith("created-gallery"));
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ couple_name: "Karo + Amir", slug: "karo-amir", active: false, has_photos: true, dropbox_path: "/2026/Karo_Amir", films: [expect.objectContaining({ kind: "highlight", url: "https://www.dropbox.com/s/abc/film.mp4?dl=0" })] }));
  });
});