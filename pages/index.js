import React from "react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const imagesPath = [
    "/img/Characters/Human/Mountaineer/Export_male/male_5.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_6.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_1.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_7.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_8.png",
    "/img/Characters/Human/Mountaineer/Export_male/male_1.png"
  ]
  const [frame, setFrame] = React.useState(0)

  React.useEffect(() => {
      const handleAnimation = () => {
          setFrame(frame => (frame + 1) % imagesPath.length)
      }
      const interval = setInterval(handleAnimation, 150) // 300 ms is pretty short. Did you mean 3000?
      return () => clearInterval(interval)
  }, [])
 
  return (
    <>
      Walking man ^^
      <img src={imagesPath[frame]} />
    </>
  )
}
