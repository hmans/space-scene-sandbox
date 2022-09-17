import { Environment, OrbitControls } from "@react-three/drei"

export const Scene = () => {
  return (
    <group>
      <Environment preset="sunset" />
      <OrbitControls />
      <mesh>
        <icosahedronGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}
