import {
  Environment,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei"
import { bitmask, Layers } from "render-composer"
import { Planet } from "./Planet"
import { Sun } from "./Sun"

export const Scene = () => {
  return (
    <group>
      <Planet position={[-10, 0, 0]} rotation={[0.5, 0.2, -0.3]} />
      <Sun position={[80, 15, -100]} />

      <OrbitControls />
      <PerspectiveCamera position={[0, 0, 62]} makeDefault />

      {/* Environment */}
      <Environment
        background="only"
        files={[
          "/textures/skybox/right.png",
          "/textures/skybox/left.png",
          "/textures/skybox/top.png",
          "/textures/skybox/bottom.png",
          "/textures/skybox/front.png",
          "/textures/skybox/back.png"
        ]}
      />

      {/* Lights */}
      <ambientLight
        intensity={0.05}
        layers-mask={bitmask(Layers.Default, Layers.TransparentFX)}
      />
    </group>
  )
}
