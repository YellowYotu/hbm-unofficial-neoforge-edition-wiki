"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

export default function MachinePreview({ model, texture, name }: { model: string; texture?: string; name: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) {
      return;
    }
    let disposed = false;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x54606b, 3));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(4, 8, 6);
    scene.add(light);
    let mesh: THREE.Group | undefined;
    let imageTexture: THREE.Texture | undefined;
    let animation = 0;
    const resize = () => {
      const width = Math.max(element.clientWidth, 1);
      const height = Math.max(element.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    const loader = new OBJLoader();
    loader.load(model, object => {
      if (disposed) {
        return;
      }
      mesh = object;
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      object.position.sub(center);
      const max = Math.max(size.x, size.y, size.z, 0.01);
      object.scale.setScalar(2 / max);
      camera.position.set(3.7, 2.7, 4.6);
      camera.lookAt(0, 0, 0);
      object.traverse(part => {
        if (part instanceof THREE.Mesh) {
          part.material = new THREE.MeshStandardMaterial({ color: 0xaeb7bc, roughness: 0.85, metalness: 0.14, side: THREE.DoubleSide });
        }
      });
      scene.add(object);
      if (texture) {
        new THREE.TextureLoader().load(texture, map => {
          if (disposed) {
            map.dispose();
            return;
          }
          imageTexture = map;
          map.colorSpace = THREE.SRGBColorSpace;
          map.flipY = false;
          map.magFilter = THREE.NearestFilter;
          object.traverse(part => {
            if (part instanceof THREE.Mesh) {
              (part.material as THREE.MeshStandardMaterial).map = map;
              (part.material as THREE.MeshStandardMaterial).color.set(0xffffff);
              (part.material as THREE.MeshStandardMaterial).needsUpdate = true;
            }
          });
        });
      }
    }, undefined, () => setError(true));
    const draw = () => {
      if (disposed) {
        return;
      }
      renderer.render(scene, camera);
      animation = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      disposed = true;
      cancelAnimationFrame(animation);
      observer.disconnect();
      mesh?.traverse(part => {
        if (part instanceof THREE.Mesh) {
          part.geometry.dispose();
          (part.material as THREE.Material).dispose();
        }
      });
      imageTexture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [model, texture]);
  if (error) {
    return <div className="model-preview-fallback" aria-label={name}>{name.slice(0, 2).toUpperCase()}</div>;
  }
  return <div ref={root} className="model-preview" role="img" aria-label={name + " three-dimensional model"} />;
}
