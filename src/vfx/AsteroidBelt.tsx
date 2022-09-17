import { useGLTF } from "@react-three/drei"
import { GroupProps } from "@react-three/fiber"
import { pipe } from "fp-ts/lib/function"
import { composable, modules } from "material-composer-r3f"
import {
  $,
  Add,
  GlobalTime,
  Input,
  InstanceID,
  Mat3,
  Mul,
  Pow,
  RotateY,
  Rotation3D,
  ScaleAndOffset,
  Vec3
} from "shader-composer"
import { Random } from "shader-composer-toybox"
import { DoubleSide, Material, Mesh } from "three"
import { InstanceSetupCallback } from "vfx-composer"
import { Emitter, Particles } from "vfx-composer-r3f"

export const AsteroidBelt = (props: GroupProps) => (
  <group {...props}>
    <SmallAsteroids amount={100_000} />
    <LargeAsteroids amount={10_000} />
  </group>
)

const SmallAsteroids = ({ amount = 10_000 }: { amount?: number }) => {
  const random = (offset: Input<"float">) =>
    Random($`${offset} + float(${InstanceID}) * 1.1005`)

  return (
    <Particles capacity={amount}>
      <planeGeometry />

      <composable.meshStandardMaterial side={DoubleSide} color="#333">
        <modules.Billboard />
        <modules.Scale scale={ScaleAndOffset(random(0.1), 0.1, 0.01)} />
        <BeltModules height={12} />
      </composable.meshStandardMaterial>

      <Emitter limit={amount} rate={Infinity} />
    </Particles>
  )
}

const LargeAsteroids = ({ amount = 10_000 }: { amount?: number }) => {
  /* Load our asteroid model. */
  const gltf = useGLTF("/models/asteroid03.gltf")
  const mesh = gltf.scene.children[0] as Mesh

  /* A small helper that will return pseudo-random numbers based off of
  the instance ID. */
  const random = (offset: Input<"float">) =>
    Random($`${offset} + float(${InstanceID}) * 7.3`)

  /* Determine the instance's rotation axis. */
  const rotationAxis = ScaleAndOffset(
    Vec3([random(12), random(84), random(1)]),
    2,
    -1
  )

  return (
    <Particles geometry={mesh.geometry} capacity={amount}>
      {/* We can hook into the material loaded from the GLTF. \o/ */}
      <composable.material instance={mesh.material as Material}>
        {/* Rotation */}
        <RotateOverTime
          axis={rotationAxis}
          speed={ScaleAndOffset(random(-5), 2, -1)}
        />

        {/* Scale */}
        <modules.Scale scale={ScaleAndOffset(Pow(random(1), 3), 0.3, 0.1)} />

        {/* Common Belt modules */}
        <BeltModules height={6} />
      </composable.material>

      {/* Emit all asteroids all at once. */}
      <Emitter limit={amount} rate={Infinity} />
    </Particles>
  )
}

type BeltProps = {
  width?: Input<"float">
  height?: Input<"float">
  distance?: Input<"float">
}

const BeltModules = ({ width = 40, distance = 15, height = 5 }: BeltProps) => {
  const random = (offset: Input<"float">) =>
    Random($`${offset} + float(${InstanceID}) * 1.1005`)

  const offset = Vec3([
    Add(Mul(random(0.2), width), distance),
    ScaleAndOffset(random(0.3), height, Mul(height, -0.5)),
    0
  ])

  const speed = ScaleAndOffset(Pow(random(0.25), 3), 0.05, 0.01)

  return (
    <modules.Translate
      offset={pipe(
        offset,
        (v) => RotateY(v, Mul(random(0.4), Math.PI * 2)),
        (v) => RotateY(v, Mul(GlobalTime, speed))
      )}
    />
  )
}

const RotateOverTime = ({
  axis = Vec3([0, 0, 1]),
  speed = 1
}: {
  axis: Input<"vec3">
  speed?: Input<"float">
}) => (
  <modules.Rotate rotation={Mat3(Rotation3D(axis, Mul(GlobalTime, speed)))} />
)
