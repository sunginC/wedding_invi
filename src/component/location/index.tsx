import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import { LazyDiv } from "../lazyDiv"
import { MAP } from "../../images"
import { LOCATION, LOCATION_ADDRESS, NMAP_PLACE_ID, KMAP_PLACE_ID,WEDDING_HALL_POSITION} from "../../const"
import { useEffect, useState } from "react"
import { KakaoNaviButton } from "./KakaoNaviButton"

 const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) {
      return "ios"
    } else if (userAgent.match(/(Android)/)) {
      return "android"
    } else {
      return "other"
    }
  }

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
         <img src={MAP}  alt="map"/>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <div className="map-bg">

        <button className="map-btn" onClick={() => {  switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
                break
              default:
                window.open(
                  `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          <span>네이버 지도</span>
        </button>

         <KakaoNaviButton
            name="식장"
            x={127.291194}
            y={36.347359}
          />

        <button className="map-btn" onClick={() => {  switch (checkDevice()) {
              case "ios":
              case "android": {
                window.open(`tmap://route?goalname=시크릿가든웨딩&goalx=127.291194&goaly=36.347359`, "_self")
                break
              }
              default: {
                alert("모바일에서 확인하실 수 있습니다.")
                break
            }
          }
        }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          <span>티맵</span>
        </button>
       </div>
        
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
