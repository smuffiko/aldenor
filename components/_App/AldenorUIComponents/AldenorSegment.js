const AldenorSegment = ({ children }) => {
  return (
    <>
      <div className="segment">
        <svg>
          <filter id="wavy2">
            <feTurbulence x="0" y="0" baseFrequency="0.0075" numOctaves="4" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="100" />
          </filter>
        </svg>
        <div className="segment-children">{children}</div>
      </div>
    </>
  )
}
 
export default AldenorSegment