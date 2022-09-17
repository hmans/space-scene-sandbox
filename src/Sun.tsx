import { bitmask, Layers } from "render-composer"
import { Color } from "three"
import { store } from "./state"

export const Sun = () => {
  return (
    <mesh ref={(sun) => store.set({ sun })} position={[80, 15, -100]}>
      <directionalLight
        intensity={1.5}
        layers-mask={bitmask(Layers.Default, Layers.TransparentFX)}
      />
      <sphereGeometry args={[10]} />
      <meshBasicMaterial color={new Color("white").multiplyScalar(30)} />
    </mesh>
  )
}
