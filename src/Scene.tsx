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

      <OrbitControls />
      <PerspectiveCamera position={[0, 0, 75]} makeDefault />

      <Planet rotation={[0.8, 0.2, -0.3]} />
      <Sun position={[80, 15, -100]} />
    </group>
  )
}
