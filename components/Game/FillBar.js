const FillBar = ({ img, current, max, name }) => {
  const percent = name!==undefined ? 0 : Math.round(100*current/max)
  return (
    <>
      <div className="fill-bar">
        <div className="fill-bar-text">{name!==undefined?name:`${current}/${max}`}</div>
        {percent!==0 && (
          <>
            <img src={img[0]} />
            {percent > 1 && <img src={img[1]} />}
            {percent > 2 && <img src={img[2]} />}
            {percent > 6 && [...Array(percent-6)].map((e, i) => <img key={i} src={img[3]} />)}
            {percent > 3 && <img src={img[4]} />}
            {percent > 4 && <img src={img[5]} />}
            {percent > 5 && <img src={img[6]} />}
          </>
        )}
      </div>
    </>
  )
}
 
export default FillBar