import dateIcon from '../../assets/icons/calendar.png'
import ProductImage_1 from '../../assets/images/ProductAvatar_1.png'
import ProductImage_16 from '../../assets/images/ProductAvatar_16.png'
import ProductImage_21 from '../../assets/images/ProductAvatar_21.png'
import { AcceptButton } from '../../components/Buttons/Buttons'
import CheckboxCircle from '../../components/CheckboxCircle'
import './ReportRevenue.scss'

let indexproductid = 1
const data = [
  {
    ProductID: indexproductid++,
    Name: 'Gói FIT 1',
    Revenue: '1.200.000',
    Image: ProductImage_16
  },
  {
    ProductID: indexproductid++,
    Name: 'Nước Mát Thảo Mộc',
    Revenue: '700.000',
    Image: ProductImage_1
  },

  {
    ProductID: indexproductid++,
    Name: 'Gói chay',
    Revenue: '600.000',
    Image: ProductImage_21
  }
]
export default function ReportRevenue() {
  return (
    <div className='report-revenue'>
      <h4>Báo cáo doanh thu</h4>
      <div className='report-revenue-operation'>
        <div className='top'>
          <div className='formInput'>
            <input
              type='text'
              className='formInput__input'
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              placeholder=' '
              autoComplete='off'
            />
            <span className='formInput__placeHolder'>Chọn ngày bắt đầu</span>
            <div className='formInput__icon'>
              <img src={dateIcon} alt='' />
            </div>
          </div>
          <div className='formInput'>
            <input
              type='text'
              className='formInput__input'
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              placeholder=' '
              autoComplete='off'
            />
            <span className='formInput__placeHolder'>Chọn ngày kết thúc</span>
            <div className='formInput__icon'>
              <img src={dateIcon} alt='' />
            </div>
          </div>
        </div>
        <div className='bottom'>
          <div className='filter'>
            <CheckboxCircle />
            <span>Báo cáo theo nhân viên</span>
            <div className='formInput'>
              <input type={'text'} className='formInput__input' placeholder=' ' autoComplete='off' />
              <span className='formInput__placeHolder'>Mã nhân viên</span>
            </div>
          </div>
          <div className='filter'>
            <CheckboxCircle />
            <span>Báo cáo theo khách hàng</span>
            <div className='formInput'>
              <input type={'text'} className='formInput__input' placeholder=' ' autoComplete='off' />
              <span className='formInput__placeHolder'>Mã khách hàng</span>
            </div>
          </div>
        </div>
        <AcceptButton>Xuất báo cáo</AcceptButton>
      </div>
      <div className='report-revenue-main'>
        <h3>
          Doanh thu từ ngày 1/8/2022 đến ngày 15/8/2022 của Nhật Hoàng là:{' '}
          <strong style={{ color: '#ff2033' }}>
            <hr />
            2.500.000
          </strong>
        </h3>
        <hr />
        <h4> Báo cáo chi tiết hàng hoá đóng góp vào doanh thu</h4>
        <div className='employees-management__table-wrapper'>
          <div className='employees-management__table'>
            {/* table data */}
            {data &&
              data.map((product) => {
                return (
                  <div key={product?.ID} className='employees-management__table--row'>
                    <div className='table-data table-data-center'>{product.ProductID}</div>
                    <div className='table-data'>
                      <div className='table-data__image-name'>
                        <img src={product.Image} alt={`Fitfood ${product?.Name}`} />
                        <span>{product.Name}</span>
                      </div>
                    </div>
                    <div className='table-data table-data-center'>{product.Revenue}</div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
