import React from "react"
import { Message, Segment } from "semantic-ui-react"
import styles from "../styles/AldenorUI/FillBars.module.css"

export default function Home({user}) {
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
      </div>
      <div>
        Energy Bar test
        <br/>
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
      </div>
      <div>
        EXP Bar test
        <br/>
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
      </div>
      <br />
      <div style={{backgroundImage: "url('/img/UI/Panel/Panel_1.png", width:"60px", height:"60px", textAlign:"center"}}>
        <br />
        <img src="/img/UI/Coins/Coin_B.png" />
        <img src="/img/UI/Coins/Coin_S.png" />
        <img src="/img/UI/Coins/Coin_G.png" />
      </div>
      <hr />
      <Segment>
        <Message color="blue">
          <Message.Header>Paths and privilegies</Message.Header>
          <Message.Content>Your role is: <b>{user ? user.role : "unsigned"}</b>. You can test yourself by visiting these pages. If you have access for more or less than it is written below, contact us as soon as possible with screenshot and short description. Thank you very much for helping with developing this game! :)</Message.Content>
        </Message>
        <Message color="violet">
          <Message.Header>Type of users</Message.Header>
        </Message>
        <ol>
          <li>unsigned</li>
          <li>ban - user who is banned</li>
          <li>unUser - user without email confirmed</li>
          <li>user - basic user</li>
          <li>mod - user with some privilegies - moderate chat, tickets?</li>
          <li>admin - user with more privilegies - moderate chat, manage users, tickets</li>
          <li>root - user who can add new admins, manage game (for example manage maps, quests,... -&gt; something like GUI for devs)</li>
        </ol>
        <Message color="violet">
          <Message.Header>Paths</Message.Header>
          <Message.Content>First thing to say, some pages has access only if you are logged in with character. Why? Well, we want to hide your login nick so you can use name of character. As mod, admin or root you can "play" the game, but you will solve tickets too. Maybe in future there will be option that only one character will have mod/admin/root privilegies, but I don't know yet. It is in my mind now and it can be changed... Just be patient for now please, there will be maybe some changes in the future :)</Message.Content>
        </Message>
        <ul> 
          <li><a href="/">/</a> - homepage [1, 2, 3, 4, 5, 6, 7]</li>
          <li><a href="/401">/401</a> - unauthorized page [1, 2, 3, 4, 5, 6, 7]</li>
          <li><a href="/404">/404</a> - page not found [1, 2, 3, 4, 5, 6, 7]</li>
          <li><a href="/adminTools">/adminTools</a> - admin tools page, users management [6]
            <br/>* you have access there only if cookie charId is set, otherwise you should be redirected back to /characters</li>
          <li><a href="/characters">/characters</a> - page for choose/create characters [2, 3, 4, 5, 6, 7]</li>
          <li><a href="/confirm">/confirm</a> - confirm email page [1, 3???]</li>
          <li><a href="/contact">/contact</a> - contact form [1, 2, 3, 4, 5, 6, 7]</li>
          <li><a href="/game">/game</a> - game itself [2, 3, 4, 5, 6, 7]
            <br/>* you have access there only if cookie charId is set, otherwise you should be redirected back to /characters
            <br/>*2 can see annoying message/popup that he has ban
            <br/>*3 can only see annoying message/popup to confirm email first</li>
          <li><a href="/gameManag">/gameManag</a> - root tools for game management [7]
            <br/>* you have access there only if cookie charId is set, otherwise you should be redirected back to /characters</li>
          <li><a href="/gameShop">/gameShop</a> - same data as /shop page, but ingame... ???  [4, 5, 6, 7]
            <br/>* you have access there only if cookie charId is set, otherwise you should be redirected back to /characters</li>
          <li><a href="/lostPw">/lostPw</a> - form for reset lost password [1]</li>
          <li><a href="/privacy">/privacy</a> - privacy policy [1, 2, 3, 4, 5, 6, 7]</li>
          <li><a href="/settings">/settings</a> - account settings [2, 3, 4, 5, 6, 7]</li>
          <li><a href="/shop">/shop</a> - shop page [4, 5, 6, 7]</li>
          <li><a href="/signin">/signin</a> - signin page (log in) [1]</li>
          <li><a href="/signup">/signup</a> - signup page (register) [1]</li>
          <li><a href="/staffManag">/staffManag</a> - root page for adding new admins/mods [7]
            <br/>* you have access there only if cookie charId is set, otherwise you should be redirected back to /characters</li>
          <li><a href="/terms">/terms</a> - terms and conditions [1, 2, 3, 4, 5, 6, 7]</li>
          <li><a href="/ticket">/ticket</a> - ticket [2, 3, 4, 5, 6, 7????]
            <br/>* you have access there only if cookie charId is set, otherwise you should be redirected back to /characters</li>
        </ul>
      </Segment>
    </>
  )
}
