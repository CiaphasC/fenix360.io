import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type FogSprite = THREE.Sprite & {
  userData: {
    baseX: number;
    baseY: number;
    baseZ: number;
    baseScale: number;
    phase: number;
    speed: number;
    drift: number;
    density: number;
  };
};

export function QuoteFogGlow() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const mountNode = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, mountNode.clientWidth / mountNode.clientHeight, 1, 700);
    camera.position.z = 190;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountNode.appendChild(renderer.domElement);

    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 256;
    textureCanvas.height = 256;
    const context = textureCanvas.getContext('2d');

    if (context) {
      const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, 'rgba(255, 140, 70, 0.95)');
      gradient.addColorStop(0.35, 'rgba(255, 98, 46, 0.55)');
      gradient.addColorStop(0.8, 'rgba(255, 77, 48, 0.08)');
      gradient.addColorStop(1, 'rgba(255, 77, 48, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 256);
    }

    const glowTexture = new THREE.CanvasTexture(textureCanvas);
    const fogLayer = new THREE.Group();
    scene.add(fogLayer);

    const sprites: FogSprite[] = [];
    const fogCount = 22;

    for (let index = 0; index < fogCount; index += 1) {
      const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xff6a3d,
        transparent: true,
        opacity: 0.045 + Math.random() * 0.05,
        depthWrite: false,
        depthTest: false,
        blending: THREE.NormalBlending,
      });

      const sprite = new THREE.Sprite(material) as FogSprite;
      const baseX = (Math.random() - 0.5) * 320;
      const baseY = (Math.random() - 0.5) * 190;
      const baseZ = (Math.random() - 0.5) * 140;
      const baseScale = 110 + Math.random() * 160;

      sprite.position.set(baseX, baseY, baseZ);
      sprite.scale.setScalar(baseScale);
      sprite.userData = {
        baseX,
        baseY,
        baseZ,
        baseScale,
        phase: Math.random() * Math.PI * 2,
        speed: 0.038 + Math.random() * 0.055,
        drift: 8 + Math.random() * 14,
        density: 0.8 + Math.random() * 0.7,
      };

      fogLayer.add(sprite);
      sprites.push(sprite);
    }

    fogLayer.position.y = 2;

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      for (const sprite of sprites) {
        const material = sprite.material as THREE.SpriteMaterial;
        const { baseX, baseY, baseZ, baseScale, phase, speed, drift, density } = sprite.userData;

        sprite.position.x = baseX + Math.sin(elapsed * speed + phase) * drift;
        sprite.position.y = baseY + Math.cos(elapsed * speed * 0.75 + phase) * drift * 0.45;
        sprite.position.z = baseZ + Math.sin(elapsed * speed * 0.5 + phase) * 18;

        const pulse = 1 + Math.sin(elapsed * speed * 0.55 + phase) * 0.05;
        sprite.scale.setScalar(baseScale * pulse);
        material.opacity = 0.032 + density * 0.04 + Math.sin(elapsed * speed * 0.6 + phase) * 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = mountNode.clientWidth / mountNode.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frameId);

      for (const sprite of sprites) {
        const material = sprite.material as THREE.SpriteMaterial;
        material.dispose();
      }

      glowTexture.dispose();
      renderer.dispose();

      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(circle at 50% 58%, rgba(255,117,66,0.2) 0%, rgba(255,117,66,0.1) 24%, rgba(255,117,66,0) 70%)',
        maskImage: 'radial-gradient(circle at 50% 52%, black 0%, black 78%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 52%, black 0%, black 78%, transparent 100%)',
      }}
    />
  );
}
