import './BannerItem.scss'
export default function BannerItem({ image, children }) {
  return (
    <div className='banner-item'>
      <div className='banner-item__image'>
        <img src={image} alt='Banner' />
      </div>
      <div className='banner-item__content'>{children}</div>
    </div>
  )
}
