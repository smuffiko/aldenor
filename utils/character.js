import cookie from "js-cookie"

export const setCharToken = token => {
  cookie.set("charId", token, { expires: 1, SameSite: 'None', secure: true })
}

export const unsetCharToken = () => {
  cookie.remove("charId")
}