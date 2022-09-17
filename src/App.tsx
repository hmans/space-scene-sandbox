import { Loader } from "@react-three/drei"
import { Suspense } from "react"
import * as RC from "render-composer"
import { PostProcessing } from "./PostProcessing"
import { Scene } from "./Scene"

export default function App() {
  return (
    <>
      <Loader />
      <RC.Canvas dpr={1}>
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
