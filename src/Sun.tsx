import { MeshProps } from "@react-three/fiber"
import { bitmask, Layers } from "render-composer"
import { Color } from "three"
import { store } from "./state"

export const Sun = (props: MeshProps) => {
  return (
    <mesh ref={(sun) => store.set({ sun })} {...props}>
      <directionalLight
        intensity={1.5}
        layers-mask={bitmask(Layers.Default, Layers.TransparentFX)}
      />
      <sphereGeometry args={[10]} />
      <meshBasicMaterial color={new Color("white").multiplyScalar(30)} />
    </mesh>
  )
}
