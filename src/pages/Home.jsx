export default function Home() {
  return (
  <>
    <div className="home">
      <div className="middle">
        <img className="logo" src="/LuridOrigins_Logo.png" />
        <h3>DARK MEDIA. DISTURBING ORIGINS</h3>
        <button>EXPLORE THE ORIGINS</button>
      </div>
      <ul className="menuTab">
        <li>
          <div className="ico">
            <img src='/skull.jpg'/>
          </div>
          <div className="txt">
            DARK ARTWORK
            <p>Original, haunting creations<br/> born from the abyss.</p>
          </div>
        </li>
        <li>
          <div className="ico">
            <img src='/eye.jpg'/>
          </div>
          <div className="txt">
            DISTURBING ORIGINS
            <p>Each piece tells a story.<br/>Uncover the truth.</p>
          </div>
        </li>
        <li>
          <div className="ico">
            <img src='/coffin.jpg'/>
          </div>
          <div className="txt">
            EXCLUSIVE MERCH
            <p>Wear the darkness.<br/>Limited drops.</p>
          </div>
        </li>
        <li>
          <div className="ico">
              <img src='/scythe.jpg'/>
          </div>
          <div className="txt">
            JOIN THE CULT
            <p>Be the first to know what lurks.</p>
          </div>
        </li>
      </ul>
      <div className="bottom">

      </div>
    </div>
  </>
  )
}