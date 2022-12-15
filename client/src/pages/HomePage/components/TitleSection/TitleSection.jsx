import './TitleSection.scss'
export default function TitleSection({ title, styleGroup, styleText, styleBorder }) {
  return (
    <div style={{ ...styleGroup }} className='title-section'>
      <h2 className='title-section__text' style={{ ...styleText }}>
        {title}
      </h2>
      <div className='title-section__border' style={{ ...styleBorder }}></div>
    </div>
  )
}
