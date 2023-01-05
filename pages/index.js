import React from "react"
import styles from "../styles/AldenorUI/FillBars.module.css"

export default function Home() {
  const imagesPath1 = [
    "/img/Characters/Human/Mountaineer/Export_male/male_5.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_6.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_1.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_7.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_8.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_1.png"
  ]
  const imagesPath2 = [
    "/img/Characters/Human/Mountaineer/Export_male/male_5.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_6.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_7.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_8.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_1.png"
  ]
  const imagesPath3 = [
    "/img/Characters/Human/Mountaineer/Export_male/male_5.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_6.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_7.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_8.png"
  ]
  const [frame1, setFrame1] = React.useState(0)
  const [frame2, setFrame2] = React.useState(0)
  const [frame3, setFrame3] = React.useState(0)
  const [range, setRange] = React.useState(150)

  const energyBarImages = [
    "/img/UI/FillBars/EnergyBar/FB_EP_S1.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_S2.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_S3.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_M1.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_E1.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_E2.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_E3.png"
  ]
  const hpBarImages = [
    "/img/UI/FillBars/HpBar/FB_HP_S1.png",
    "/img/UI/FillBars/HpBar/FB_HP_S2.png",
    "/img/UI/FillBars/HpBar/FB_HP_S3.png",
    "/img/UI/FillBars/HpBar/FB_HP_M1.png",
    "/img/UI/FillBars/HpBar/FB_HP_E1.png",
    "/img/UI/FillBars/HpBar/FB_HP_E2.png",
    "/img/UI/FillBars/HpBar/FB_HP_E3.png"
  ]
  const expBarImages = [
    "/img/UI/FillBars/ExpBar/FB_EXP_S1.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_S2.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_S3.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_M1.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_E1.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_E2.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_E3.png"
  ]

  const [bar, setBar] = React.useState(20)

  React.useEffect(() => {
    const handleAnimation = () => {
      setFrame1(frame => (frame + 1) % imagesPath1.length)
      setFrame2(frame => (frame + 1) % imagesPath2.length)
      setFrame3(frame => (frame + 1) % imagesPath3.length)
    }
    const interval = setInterval(handleAnimation, range)
    const barAnimation = () => {
      setBar(prev=>prev+1 > 100 ? 0 : prev+1)
    }
    const barInterval = setInterval(barAnimation, 100)
    return () => { clearInterval(interval); clearInterval(barInterval) }
  }, [])
 
  return (
    <>
      <div>
        Walking man ^^
        <img src={imagesPath1[frame1]} style={{paddingLeft:"6em"}} />
        <img src={imagesPath2[frame2]} style={{paddingLeft:"6em"}} />
        <img src={imagesPath3[frame3]} style={{paddingLeft:"6em"}} />
        <br />
        3rd won! - 5 6 7 8, speed 150ms
      </div>
      <div>
        HP Bar test
        <br/>
        {bar === 0 ? "DEAD" : (
          <>
            {bar} % HP
            <div className={styles.fillBarBg} style={{position:"relative"}}>
              <img src={hpBarImages[0]} />
              {bar > 1 && <img src={hpBarImages[1]} />}
              {bar > 2 && <img src={hpBarImages[2]} />}
              {bar > 6 && [...Array(bar-6)].map((e, i) => <img key={i} src={hpBarImages[3]} />)}
              {bar > 3 && <img src={hpBarImages[4]} />}
              {bar > 4 && <img src={hpBarImages[5]} />}
              {bar > 5 && <img src={hpBarImages[6]} />}
            </div>
          </>
        )
        }
      </div>
      <div>
        Energy Bar test
        <br/>
        {bar === 0 ? "WITHOUT ENERGY" : (
          <>
            {bar} % Energy
            <div className={styles.fillBarBg} style={{position:"relative"}}>
              <img src={energyBarImages[0]} />
              {bar > 1 && <img src={energyBarImages[1]} />}
              {bar > 2 && <img src={energyBarImages[2]} />}
              {bar > 6 && [...Array(bar-6)].map((e, i) => <img key={i} src={energyBarImages[3]} />)}
              {bar > 3 && <img src={energyBarImages[4]} />}
              {bar > 4 && <img src={energyBarImages[5]} />}
              {bar > 5 && <img src={energyBarImages[6]} />}
            </div>
          </>
        )
        }
      </div>
      <div>
        EXP Bar test
        <br/>
        {bar === 0 ? "NO EXP" : (
          <>
            {bar} % Exp
            <div className={styles.fillBarBg} style={{position:"relative"}}>
              <img src={expBarImages[0]} />
              {bar > 1 && <img src={expBarImages[1]} />}
              {bar > 2 && <img src={expBarImages[2]} />}
              {bar > 6 && [...Array(bar-6)].map((e, i) => <img key={i} src={expBarImages[3]} />)}
              {bar > 3 && <img src={expBarImages[4]} />}
              {bar > 4 && <img src={expBarImages[5]} />}
              {bar > 5 && <img src={expBarImages[6]} />}
            </div>
          </>
        )
        }
      </div>
    </>
  )
}
