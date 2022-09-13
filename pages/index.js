import React from "react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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
  const [frame1, setFrame1] = React.useState(0)
  const [frame2, setFrame2] = React.useState(0)

  React.useEffect(() => {
      const handleAnimation = () => {
        setFrame1(frame => (frame + 1) % imagesPath1.length)
        setFrame2(frame => (frame + 1) % imagesPath2.length)
      }
      const interval = setInterval(handleAnimation, 150)
      return () => clearInterval(interval)
  }, [])
 
  return (
    <>
      Walking man ^^
      <img src={imagesPath1[frame1]} />
      <img src={imagesPath2[frame2]} />
    </>
  )
}
