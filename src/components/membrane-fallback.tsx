export function MembraneFallback(){
  return <svg className="membrane-fallback" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="film-light" x1="0" y1="0" x2=".25" y2="1"><stop stopColor="#fffaf0" stopOpacity=".22"/><stop offset=".45" stopColor="#fffaf0" stopOpacity=".025"/><stop offset="1" stopColor="#fffaf0" stopOpacity=".20"/></linearGradient>
      <radialGradient id="photo-fade"><stop stopColor="white" stopOpacity=".32"/><stop offset="1" stopColor="black"/></radialGradient>
      <mask id="film-photo"><rect width="1000" height="650" fill="url(#photo-fade)"/></mask>
    </defs>
    <image href="/images/chelsea/restaurant.jpg" x="180" y="26" width="860" height="585" preserveAspectRatio="xMidYMid slice" mask="url(#film-photo)"/>
    <path d="M-80-115C280 135 570 166 1080 365L1080 643C670 436 260 321-80 103Z" fill="url(#film-light)"/>
    <path d="M-80-115C280 135 570 166 1080 365M-80 103C260 321 670 436 1080 643" fill="none" stroke="#a88c6e" strokeOpacity=".32" strokeWidth=".8"/>
    <path d="M-80-113C280 137 570 168 1080 367M-80 101C260 319 670 434 1080 641" fill="none" stroke="#fffdf7" strokeOpacity=".9" strokeWidth="1.5"/>
  </svg>;
}
