import { BRIDE_INFO, GROOM_INFO } from "../../const"
import { STATIC_ONLY } from "../../env"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { useState } from "react"
import kakaoIcon from "../../icons/kakaopay.png"

export const Information1 = () => {
  return (
    <>
      <h2 className="english">Information</h2>
      <div className="info-card">
        <div className="label">식사 안내</div>
        <div className="content">
          식사시간: 11시 30분 ~ 14시 00분
          <br />
          장소: 옆건물 1층 드레스 레스토랑
        </div>
      </div>
    </>
  )
}

export const Information2 = () => {
  const [tab, setTab] = useState("groom") // groom | bride

  const data = tab === "groom" ? GROOM_INFO : BRIDE_INFO

  return (
    <div className="info-card donation-card">
      <div className="label">마음 전하기</div>

      <div className="content">
        참석이 어려워 
        <br />
        직접 축하해주지 못하는 분들을 위해
        <br />
        계좌번호를 기재하였습니다.
        <br />
        넓은 마음으로 양해 부탁드립니다.
      </div>

      {/* 탭 */}
      <div className="donation-tabs">
        <button
          className={tab === "groom" ? "active" : ""}
          onClick={() => setTab("groom")}
        >
          신랑측 계좌번호 보기
        </button>

        <button
          className={tab === "bride" ? "active" : ""}
          onClick={() => setTab("bride")}
        >
          신부측 계좌번호 보기
        </button>
      </div>

      {/* 계좌 카드 */}
      <div className="donation-list">
        {data
          .filter(({ account }) => !!account)
          .map(({ relation, name, account, kakaopay }) => (
            <div className="donation-item" key={relation}>
              <div>
                <div className="name">
                  {relation} {name}
                </div>
                <div className="account">{account}</div>
              </div>
              <div className="donation-buttons">
                {kakaopay && (
                  <button className="kakaopay-icon-btn" onClick={() => window.open(kakaopay, "_blank")}>
                 <img src={kakaoIcon} alt="kakaoIcon-icon" />
                </button>
                )}

              <Button
                className="copy-button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(account)
                    alert("복사되었습니다.")
                  } catch {
                    alert("복사 실패")
                  }
                }}
              >
                복사
              </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export const Information = () => {
  if (STATIC_ONLY) {
    return (
      <>
        <LazyDiv className="card information">
          <Information1 />
        </LazyDiv>
        <LazyDiv className="card information">
          <Information2 />
        </LazyDiv>
      </>
    )
  }

  return (
    <LazyDiv className="card information">
      {/* 식사안내 주석처리
      <Information1 />
      */}
      <Information2 />
    </LazyDiv>
  )
}
