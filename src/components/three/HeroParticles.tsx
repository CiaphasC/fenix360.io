import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DeviceOrientationPermissionState = 'granted' | 'denied';
type DeviceOrientationEventConstructorWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<DeviceOrientationPermissionState>;
};

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

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
    const useGyroscopeInput = isTouchDevice && 'DeviceOrientationEvent' in window;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const isPointInsideRect = (x: number, y: number, rect: DOMRect) =>
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    const toNdc = (x: number, y: number, rect: DOMRect) => ({
      x: ((x - rect.left) / rect.width) * 2 - 1,
      y: -((y - rect.top) / rect.height) * 2 + 1,
    });

    let targetX = 0;
    let targetY = 0;
    let inputX = 0;
    let inputY = 0;

    let repulsionTargetX = 0;
    let repulsionTargetY = 0;
    let repulsionX = 0;
    let repulsionY = 0;
    let repulsionStrengthTarget = 0;
    let repulsionStrength = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountNode.getBoundingClientRect();
      if (!isPointInsideRect(event.clientX, event.clientY, rect)) {
        repulsionStrengthTarget = 0;
        return;
      }

      const point = toNdc(event.clientX, event.clientY, rect);
      repulsionTargetX = point.x;
      repulsionTargetY = point.y;
      repulsionStrengthTarget = 1;

      if (!useGyroscopeInput) {
        targetX = point.x;
        targetY = point.y;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return;
      }

      const touch = event.touches[0];
      const rect = mountNode.getBoundingClientRect();
      if (!isPointInsideRect(touch.clientX, touch.clientY, rect)) {
        repulsionStrengthTarget = 0;
        return;
      }

      const point = toNdc(touch.clientX, touch.clientY, rect);
      repulsionTargetX = point.x;
      repulsionTargetY = point.y;
      repulsionStrengthTarget = 1;

      if (!useGyroscopeInput) {
        targetX = point.x;
        targetY = point.y;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return;
      }

      const touch = event.touches[0];
      const rect = mountNode.getBoundingClientRect();
      if (!isPointInsideRect(touch.clientX, touch.clientY, rect)) {
        repulsionStrengthTarget = 0;
        return;
      }

      const point = toNdc(touch.clientX, touch.clientY, rect);
      repulsionTargetX = point.x;
      repulsionTargetY = point.y;
      repulsionStrengthTarget = 1;

      if (!useGyroscopeInput) {
        targetX = point.x;
        targetY = point.y;
      }
    };

    const handleTouchEnd = () => {
      repulsionStrengthTarget = 0;
    };

    const handleMouseLeave = () => {
      repulsionStrengthTarget = 0;
    };

    const maxTiltDegrees = 30;
    const gyroscopeSensitivity = 0.45;

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) {
        return;
      }

      const normalizedX = clamp(event.gamma / maxTiltDegrees, -1, 1);
      const normalizedY = clamp(event.beta / maxTiltDegrees, -1, 1);

      targetX = normalizedX * gyroscopeSensitivity;
      targetY = -normalizedY * gyroscopeSensitivity;
    };

    let permissionTouchHandler: (() => void) | null = null;

    if (useGyroscopeInput) {
      const orientationConstructor = window
        .DeviceOrientationEvent as unknown as DeviceOrientationEventConstructorWithPermission;

      if (typeof orientationConstructor.requestPermission === 'function') {
        permissionTouchHandler = () => {
          orientationConstructor
            .requestPermission?.()
            .then((permission) => {
              if (permission === 'granted') {
                window.addEventListener('deviceorientation', handleDeviceOrientation);
              }
            })
            .catch(() => {
              // Ignore permission errors and keep static camera input on unsupported/denied devices.
            });
        };

        window.addEventListener('touchstart', permissionTouchHandler, { once: true });
      } else {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    const clock = new THREE.Clock();
    let animationFrameId = 0;
    const repulsionRadius = isTouchDevice ? 42 : 34;
    const repulsionForce = isTouchDevice ? 10 : 9;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const inputSmoothing = useGyroscopeInput ? 0.05 : 0.12;
      inputX += (targetX - inputX) * inputSmoothing;
      inputY += (targetY - inputY) * inputSmoothing;
      repulsionX += (repulsionTargetX - repulsionX) * 0.16;
      repulsionY += (repulsionTargetY - repulsionY) * 0.16;
      repulsionStrength += (repulsionStrengthTarget - repulsionStrength) * 0.12;

      camera.position.x += (inputX * 16 - camera.position.x) * 0.05;
      camera.position.y += (inputY * 16 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const positionsArray = particles.geometry.attributes.position.array as Float32Array;
      const hasRepulsion = repulsionStrength > 0.01;
      const mouseWorldX = repulsionX * 100;
      const mouseWorldY = repulsionY * 50;

      for (let index = 0; index < particleCount; index += 1) {
        const i3 = index * 3;
        const baseX = originalPositions[i3] + Math.sin(elapsedTime * 0.55 + originalPositions[i3 + 1] * 0.05) * 5.8;
        const baseY = originalPositions[i3 + 1] + Math.cos(elapsedTime * 0.35 + originalPositions[i3] * 0.05) * 2.4;

        let finalX = baseX;
        let finalY = baseY;

        if (hasRepulsion) {
          const dx = mouseWorldX - baseX;
          const dy = mouseWorldY - baseY;
          const distance = Math.hypot(dx, dy);

          if (distance < repulsionRadius) {
            const force = ((repulsionRadius - distance) / repulsionRadius) * repulsionStrength;
            const angle = Math.atan2(dy, dx);
            finalX -= Math.cos(angle) * force * repulsionForce;
            finalY -= Math.sin(angle) * force * repulsionForce;
          }
        }

        positionsArray[i3] = finalX;
        positionsArray[i3 + 1] = finalY;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.04;

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
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (permissionTouchHandler) {
        window.removeEventListener('touchstart', permissionTouchHandler);
      }
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

  return <div ref={mountRef} className="hero-bg-parallax absolute inset-0 z-0 opacity-70 pointer-events-none mix-blend-screen" />;
}
