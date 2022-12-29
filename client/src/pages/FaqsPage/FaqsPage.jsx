import TitleSection from '../../components/TitleSection'
import FaqsItem from './components/FaqsItem'
import { faqss } from './constants'
import './FaqsPage.scss'

export default function FaqsPage() {
  const handleClickOpenItem = (e) => {
    const previousActiveFaqs = document.querySelector('.faqs-item__content-list-active')
    const activeFaqs = e.target.nextSibling

    activeFaqs.style.maxHeight = `${activeFaqs.scrollHeight}px`
    activeFaqs.classList.add('faqs-item__content-list-active')
    if (previousActiveFaqs) {
      previousActiveFaqs.style.maxHeight = `0px`
      previousActiveFaqs.classList.remove('faqs-item__content-list-active')
    }
  }
  return (
    <div className='faqs'>
      <div className='mainWrapper container'>
        <TitleSection title='FAQS' styleText={{ color: '#141414' }}></TitleSection>
        <p className='faqs-description'>
          Bạn muốn trải nghiệm Fitfood nhưng không biết bắt đầu từ đâu? Hãy tham khảo những câu hỏi thường gặp bên dưới.
        </p>
        <div className='faqs-list'>
          {faqss &&
            faqss.map((faqs) => {
              return (
                <FaqsItem
                  title={faqs.title}
                  handleClickOpenItem={handleClickOpenItem}
                  descriptions={faqs.descriptions}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
