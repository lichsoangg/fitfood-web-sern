import './NoData.scss'
export default function NoData({ image, message, imageStyles, messageStyles, children, style }) {
  return (
    <div className='no-data' style={{ ...style }}>
      {image && (
        <div className='no-data__image' style={{ ...imageStyles }}>
          <img src={image} alt='' />
        </div>
      )}
      <div className='no-data__message' style={{ ...messageStyles }}>
        {message ? message : children}
      </div>
    </div>
  )
}
