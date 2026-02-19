import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function RisingEmbersBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const mountNode = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);

    for (let index = 0; index < particleCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 300;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 100;

      speeds[index] = 0.05 + Math.random() * 0.1;
      offsets[index] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 32;
    textureCanvas.height = 32;
    const context = textureCanvas.getContext('2d');

    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 77, 48, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 77, 48, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
    }

    const texture = new THREE.CanvasTexture(textureCanvas);

    const material = new THREE.PointsMaterial({
      color: 0xff4d30,
      size: 1.2,
      map: texture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const targetX = mouseX * 5;
      const targetY = mouseY * 5;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      const positionsAttr = particles.geometry.attributes.position;
      const positionsArray = positionsAttr.array as Float32Array;

      for (let index = 0; index < particleCount; index += 1) {
        positionsArray[index * 3 + 1] += speeds[index];

        if (positionsArray[index * 3 + 1] > 100) {
          positionsArray[index * 3 + 1] = -100;
          positionsArray[index * 3] = (Math.random() - 0.5) * 300;
        }

        positionsArray[index * 3] += Math.sin(elapsedTime * 0.5 + offsets[index]) * 0.05;
      }

      positionsAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);

      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
}
