import TitleSection from '../../components/TitleSection'
import './Menu.scss'
import Slider from '@material-ui/core/Slider'
import { useState } from 'react'
import { Select, MenuItem } from '@material-ui/core'
import { useModal } from '../../hooks/useModal'
import DropdownBase from '../../components/DropdownBase/DropdownBase'
import { v4 as uuidv4 } from 'uuid'
import ProductItem from '../../components/ProductItem'
import Pagination from '../../components/Pagination/Pagination'

import ProductImage1 from '../../assets/images/product1.jpeg'
import ProductImage2 from '../../assets/images/product2.jpg'
import ProductImage3 from '../../assets/images/product3.jpg'
import ProductImage4 from '../../assets/images/product4.jfif'
import ProductImage5 from '../../assets/images/product5.jpg'
import ProductImage6 from '../../assets/images/product6.jpg'

export default function Menu() {
  // Our States
  const [value, setValue] = useState([50000, 700000])
  const { activeModalRef, open, rect, setOpen } = useModal()
  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setValue(newValue)
    // console.log(newValue)
  }
  return (
    <div className='menu'>
      <section className='menu-top'>
        <div className='mainWrapper container'>
          <TitleSection
            title='Lựa chọn sản phẩm'
            styleBorder={{ borderColor: '#ffffff' }}
            styleGroup={{ alignItems: 'center', paddingTop: '40px' }}
          ></TitleSection>
        </div>
      </section>
      <section className='products mainWrapper container'>
        <div className='products__filter'>
          <h3>Lọc sản phẩm</h3>
          <label htmlFor='menu-search'>Tìm kiếm sản phẩm</label>
          <input
            type='text'
            placeholder='Nhập nội dung cần tìm'
            id='menu-search'
            className='products__filter--search'
          />
          <label htmlFor='menu-search'>Giá sản phẩm</label>
          <Slider value={value} onChange={rangeSelector} valueLabelDisplay='auto' min={0} max={1000000} />
          <div className='employees-management__operation--role'>
            <label>Chọn loại sản phẩm</label>
            <span ref={activeModalRef}>{'Tất cả'}</span>
            {open && (
              <DropdownBase
                rect={rect}
                setOpen={setOpen}
                styleContent={{ position: 'absolute', transform: `translate(${window.scrollX}px,${window.scrollY}px)` }}
              >
                <div className='employee-management__operation--role-dropdown'>
                  {/* {roles.map((role) => {
                    if (role !== queryConfig?.role) {
                      return (
                        <span key={uuidv4()} >
                          {role}
                        </span>
                      )
                    }
                    return null
                  })} */}
                </div>
              </DropdownBase>
            )}
          </div>
          <div className='employees-management__operation--rating'>
            <label>Đánh giá sản phẩm</label>
            <span>⭐⭐⭐⭐⭐</span>
            <span>⭐⭐⭐⭐ trở lên</span>
            <span>⭐⭐⭐ trở lên</span>
            <span>⭐⭐ trở lên</span>
            <span>⭐ trở lên</span>
          </div>
        </div>
        <div className='products__wrapper'>
          <div className='products__wrapper--list'>
            {[...Array(1).keys()].map((item) => {
              return (
                <>
                  <ProductItem image={ProductImage1} name='Gạo lứt Rong Biển' price='100,000' unit='Hộp' />
                  <ProductItem image={ProductImage2} name='BISCOTTI VỊ TRÀ XANH' price='85,000' unit='Hộp' />
                  <ProductItem image={ProductImage3} name='TEMPEH TƯƠNG NÉN' price='100,000' unit='Gói' />
                  <ProductItem image={ProductImage4} name='BÁNH MÌ NGŨ CỐC' price='100,000' unit='Hộp' />
                  <ProductItem image={ProductImage5} name='05 GÓI CƠM GẠO LỨC ĂN LIỀN' price='100,000' unit='Gói' />
                  <ProductItem image={ProductImage6} name='06 GÓI ỨC GÀ ĂN LIỀN' price='199,000' unit='Gói' />
                </>
              )
            })}
          </div>
          <Pagination
            pageSize={10}
            stylePagination={{ margin: '20px 20px 20px auto', width: 'max-content' }}
          ></Pagination>
        </div>
      </section>
    </div>
  )
}
