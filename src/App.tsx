import { Environment, Loader, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import * as RC from "render-composer"
import { AsteroidBelt } from "./vfx/AsteroidBelt"

export default function App() {
  return (
    <>
      <Loader />
      <RC.Canvas>
        <RC.RenderPipeline>
          <Suspense>
            <PostProcessing />
            <Scene />
          </Suspense>
        </RC.RenderPipeline>
      </RC.Canvas>
    </>
  )
}

const PostProcessing = () => {
  return (
    <RC.EffectPass>
      <RC.SMAAEffect />
      <RC.SelectiveBloomEffect
        intensity={5}
        luminanceSmoothing={0.5}
        luminanceThreshold={0.95}
      />
      <RC.VignetteEffect />
    </RC.EffectPass>
  )
}

const Scene = () => {
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
      <ambientLight intensity={0.1} />
      <directionalLight position={[300, 10, -40]} intensity={0.5} />

      <AsteroidBelt />

      <mesh>
        <icosahedronGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <OrbitControls />
    </group>
  )
}
