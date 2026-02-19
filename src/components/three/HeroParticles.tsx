import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroParticles() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const mountNode = mountRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, mountNode.clientWidth / mountNode.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 200;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 80;

      originalPositions[index * 3] = positions[index * 3];
      originalPositions[index * 3 + 1] = positions[index * 3 + 1];
      originalPositions[index * 3 + 2] = positions[index * 3 + 2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 77, 48, 1)');
      gradient.addColorStop(1, 'rgba(255, 77, 48, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
    }

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      color: 0xff4d30,
      size: 1.2,
      map: texture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountNode.getBoundingClientRect();

      if (event.clientY <= rect.bottom) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      camera.position.x += (mouseX * 15 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 15 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const positionsArray = particles.geometry.attributes.position.array as Float32Array;

      for (let index = 0; index < particleCount; index += 1) {
        const i3 = index * 3;
        positionsArray[i3] = originalPositions[i3] + Math.sin(elapsedTime * 0.3 + originalPositions[i3 + 1]) * 1.5;
        positionsArray[i3 + 1] =
          originalPositions[i3 + 1] + Math.cos(elapsedTime * 0.2 + originalPositions[i3]) * 1.5;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.03;

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

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-70 pointer-events-none mix-blend-screen" />;
}
