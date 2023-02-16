import React from "react"
import { Icon } from "semantic-ui-react"
import AldenorMessage from "../components/_App/AldenorUIComponents/AldenorMessage"
import AldenorSegment from "../components/_App/AldenorUIComponents/AldenorSegment"

export default function Home({user}) {
  return (
    <>
      <div className="home-container">
        <AldenorSegment className="home-segment">
        <h1>Welcome!</h1>
        </AldenorSegment>
        <AldenorSegment className="home-segment">
          <AldenorMessage><h2>Who are we?</h2></AldenorMessage>
            <p>We are two friends, smuffiko & Tesak. We know each other from 2010 or so, both of us are intrested in the IT world. Smuffiko likes more coding, Tesak likes more drawing. Both of us like playing games. But now, we don't just want to play games, we want to <b>make</b> games! Well, Tesak already made <a href="https://www.tesaks.com/" target="_blank">few games</a> and now we are making this project in the world of Aldenor.</p>
            <h3>About smuffiko</h3>
            <p>My name is Lucie, I am 26 years old and I live in the Czech Republic. I graduated in 2015 at Computer Science. After school I went to work, but it wasn't work in IT. It was warehouse and McDonald's, so yea, I know how to cook a fries or make a Big Mac. You can have a question why I didn't found an IT job, when I liked it and I wasn't bad at it? Well, life said I can't. I was completly lost inside. I wanted to turn off my brain and just make a money, and I didn't care what I will do. But life goes on and I found a motivation, or I think so. We moved 350km and I start new life, I had more time for myself. I didn't work anywhere, I watched different courses and I learnt something new almost every day for like 2 years. From summer 2022 there was an idea to make this game and from that time we are continuously working. I'm trying to work everyday, or just think about it, but there are days when I need to prioritize stuff from real life.</p>
            <p>Whole web is currently written by me, smuffiko. Due to my bad hearing from my born, I couldn't learn English language propertly. At school I was good student, but English? Nah. I liked math. Over time I learned English at WOW and other games. So, before release you can find at this web anything... :D </p>
            <p>If intrested, you can check my <a href="https://www.linkedin.com/in/lucie-pol%C3%A1chov%C3%A1-082543215/" target="_blank">LinkedIn <Icon name="linkedin"/></a> or <a href="https://github.com/smuffiko" target="_blank">github <Icon name="github"/></a>. </p>
            <h3>About Tesak</h3>
            <p>Hey yo! I am Tesak and I like games of all kinds. It doesn't matter if it's PC, Mobile, Console or tabletop I will play them all. It's my love for games that led me on a career path of game developer and I somehow ended up founding my own company to make that dream become reality.</p>
            <p>I very much enjoy being just writer and graphics designer for Founders of Aldenor as programming is not exactly what I enjoy the most about game development.</p>
            <p>To mention bit more about me I am also writer and self proclaimed youtuber with many hobbies. Please visit my  <a href="https://www.tesaks.com/" target="_blank">website</a> to learn more.</p>
        </AldenorSegment>
        <AldenorSegment className="home-segment">
          <AldenorMessage>
            <h2>Paths and privilegies</h2>
            <p>Your account role is: <b>{user ? user.role : "unsigned"}</b>. You can test yourself by visiting pages below. If you have access for more or less than it is written below, contact us as soon as possible with screenshot and short description. Thank you very much for helping with developing this game! :)</p>
          </AldenorMessage>
            <AldenorMessage>
            <h2>Type of users</h2>
            </AldenorMessage>
          <ol>
            <li>account role - unsigned - everyone who is not signed in</li>
            <li>account role - ban - user who is banned</li>
            <li>account role - unUser - user without email confirmed</li>
            <li>account role - user - basic user</li>
            <li>character role - mod - user with some privilegies - moderate chat, tickets?</li>
            <li>character role - admin - user with more privilegies - moderate chat, manage users, tickets</li>
            <li>character role - root - user who can add new admins, manage game (for example manage maps, quests,... -&gt; something like UI for devs)</li>
          </ol>
            <AldenorMessage>
              <h2>Paths</h2>
              <p>First thing to say, some pages has access only if you are logged in with character. Why? Well, we want to hide your login nick so you can use name of character. As mod, admin or root you can "play" the game, but you will solve tickets too. Maybe in future there will be option that only one character will have mod/admin/root privilegies, but I don't know yet. It is in my mind now and it can be changed... Just be patient for now please, there will be maybe some changes in the future :)</p>          
            </AldenorMessage>
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
        </AldenorSegment>
      </div>
    </>
  )
}
