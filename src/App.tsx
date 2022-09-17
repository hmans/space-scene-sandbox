import {
  Environment,
  Loader,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei"
import { composable, Layer, modules } from "material-composer-r3f"
import { Suspense } from "react"
import * as RC from "render-composer"
import { Fresnel } from "shader-composer"
import { makeStore, useStore } from "statery"
import { Color, Mesh } from "three"
import { AsteroidBelt } from "./vfx/AsteroidBelt"

export const store = makeStore({
  sun: null as Mesh | null
})

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
  const { sun } = useStore(store)

  return (
    <RC.EffectPass>
      <RC.SMAAEffect />
      <RC.SelectiveBloomEffect
        intensity={5}
        luminanceSmoothing={0.5}
        luminanceThreshold={0.95}
      />
      {sun && <RC.GodRaysEffect lightSource={sun} />}
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
      <ambientLight intensity={0.05} />

      {/* The Planet */}
      <group rotation={[0.5, 0.5, -0.5]}>
        <mesh scale={1}>
          <sphereGeometry args={[1, 32, 32]} />

          <composable.meshStandardMaterial metalness={0.5} roughness={0.6}>
            <modules.Color color={new Color("hotpink")} />

            <Layer opacity={Fresnel({ intensity: 10 })}>
              <modules.Color color={new Color("white").multiplyScalar(3)} />
            </Layer>
          </composable.meshStandardMaterial>
        </mesh>

        <AsteroidBelt />
      </group>

      <mesh ref={(sun) => store.set({ sun })} position={[-80, 20, -100]}>
        <directionalLight intensity={1.5} />
        <sphereGeometry args={[10]} />
        <meshBasicMaterial color="white" />
      </mesh>

      <OrbitControls />
      <PerspectiveCamera position={[0, 0, 100]} makeDefault />
    </group>
  )
}
