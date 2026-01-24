import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import nmapIcon from "../../icons/nmap-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import { LazyDiv } from "../lazyDiv"
import { MAP } from "../../images"
import { LOCATION, LOCATION_ADDRESS, NMAP_PLACE_ID, WEDDING_HALL_POSITION } from "../../const"
import { useEffect, useRef, useState } from "react"
import { KakaoNaviButton } from "./KakaoNaviButton"

declare global {
  interface Window {
    kakao: any
  }
}

export const Location = () => {
  const [mapType, setMapType] = useState<"image" | "kakao">("image")
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  const checkDevice = () => {
    const ua = navigator.userAgent
    if (ua.match(/(iPhone|iPod|iPad)/)) return "ios"
    if (ua.match(/(Android)/)) return "android"
    return "other"
  }

  useEffect(() => {
    if (mapType !== "kakao") return
    if (!mapContainer.current) return

    const initializeMap = () => {
      if (!window.kakao || !mapContainer.current) return

      // 이전 지도 제거
      if (mapInstance.current) {
        mapInstance.current.destroy()
        mapInstance.current = null
      }

      const map = new window.kakao.maps.Map(mapContainer.current, {
        center: new window.kakao.maps.LatLng(WEDDING_HALL_POSITION[1], WEDDING_HALL_POSITION[0]),
        level: 3,
        draggable: true,
        scrollwheel: true,
      })

      new window.kakao.maps.Marker({
        position: map.getCenter(),
        map,
      })

      map.relayout()
      mapInstance.current = map
    }

    const tryInit = () => {
      if (mapContainer.current && mapContainer.current.offsetParent !== null) {
        initializeMap()
      } else {
        setTimeout(tryInit, 100)
      }
    }

    if (!window.kakao) {
      const script = document.createElement("script")
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false"
      script.async = true
      script.onload = () => window.kakao.maps.load(tryInit)
      document.head.appendChild(script)
    } else {
      window.kakao.maps.load(tryInit)
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy()
        mapInstance.current = null
      }
    }
  }, [mapType])

  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>

        {/* 지도 탭 */}
        <div className="map-tab" style={{ display: "flex", gap: "8px", marginBottom: "10px", zIndex: 10 }}>
          <button
            style={{
              flex: 1,
              padding: "8px 0",
              border: "1px solid #ddd",
              background: mapType === "image" ? "#333" : "#fff",
              color: mapType === "image" ? "#fff" : "#000",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => setMapType("image")}
          >
            약도
          </button>
          <button
            style={{
              flex: 1,
              padding: "8px 0",
              border: "1px solid #ddd",
              background: mapType === "kakao" ? "#333" : "#fff",
              color: mapType === "kakao" ? "#fff" : "#000",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => setMapType("kakao")}
          >
            카카오지도
          </button>
        </div>

        {/* 지도 영역 */}
        <div className="map-view" style={{ width: "100%", height: "300px", marginBottom: "16px" }}>
          {mapType === "image" && <img src={MAP} alt="약도" style={{ width: "100%", height: "100%", borderRadius: "8px" }} />}
          {mapType === "kakao" && <div ref={mapContainer} style={{ width: "100%", height: "100%", borderRadius: "8px" }} />}
        </div>

        {/* 주소 */}
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>

        {/* 버튼 영역 */}
        <div className="map-bg" style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          <button
            className="map-btn"
            onClick={() => {
              const device = checkDevice()
              if (device === "ios" || device === "android") window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
              else window.open(`https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`, "_blank")
            }}
          >
            <img src={nmapIcon} alt="naver-map-icon" />
            <span>네이버 지도</span>
          </button>

          <KakaoNaviButton name="시크릿가든웨딩" x={127.291194} y={36.347359} />

          <button
            className="map-btn"
            onClick={() => {
              const device = checkDevice()
              if (device === "ios" || device === "android") {
                window.open(`tmap://route?goalname=시크릿가든웨딩&goalx=127.291194&goaly=36.347359`, "_self")
              } else {
                alert("모바일에서 확인하실 수 있습니다.")
              }
            }}
          >
            <img src={tmapIcon} alt="t-map-icon" />
            <span>티맵</span>
          </button>
        </div>
      </LazyDiv>

      {/* 자가용 안내 카드 */}
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
