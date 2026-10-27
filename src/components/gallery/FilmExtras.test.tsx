import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import FilmExtras from "./FilmExtras";
import { FILM_EXTRA_PRESETS } from "@/lib/gallery-extras";

afterEach(() => vi.unstubAllGlobals());

it("requests selected film extras without requiring photographs", async () => {
  const fetcher = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", fetcher);
  render(<FilmExtras extras={FILM_EXTRA_PRESETS} couple="Test + Couple" slug="test-couple" t={(_, en) => en} />);
  fireEvent.click(screen.getAllByRole("button", { name: "Select" })[0]);
  fireEvent.click(screen.getByRole("button", { name: "Request film extras (1)" }));
  fireEvent.change(screen.getByLabelText("Your names"), { target: { value: "Test + Couple" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Send request" }));
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
  const request = fetcher.mock.calls[0][1].body as FormData;
  expect(request.get("film_extras")).toBe("Social Media Short (20s) - Price on request");
  expect(request.get("gallery")).toBe("Test + Couple");
  expect(await screen.findByRole("heading", { name: "Thank you for your request." })).toBeInTheDocument();
});