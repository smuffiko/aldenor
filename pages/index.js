import React from "react"

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

  React.useEffect(() => {
    const handleAnimation = () => {
      setFrame1(frame => (frame + 1) % imagesPath1.length)
      setFrame2(frame => (frame + 1) % imagesPath2.length)
      setFrame3(frame => (frame + 1) % imagesPath3.length)
    }
    const interval = setInterval(handleAnimation, range)
    return () => clearInterval(interval)
  }, [])
 
  return (
    <>
      Walking man ^^
      <img src={imagesPath1[frame1]} style={{paddingLeft:"6em"}} />
      <img src={imagesPath2[frame2]} style={{paddingLeft:"6em"}} />
      <img src={imagesPath3[frame3]} style={{paddingLeft:"6em"}} />
      <br />
      3rd won! - 5 6 7 8, speed 150ms
    </>
  )
}
