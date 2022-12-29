import { AcceptButton, InputButton, MainButton } from "../../components/Buttons/Buttons"
import { SuccessNotify } from "../../components/Notify/Notify"
import "./Backup.scss"
export default function Backup() {
  const handleBackup = () => {
    SuccessNotify(<span>Sao lưu thành công</span>, 10000)
  }
  return (
    <div className="backup">
      <h4>Sao lưu phục hồi</h4>
      <div className="backup-operation">
        {/* <span className="body2">Vui lòng chọn đường dẫn sao lưu file Backup:</span> */}
        <span className="body2">Đường dẫn lưu file Backup đã chọn là: /Desktop/Folder/Backup/backup.bak</span>
        {/* <InputButton style={{ width: "30%" }}>Chọn đường dẫn</InputButton> */}
        <div className="group-button">
          <InputButton style={{ width: "30%" }}>Thay đổi đường dẫn</InputButton>
          <AcceptButton style={{ width: "15%" }} onClick={handleBackup}>Sao lưu</AcceptButton>
        </div>

      </div>
    </div>
  )
}
