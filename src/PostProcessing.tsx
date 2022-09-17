import { useTexture } from "@react-three/drei"
import { useControls } from "leva"
import * as RC from "render-composer"
import { useStore } from "statery"
import { store } from "./state"

export const PostProcessing = () => {
  const { sun } = useStore(store)
  const texture = useTexture("/textures/lensdirt.jpg")

  const controls = useControls("Post Processing", {
    smaa: true,
    bloom: true,
    godRays: true,
    lensDirt: true
  })

  return (
    <RC.EffectPass>
      {controls.smaa && <RC.SMAAEffect />}
      {controls.bloom && (
        <RC.SelectiveBloomEffect
          intensity={3}
          luminanceSmoothing={0.3}
          luminanceThreshold={0.8}
        />
      )}
      {controls.godRays && sun && <RC.GodRaysEffect lightSource={sun} />}
      {controls.lensDirt && <RC.LensDirtEffect texture={texture} />}
    </RC.EffectPass>
  )
}
