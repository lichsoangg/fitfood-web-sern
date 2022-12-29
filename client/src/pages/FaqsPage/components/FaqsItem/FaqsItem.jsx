import './FaqsItem.scss'
export default function FaqsItem({ children, title, descriptions, handleClickOpenItem }) {
  return (
    <div className='faqs-item'>
      <div className='faqs-item__title' onClick={handleClickOpenItem}>
        {title}
      </div>
      <div className='faqs-item__content-list'>
        {descriptions &&
          descriptions.map((description) => {
            return (
              <p className='faqs-item__content-list--item' key={description.id}>
                {description.content}
              </p>
            )
          })}
      </div>
      <div className='faqs-item__icon'>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10.528 6.46731C10.2338 6.17573 9.75889 6.17784 9.46731 6.47204C9.17573 6.76624 9.17784 7.24111 9.47204 7.53269L11.235 9.28C11.9505 9.98914 12.4413 10.4772 12.7734 10.8907C13.096 11.2924 13.2067 11.5504 13.2361 11.7815C13.2546 11.9266 13.2546 12.0734 13.2361 12.2185C13.2067 12.4496 13.096 12.7076 12.7734 13.1093C12.4413 13.5228 11.9505 14.0109 11.235 14.72L9.47204 16.4673C9.17784 16.7589 9.17573 17.2338 9.46731 17.528C9.75889 17.8222 10.2338 17.8243 10.528 17.5327L12.3227 15.7539C12.9987 15.084 13.5511 14.5364 13.9429 14.0485C14.3504 13.5412 14.6453 13.0263 14.7241 12.4082C14.7586 12.1371 14.7586 11.8629 14.7241 11.5918C14.6453 10.9737 14.3504 10.4588 13.9429 9.95146C13.5511 9.46359 12.9987 8.91604 12.3227 8.24609L10.528 6.46731Z'
            fill='#141414'
          />
        </svg>
      </div>
    </div>
  )
}
