import './TestimonialItem.scss'
export default function TestimonialItem({ children, avatar, name, job }) {
  return (
    <div className='testimonial-item'>
      <p className='testimonial-item__content'>{children}</p>
      <div className='testimonial-item__info'>
        <div className='testimonial-item__info--left'>
          <img src={avatar} alt='Customer' />
        </div>
        <div className='testimonial-item__info--right'>
          <h5>{name}</h5>
          <span>{job}</span>
        </div>
      </div>
    </div>
  )
}
