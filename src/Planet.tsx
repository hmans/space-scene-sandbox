import { composable, Layer, modules } from "material-composer-r3f"
import { Fresnel, Vec3 } from "shader-composer"
import { Color } from "three"
import { AsteroidBelt } from "./vfx/AsteroidBelt"
import { Nebula } from "./vfx/Nebula"

export const Planet = () => {
  return (
    <group position={[0, 0, 0]} rotation={[0.8, 0.2, -0.3]}>
      {/* Some funky clouds! */}
      <Nebula
        dimensions={Vec3([40, 10, 40])}
        amount={60}
        opacity={0.4}
        rotationSpeed={0.05}
        minSize={10}
        maxSize={20}
        color={new Color("#fff").multiplyScalar(15)}
      />

      {/* The asteroid belt. */}
      <AsteroidBelt />

      {/* The actual planet */}
      <mesh scale={10}>
        <sphereGeometry args={[1, 32, 32]} />

        <composable.meshStandardMaterial metalness={0.5} roughness={0.6}>
          {/* Base color of the planet */}
          <modules.Color color={new Color("#543")} />

          {/* Fresnel effect */}
          <Layer opacity={Fresnel({ power: 3 })}>
            <modules.Color color={new Color("white").multiplyScalar(2)} />
          </Layer>
        </composable.meshStandardMaterial>
      </mesh>
    </group>
  )
}
