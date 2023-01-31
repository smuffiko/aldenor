import React from "react"

const AldenorGCMenuItem = React.memo(({ children, style }) => {
  return (
    <>
      <div className={`gc-menu-item-${Math.floor(Math.random() * 4) + 1}-bg`}>
        <div className={`gc-menu-item-${Math.floor(Math.random() * 5) + 1}`}>
          <button type="button" style={style}>{children}</button>
        </div>
      </div>
   </>
  )
})
 
export default AldenorGCMenuItem