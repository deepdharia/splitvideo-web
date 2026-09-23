export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function shareFiles(files: File[], title: string): Promise<boolean> {
  const nav = navigator as Navigator & {
    canShare?: (data?: ShareData) => boolean;
  };
  if (typeof nav.share !== "function") return false;
  try {
    const data: ShareData = { files, title };
    if (typeof nav.canShare === "function" && !nav.canShare(data)) return false;
    await nav.share(data);
    return true;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return true;
    return false;
  }
}

export async function zipBlobs(
  entries: { name: string; blob: Blob }[],
): Promise<Blob> {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  for (const entry of entries) {
    zip.file(entry.name, entry.blob);
  }
  return zip.generateAsync({ type: "blob" });
}
