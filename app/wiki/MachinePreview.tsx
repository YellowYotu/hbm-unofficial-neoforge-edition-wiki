"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

type Preview = { model?: string | null; texture?: string | null; faces?: Record<string, string>; flipV?: boolean };
export default function MachinePreview({ preview, name }: { preview: Preview; name: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) {
      return;
    }
    let disposed = false;
    let frame = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
    camera.position.set(3.3, 2.55, 4.1);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 9, 7);
    scene.add(light);
    const textures: THREE.Texture[] = [];
    const objects: THREE.Object3D[] = [];
    const mapLoader = new THREE.TextureLoader();
    const loadMap = (url?: string | null) => {
      if (!url) {
        return null;
      }
      const map = mapLoader.load(url);
      map.colorSpace = THREE.SRGBColorSpace;
      map.magFilter = THREE.NearestFilter;
      map.minFilter = THREE.NearestMipmapNearestFilter;
      map.flipY = preview.flipV === undefined ? false : !preview.flipV;
      textures.push(map);
      return map;
    };
    const addCube = () => {
      const faces = preview.faces ?? {};
      const side = preview.texture ?? null;
      const order = ["east", "west", "up", "down", "south", "north"];
      const materials = order.map(face => new THREE.MeshStandardMaterial({ map: loadMap(faces[face] ?? side), color: 0xffffff, roughness: 1, metalness: 0 }));
      const cube = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.85, 1.85), materials);
      cube.rotation.y = -Math.PI / 5;
      scene.add(cube);
      objects.push(cube);
    };
    if (preview.model) {
      new OBJLoader().load(preview.model, object => {
        if (disposed) {
          return;
        }
        const material = new THREE.MeshStandardMaterial({ map: loadMap(preview.texture), color: 0xffffff, roughness: 0.88, metalness: 0, side: THREE.DoubleSide });
        object.traverse(part => {
          if (part instanceof THREE.Mesh) {
            part.material = material;
          }
        });
        const bounds = new THREE.Box3().setFromObject(object);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        object.position.sub(center);
        object.scale.setScalar(2.1 / Math.max(size.x, size.y, size.z, 0.01));
        scene.add(object);
        objects.push(object);
      }, undefined, addCube);
    } else {
      addCube();
    }
    const resize = () => {
      const width = Math.max(element.clientWidth, 1);
      const height = Math.max(element.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const draw = () => {
      if (disposed) {
        return;
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    resize();
    draw();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      for (const object of objects) {
        object.traverse(part => {
          if (part instanceof THREE.Mesh) {
            part.geometry.dispose();
            for (const material of Array.isArray(part.material) ? part.material : [part.material]) {
              material.dispose();
            }
          }
        });
      }
      for (const map of textures) {
        map.dispose();
      }
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [preview.model, preview.texture, preview.flipV, preview.faces]);
  return <div ref={root} className="model-preview" role="img" aria-label={name + " 3D preview"} />;
}
