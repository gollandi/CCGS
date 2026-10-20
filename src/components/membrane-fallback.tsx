export function MembraneFallback(){
  return <svg className="membrane-fallback" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="sheet-face" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fffdf4" stopOpacity=".35"/><stop offset=".55" stopColor="#fffdf4" stopOpacity=".07"/><stop offset="1" stopColor="#b4a393" stopOpacity=".12"/></linearGradient><linearGradient id="sheet-fold"><stop stopColor="#fffdf4" stopOpacity="0"/><stop offset=".4" stopColor="#fffdf4" stopOpacity=".85"/><stop offset="1" stopColor="#fffdf4" stopOpacity=".2"/></linearGradient></defs>
    <path d="M35 -85C340 62 670 382 975 676C700 723 340 488 35 -85Z" fill="url(#sheet-face)"/>
    <path d="M35 -85C340 62 670 382 975 676" fill="none" stroke="#a78d73" strokeOpacity=".5" strokeWidth=".7" vectorEffect="non-scaling-stroke"/>
    <path d="M35 -85C340 243 670 548 975 676M35 -85C340 488 700 723 975 676" fill="none" stroke="url(#sheet-fold)" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/>
  </svg>;
}
