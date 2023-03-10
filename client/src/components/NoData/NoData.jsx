import './NoData.scss'
export default function NoData({ image, message, imageStyles, messageStyles }) {
  return (
    <div className='no-data'>
      {image && (
        <div className='no-data__image' style={{ ...imageStyles }}>
          <img src={image} alt='' />
        </div>
      )}
      <div className='no-data__message' style={{ ...messageStyles }}>
        {message}
      </div>
    </div>
  )
}
