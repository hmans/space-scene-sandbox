import { Environment, Loader, OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { Suspense, useEffect } from "react"
import * as RC from "render-composer"
import { CubeTextureLoader } from "three"

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
      <Skybox />

      <mesh>
        <icosahedronGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <OrbitControls />
    </group>
  )
}

export const Skybox = () => {
  const { scene } = useThree()

  useEffect(() => {
    const urls = [
      "/textures/skybox/right.png",
      "/textures/skybox/left.png",
      "/textures/skybox/top.png",
      "/textures/skybox/bottom.png",
      "/textures/skybox/front.png",
      "/textures/skybox/back.png"
    ]

    const cube = new CubeTextureLoader().load(urls)

    scene.background = cube
  }, [])

  return null
}
