import './Help.scss'
import helpImage from '../../assets/images/help.png'
import { useModal } from '../../hooks/useModal'
import ModalBase from '../ModalBase'
import CheckboxCircle from '../CheckboxCircle'
import { AcceptButton } from '../Buttons/Buttons'
import { SuccessNotify } from '../Notify/Notify'
export default function Help({ position }) {
  const { activeModalRef, open, setOpen } = useModal()
  const handleClickHelp = () => {
    SuccessNotify(
      <span>
        Yêu cầu trợ giúp thành công! <br />
        Bạn vui lòng đợi phản hồi nhé
      </span>,
      10000
    )
  }
  return (
    <div className='help' style={{ ...position }} ref={activeModalRef}>
      <div className='help__image'>
        <img src={helpImage} alt='help' />
      </div>
      <div className='help__text'>Trợ giúp</div>
      {open && (
        <ModalBase styleContent={{ width: '1100px', height: 'max-content' }} setOpen={setOpen}>
          <div className='help__content'>
            <h3>Trợ giúp</h3>
            <span>Chọn vấn đề cần trợ giúp</span>
            <div className='filter'>
              <CheckboxCircle />
              <span>Tài khoản</span>
            </div>
            <div className='filter'>
              <CheckboxCircle />
              <span>Chức năng</span>
            </div>
            <div className='filter'>
              <CheckboxCircle />
              <span>Vấn đề khác</span>
            </div>
            <textarea cols='30' rows='10' placeholder='Nhập vấn đề bạn cần trợ giúp...'></textarea>
            <AcceptButton onClick={handleClickHelp}>Gửi yêu cầu trợ giúp</AcceptButton>
          </div>
        </ModalBase>
      )}
    </div>
  )
}
