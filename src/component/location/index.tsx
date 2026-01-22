import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용
            <br />
            <b>시크릿가든웨딩</b> 검색
             <br />
            - 전용 주차장을 이용하시면 편리합니다.
           </div>
          </div>
          <div />
          <div className="info-card">
            <div className="label">식사 안내</div>
            <div className="info-content">
              식사시간: 11시 30분 ~ 14시 00분
              <br />
              장소: 옆건물 1층 드레스 레스토랑
            </div>
          </div>
      </LazyDiv>
    </>
  )
}
