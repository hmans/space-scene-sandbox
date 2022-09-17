import { useTexture } from "@react-three/drei"
import * as RC from "render-composer"
import { useStore } from "statery"
import { store } from "./state"

export const PostProcessing = () => {
  const { sun } = useStore(store)
  const texture = useTexture("/textures/lensdirt.jpg")

  return (
    <RC.EffectPass>
      <RC.SMAAEffect />
      <RC.SelectiveBloomEffect
        intensity={3}
        luminanceSmoothing={0.3}
        luminanceThreshold={0.8}
      />
      {sun && <RC.GodRaysEffect lightSource={sun} />}
      <RC.LensDirtEffect texture={texture} />
    </RC.EffectPass>
  )
}
