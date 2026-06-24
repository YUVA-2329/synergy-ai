import { GLOBE_NODES } from "@/lib/constants";

export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

export function getNodePositions(radius: number) {
  return GLOBE_NODES.map((node) => ({
    ...node,
    position: latLngToVector3(node.lat, node.lng, radius),
  }));
}

export function getConnectionPairs(nodeCount: number, maxConnections: number) {
  const pairs: [number, number][] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (Math.random() > 0.55) {
        pairs.push([i, j]);
      }
      if (pairs.length >= maxConnections) return pairs;
    }
  }
  return pairs;
}

// Seeded random for stable connections across renders
export function getStableConnections(count: number) {
  const pairs: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
    [5, 7],
    [6, 8],
    [7, 9],
    [0, 4],
    [1, 6],
    [2, 8],
    [3, 9],
    [5, 8],
  ];
  return pairs.filter(([a, b]) => a < count && b < count);
}
