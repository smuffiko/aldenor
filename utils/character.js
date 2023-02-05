import cookie from "js-cookie"

export const setCharToken = token => {
  cookie.set("charId", token, { sameSite: 'None', secure: true })
}
export const unsetCharToken = () => {
  cookie.remove("charId")
}