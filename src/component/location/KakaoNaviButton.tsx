import { useEffect } from "react"
import knaviIcon from "../../icons/knavi-icon.png"

declare global {
  interface Window {
    Kakao: any
  }
}

interface Props {
  name: string
  x: number  // 경도
  y: number  // 위도
}

export const KakaoNaviButton = ({ name, x, y }: Props) => {
  useEffect(() => {
    if (!window.Kakao) return

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_SDK_JS_KEY)
    }
  }, [])

  const openKakaoNavi = () => {
    if (!window.Kakao || !window.Kakao.Navi) {
      alert("카카오 SDK 로딩 중입니다. 잠시 후 다시 시도해주세요.")
      return
    }

    window.Kakao.Navi.start({
      name,
      x,
      y,
      coordType: "wgs84",
    })
  }

  return (
    <button className="map-btn" onClick={openKakaoNavi}>
      <img src={knaviIcon} alt="kakao-navi-icon" />
      카카오 내비
    </button>
  )
}
