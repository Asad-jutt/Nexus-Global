import * as THREE from 'three';
import { DataPoint3D } from '../../types';

export class DataViz3DObject {
  public group: THREE.Group;
  private bars: THREE.Mesh[] = [];
  private benchmarkBars: THREE.Mesh[] = [];
  private trendLine: THREE.Line | null = null;
  private targetHeights: number[] = [];
  private currentHeights: number[] = [];
  private barMaterials: THREE.MeshPhysicalMaterial[] = [];

  constructor() {
    this.group = new THREE.Group();
  }

  public updateData(dataPoints: DataPoint3D[], colorHex: string = '#00f0ff') {
    // Clear old bars
    while (this.group.children.length > 0) {
      const obj = this.group.children[0];
      if (obj instanceof THREE.Mesh) obj.geometry.dispose();
      this.group.remove(obj);
    }
    this.bars = [];
    this.benchmarkBars = [];
    this.targetHeights = [];
    this.currentHeights = [];
    this.barMaterials = [];

    const barWidth = 0.6;
    const spacing = 1.4;
    const totalWidth = (dataPoints.length - 1) * spacing;
    const startX = -totalWidth / 2;

    const baseColor = new THREE.Color(colorHex);

    dataPoints.forEach((pt, i) => {
      const x = startX + i * spacing;

      // Primary Metric Bar (Height proportional to value)
      const maxVal = 200;
      const targetH = Math.max(0.2, (pt.value / maxVal) * 4.0);
      this.targetHeights.push(targetH);
      this.currentHeights.push(0.1); // Start low for grow animation

      const barGeom = new THREE.BoxGeometry(barWidth, 1.0, barWidth);
      // Shift origin to bottom so scale.y grows upward
      barGeom.translate(0, 0.5, 0);

      const mat = new THREE.MeshPhysicalMaterial({
        color: baseColor,
        emissive: baseColor,
        emissiveIntensity: 0.3,
        metalness: 0.8,
        roughness: 0.2,
        transmission: 0.4,
        transparent: true,
        opacity: 0.9,
      });
      this.barMaterials.push(mat);

      const barMesh = new THREE.Mesh(barGeom, mat);
      barMesh.position.set(x, 0, 0);
      barMesh.scale.y = 0.1;
      barMesh.userData = { index: i, dataPoint: pt };

      this.group.add(barMesh);
      this.bars.push(barMesh);

      // Benchmark ghost bar behind primary bar
      const bmH = (pt.benchmark / maxVal) * 4.0;
      const bmGeom = new THREE.BoxGeometry(barWidth * 0.8, bmH, barWidth * 0.8);
      bmGeom.translate(0, bmH / 2, 0);

      const bmMat = new THREE.MeshBasicMaterial({
        color: 0x475569,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });

      const bmMesh = new THREE.Mesh(bmGeom, bmMat);
      bmMesh.position.set(x, 0, -0.6);
      this.group.add(bmMesh);
      this.benchmarkBars.push(bmMesh);
    });

    // Create 3D grid floor under chart
    const gridHelper = new THREE.GridHelper(dataPoints.length * 2, dataPoints.length * 2, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = 0;
    this.group.add(gridHelper);
  }

  public update(delta: number) {
    // Animate height growth toward target
    this.bars.forEach((bar, i) => {
      const target = this.targetHeights[i] || 0.1;
      this.currentHeights[i] += (target - this.currentHeights[i]) * 0.08;
      bar.scale.y = this.currentHeights[i];
    });

    // Subtle gentle float for the chart group
    this.group.rotation.y = Math.sin(Date.now() * 0.001) * 0.08;
  }

  public highlightBar(index: number) {
    this.barMaterials.forEach((mat, i) => {
      if (i === index) {
        mat.emissiveIntensity = 0.9;
        mat.opacity = 1.0;
      } else {
        mat.emissiveIntensity = 0.2;
        mat.opacity = 0.6;
      }
    });
  }

  public dispose() {
    this.bars.forEach((b) => b.geometry.dispose());
    this.barMaterials.forEach((m) => m.dispose());
  }
}
