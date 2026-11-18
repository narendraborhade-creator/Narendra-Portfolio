import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HologramCanvasProps {
  themeColor?: string;
  threatLevel?: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
}

export const HologramCanvas: React.FC<HologramCanvasProps> = ({
  themeColor = '#00f3ff',
  threatLevel = 'NORMAL'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Pick base color according to threat level or theme
    let hexColor = themeColor;
    if (threatLevel === 'CRITICAL') hexColor = '#ff1744';
    else if (threatLevel === 'ELEVATED') hexColor = '#ffaa00';

    const baseColor = new THREE.Color(hexColor);

    // Group for all holographic elements
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // 1. Inner Core: Wireframe Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: baseColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    hologramGroup.add(coreMesh);

    // 2. Inner Glowing Nucleus: Dodecahedron
    const nucGeo = new THREE.DodecahedronGeometry(0.9, 0);
    const nucMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const nucMesh = new THREE.Mesh(nucGeo, nucMat);
    hologramGroup.add(nucMesh);

    // 3. Orbital HUD Ring 1 (X/Z plane)
    const ring1Geo = new THREE.RingGeometry(2.2, 2.25, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: baseColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    hologramGroup.add(ring1);

    // 4. Orbital HUD Ring 2 (Tilted with notches)
    const ring2Geo = new THREE.RingGeometry(2.6, 2.64, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: baseColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    hologramGroup.add(ring2);

    // 5. Orbital HUD Ring 3 (Outer scan ring)
    const ring3Geo = new THREE.RingGeometry(3.0, 3.03, 32);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: baseColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    hologramGroup.add(ring3);

    // 6. Holographic Data Cloud / Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: baseColor,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    hologramGroup.add(particleSystem);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation
      hologramGroup.rotation.y = elapsed * 0.2 + mouseX;
      hologramGroup.rotation.x = mouseY * 0.6;

      // Core independent rotations
      coreMesh.rotation.y += delta * 0.3;
      coreMesh.rotation.z += delta * 0.15;

      nucMesh.rotation.x -= delta * 0.4;
      nucMesh.rotation.y += delta * 0.5;

      // Orbital rings rotation
      ring1.rotation.z += delta * 0.5;
      ring2.rotation.z -= delta * 0.3;
      ring3.rotation.x += delta * 0.2;

      // Pulse size slightly
      const pulse = 1 + Math.sin(elapsed * 2) * 0.04;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Particle system gentle swirl
      particleSystem.rotation.y -= delta * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      coreGeo.dispose();
      coreMat.dispose();
      nucGeo.dispose();
      nucMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [themeColor, threatLevel]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] relative pointer-events-none select-none"
    />
  );
};
