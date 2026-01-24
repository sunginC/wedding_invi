import CarIcon from "../../icons/car-icon.svg?react"
import nmapIcon from "../../icons/nmap-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import { LazyDiv } from "../lazyDiv"
import { MAP } from "../../images"
import { LOCATION, LOCATION_ADDRESS, NMAP_PLACE_ID } from "../../const"
import { useEffect, useRef, useState } from "react"
import { KakaoNaviButton } from "./KakaoNaviButton"

declare global {
  interface Window {
    kakao: any;
  }
}

export const Location = () => {
  const [mapType, setMapType] = useState<"image" | "kakao">("image")
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const scriptLoaded = useRef(false)

  const checkDevice = () => {
    const ua = navigator.userAgent
    if (ua.match(/(iPhone|iPod|iPad)/)) return "ios"
    if (ua.match(/(Android)/)) return "android"
    return "other"
  }

  // Kakao 지도 초기화
  const initKakaoMap = () => {
    if (!mapContainer.current || mapInstance.current) return
      const map = new window.kakao.maps.Map(mapContainer.current, {
      center: new window.kakao.maps.LatLng(36.347359, 127.291194),
      level: 4,
    })

    new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(36.347359, 127.291194),
      title: "시크릿가든웨딩",
    })

    mapInstance.current = map
    console.log("✅ 카카오 지도 초기화 완료")
  }

  useEffect(() => {
    if (mapType !== "kakao") return
    if (!mapContainer.current) return
    if (mapInstance.current) {
    // 이미 초기화된 지도면 재생성하지 않음
    return
    }

    // SDK가 없으면 동적 로드
    if (!window.kakao || !window.kakao.maps) {
      if (!scriptLoaded.current) {
        const script = document.createElement("script")
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=8716403b82dbcdb30a93de4569477bd2&autoload=false`
        script.async = true
        script.onload = () => {
          scriptLoaded.current = true
          window.kakao.maps.load(initKakaoMap)
        }
        script.onerror = () => console.error("Kakao SDK 로드 실패")
        document.head.appendChild(script)
      } else {
        window.kakao.maps.load(initKakaoMap)
      }
    } else {
      window.kakao.maps.load(initKakaoMap)
    }
  }, [mapType])

  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>

        {/* 지도 탭 */}
        <div className="map-tab" style={{ display: "flex", gap: 8, marginBottom: 10, zIndex: 10 }}>
          <button
            style={{
              flex: 1,
              padding: "8px 0",
              border: "1px solid #ddd",
              background: mapType === "image" ? "#333" : "#fff",
              color: mapType === "image" ? "#fff" : "#000",
              borderRadius: 6,
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
              borderRadius: 6,
              cursor: "pointer",
            }}
            onClick={() => setMapType("kakao")}
          >
            지도
          </button>
        </div>

        {/* 지도 영역 (겹치게 표시 + 페이드) */}
        <div
          className="map-view"
          style={{
            width: "100%",
            height: 300,
            marginBottom: 16,
            position: "relative",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {/* 약도 이미지 */}
          <img
            src={MAP}
            alt="약도"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              transition: "opacity 2s ease",
              opacity: mapType === "image" ? 1 : 0,
              pointerEvents: mapType === "image" ? "auto" : "none",
            }}
          />

          {/* 카카오 지도 */}
          <div
            ref={mapContainer}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              transition: "opacity 2s ease",
              opacity: mapType === "kakao" ? 1 : 0,
              pointerEvents: mapType === "kakao" ? "auto" : "none",
              zIndex: mapType === "kakao" ? 5 : 0,
            }}
          />
        </div>

        {/* 주소 */}
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>

        {/* 버튼 영역 */}
        <div className="map-bg" style={{ display: "flex", gap: 8, marginTop: 16 }}>
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
            네이버 지도, 카카오 내비, 티맵 등 이용
            <br />
            <b>시크릿가든웨딩</b> 검색
            <br />
            - 전용 주차장을 이용하시면 편리합니다.
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
