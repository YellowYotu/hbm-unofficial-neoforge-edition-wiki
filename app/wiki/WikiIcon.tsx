"use client";
import { useState } from "react";
import MachinePreview from "./MachinePreview";
import catalog from "./catalog.generated.json";
type WikiIconProps = { src: string; alt: string; variant?: "normal" | "fluid" | "machine"; itemId?: string; };
export default function WikiIcon({ src, alt, variant = "normal", itemId }: WikiIconProps) {
  const [failed, setFailed] = useState(false);
  const id = itemId ?? "";
  const models = catalog.models as Record<string, string>;
  const textures = catalog.textures as Record<string, string>;
  const model = variant === "machine" ? models[id] : undefined;
  const image = textures[id] ?? src;
  return <div className={`wiki-entry-image ${variant === "fluid" ? "wiki-entry-image-fluid" : ""} ${variant === "machine" ? "wiki-entry-image-machine" : ""}`}>
    {model ? <MachinePreview model={model} texture={textures[id]} name={alt} /> : !failed ? <img src={image} alt={alt} onError={() => setFailed(true)} /> : <div className="model-preview-fallback" aria-label={alt}>{alt.slice(0, 2).toUpperCase()}</div>}
  </div>;
}
