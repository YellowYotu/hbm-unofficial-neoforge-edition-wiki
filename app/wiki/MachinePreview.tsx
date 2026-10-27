"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

type Face = { texture?: string; uv?: number[]; rotation?: number };
type Element = { from: number[]; to: number[]; faces: Record<string, Face>; rotation?: { origin: number[]; axis: string; angle: number } };
type Definition = { parent?: string; textures?: Record<string, string>; elements?: Element[] };
type Preview = { model?: string | null; texture?: string | null; faces?: Record<string, string>; flipV?: boolean; definition?: Definition | null };
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
      map.flipY = !preview.model;
      textures.push(map);
      return map;
    };
    const resolve = (value?: string) => {
      let current = value ?? "";
      const textures = preview.definition?.textures ?? {};
      for (let i = 0; i < 8 && current.startsWith("#"); i++) {
        current = textures[current.slice(1)] ?? "";
      }
      return current.startsWith("hbm_neoforge:block/") ? "/wiki/assets/textures/block/" + current.slice("hbm_neoforge:block/".length) + ".png" : undefined;
    };
    const addCube = () => {
      const definition = preview.definition;
      const source = definition?.elements?.length ? definition.elements : [{
        from: [0, 0, 0], to: [16, 16, 16],
        faces: Object.fromEntries(["east", "west", "up", "down", "south", "north"].map(face => [face, { texture: "#" + face }]))
      }] as Element[];
      const direction = ["east", "west", "up", "down", "south", "north"];
      const fallback = preview.faces ?? {};
      const materialCache = new Map<string, THREE.MeshStandardMaterial>();
      for (const element of source) {
        const dimensions = element.to.map((number, index) => (number - element.from[index]) / 8);
        const center = element.from.map((number, index) => (number + element.to[index]) / 16 - 1);
        const geometry = new THREE.BoxGeometry(dimensions[0], dimensions[1], dimensions[2]);
        const materials = direction.map((face, index) => {
          const settings = element.faces[face];
          if (!settings) {
            return new THREE.MeshStandardMaterial({ visible: false });
          }
          const path = resolve(settings.texture) ?? fallback[face] ?? preview.texture ?? "";
          const key = path + ":" + JSON.stringify(settings.uv ?? []);
          if (!settings.uv && materialCache.has(key)) {
            return materialCache.get(key)!;
          }
          const map = loadMap(path);
          if (map && settings.uv?.length === 4) {
            const [u0, v0, u1, v1] = settings.uv;
            map.repeat.set((u1 - u0) / 16, (v1 - v0) / 16);
            map.offset.set(u0 / 16, 1 - v1 / 16);
          }
          const material = new THREE.MeshStandardMaterial({ map, color: 0xffffff, roughness: 1, side: THREE.DoubleSide, transparent: true, alphaTest: 0.1 });
          if (!settings.uv) {
            materialCache.set(key, material);
          }
          return material;
        });
        const mesh = new THREE.Mesh(geometry, materials);
        mesh.position.set(center[0], center[1], center[2]);
        if (element.rotation) {
          const axis = element.rotation.axis as "x" | "y" | "z";
          const rotationOrigin = new THREE.Vector3(element.rotation.origin[0] / 8 - 1, element.rotation.origin[1] / 8 - 1, element.rotation.origin[2] / 8 - 1);
          mesh.position.sub(rotationOrigin);
          mesh.position.applyAxisAngle(new THREE.Vector3(axis === "x" ? 1 : 0, axis === "y" ? 1 : 0, axis === "z" ? 1 : 0), THREE.MathUtils.degToRad(element.rotation.angle));
          mesh.position.add(rotationOrigin);
          mesh.rotation[axis] = THREE.MathUtils.degToRad(element.rotation.angle);
        }
        scene.add(mesh);
        objects.push(mesh);
      }
      if (!source.length) {
        return;
      }
      const assembly = new THREE.Group();
      for (const mesh of objects) {
        scene.remove(mesh);
        assembly.add(mesh);
      }
      assembly.rotation.y = -Math.PI / 5;
      scene.add(assembly);
    };
    if (preview.model) {
      const loader = new OBJLoader();
      const loadObject = () => {
        loader.load(preview.model!, object => {
          if (disposed) {
            return;
          }
          const fallbackMap = preview.texture ? loadMap(preview.texture) : null;
          object.traverse(part => {
            if (part instanceof THREE.Mesh) {
              const materials = Array.isArray(part.material) ? part.material : [part.material];
              for (const material of materials) {
                if (material instanceof THREE.MeshPhongMaterial && !material.map && fallbackMap) {
                  material.map = fallbackMap;
                  material.needsUpdate = true;
                }
              }
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
      };
      const mtlUrl = preview.model.replace(/\\.obj$/i, ".mtl");
      new MTLLoader().load(mtlUrl, materials => {
        materials.preload();
        loader.setMaterials(materials);
        loadObject();
      }, undefined, loadObject);
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
      const disposedMaterials = new Set<THREE.Material>();
      for (const object of objects) {
        object.traverse(part => {
          if (part instanceof THREE.Mesh) {
            part.geometry.dispose();
            for (const material of Array.isArray(part.material) ? part.material : [part.material]) {
              if (!disposedMaterials.has(material)) {
                material.dispose();
                disposedMaterials.add(material);
              }
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
