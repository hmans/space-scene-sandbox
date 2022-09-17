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
      <Environment preset="sunset" />

      <mesh>
        <icosahedronGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <OrbitControls />
    </group>
  )
}
