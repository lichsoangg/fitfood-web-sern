import { Helmet } from 'react-helmet-async'

import TitleSection from '../../components/TitleSection'
import FaqsItem from './components/FaqsItem'
import { faqss } from './constants'
import './FaqsPage.scss'
import { v4 as uuidv4 } from 'uuid'
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
      <Helmet>
        {/* HTML Meta Tags */}
        <title>FAQS - Fitfood</title>
        <meta name='description' content='Chính sách dịch vụ hỗ trợ khách hàng tại Fitfood' />
        {/* Google / Search Engine Tags */}
        <meta itemProp='name' content='FAQS - Fitfood' />
        <meta itemProp='description' content='Chính sách dịch vụ hỗ trợ khách hàng tại Fitfood' />
        <meta itemProp='image' content='https://api.fitfood.kd14.me/images/help.png' />
        {/* Facebook Meta Tags */}
        <meta property='og:url' content='https://www.fitfood.kd14.me' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='FAQS - Fitfood' />
        <meta property='og:description' content='Chính sách dịch vụ hỗ trợ khách hàng tại Fitfood' />
        <meta property='og:image' content='https://api.fitfood.kd14.me/images/help.png' />
        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='FAQS - Fitfood' />
        <meta name='twitter:description' content='Chính sách dịch vụ hỗ trợ khách hàng tại Fitfood' />
        <meta name='twitter:image' content='https://api.fitfood.kd14.me/images/help.png' />
      </Helmet>
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
                  key={uuidv4()}
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
