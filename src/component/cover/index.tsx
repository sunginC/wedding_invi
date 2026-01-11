import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { COVER_IMAGE } from "../../images"
import { LazyDiv } from "../lazyDiv"


export const Cover = () => {
  return (
    <LazyDiv className="cover">
      <div className="image-wrapper">
        <img src={COVER_IMAGE} alt="sample" />
      </div>
    </LazyDiv>
  )
}
