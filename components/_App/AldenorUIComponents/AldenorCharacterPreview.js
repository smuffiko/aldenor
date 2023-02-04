const AldenorCharacterPreview = ({ basic, hair, size = 64, className, style }) => {
  return (
    <>
      <div className={`character-preview ${className}`} style={style}>
        <img src={basic} width={size} height={size} className="basic-char"/>
        <img src={hair} width={size} height={size} className="hair"/>
      </div>
    </>
  )
}
 
export default AldenorCharacterPreview