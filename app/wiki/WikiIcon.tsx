"use client";
import { useEffect, useRef, useState } from "react";
import MachinePreview from "./MachinePreview";
import catalog from "./catalog.generated.json";
type WikiIconProps = { src: string; alt: string; variant?: "normal" | "fluid" | "machine"; itemId?: string; };
export default function WikiIcon({ src, alt, variant = "normal", itemId }: WikiIconProps) {
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = container.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { rootMargin: "140px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const id = itemId ?? "";
  const models = catalog.models as Record<string, string>;
  const textures = catalog.textures as Record<string, string>;
  const previews = catalog.previews as Record<string, { model?: string | null; texture?: string | null; faces?: Record<string, string>; flipV?: boolean }>;
  const preview = variant === "machine" ? previews[id] ?? { model: models[id], texture: textures[id] } : undefined;
  const image = textures[id] ?? src;
  return <div ref={container} className={`wiki-entry-image ${variant === "fluid" ? "wiki-entry-image-fluid" : ""} ${variant === "machine" ? "wiki-entry-image-machine" : ""}`}>
    {preview && (preview.model || preview.texture || Object.keys(preview.faces ?? {}).length) ? (visible ? <MachinePreview preview={preview} name={alt} /> : <div className="model-preview-fallback" aria-hidden="true" />) : !failed ? <img src={image} alt={alt} onError={() => setFailed(true)} /> : <div className="model-preview-fallback" aria-label={alt}>{alt.slice(0, 2).toUpperCase()}</div>}
  </div>;
}
