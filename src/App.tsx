import { Loader } from "@react-three/drei"
import { Suspense } from "react"
import * as RC from "render-composer"
import { Scene } from "./Scene"

function App() {
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

export default App
