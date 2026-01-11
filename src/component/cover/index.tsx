import { useState } from "react"
import { PLACEHOLDER_IMAGE } from "../../images"
import { COVER_IMAGE } from "../../images"
import { LazyDiv } from "../lazyDiv"


export const Cover = () => {
   const [loaded, setLoaded] = useState(false)

  return (
    <LazyDiv className="cover">
      <div className="image-wrapper">

        {!loaded && <div className="skeleton" />}

        <img className={`placeholder ${loaded ? "fade-out" : ""}`}
          src={PLACEHOLDER_IMAGE}
          alt="blur placeholder"
        />
         <img className={`real-image ${loaded ? "show" : ""}`}
          src={COVER_IMAGE}
          alt="cover"
          onLoad={() => setLoaded(true)}
        />

      </div>
    </LazyDiv>
  )
}
