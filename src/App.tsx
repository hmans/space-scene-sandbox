import { Environment, Loader, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import * as RC from "render-composer"

export default function App() {
  return (
    <>
      <Loader />
      <RC.Canvas>
        <RC.RenderPipeline>
          <Suspense>
            <Scene />
          </Suspense>
        </RC.RenderPipeline>
      </RC.Canvas>
    </>
  )
}

const Scene = () => {
  return (
    <group>
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

      <ambientLight intensity={0.1} />
      <directionalLight position={[300, 10, -40]} intensity={0.5} />

      <mesh>
        <icosahedronGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <OrbitControls />
    </group>
  )
}
