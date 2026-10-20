export function MembraneFallback() {
  return (
    <svg className="membrane-fallback" viewBox="0 0 1000 760" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ribbon-warm" x1="200" y1="100" x2="800" y2="650" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f9e5bf" stopOpacity=".1" />
          <stop offset=".35" stopColor="#d68b39" stopOpacity=".5" />
          <stop offset=".62" stopColor="#fff9e7" stopOpacity=".75" />
          <stop offset="1" stopColor="#9b562c" stopOpacity=".4" />
        </linearGradient>
        <linearGradient id="ribbon-edge" x1="100" y1="130" x2="820" y2="620" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b37630" stopOpacity="0" /><stop offset=".5" stopColor="#b37630" /><stop offset="1" stopColor="#fffdf4" />
        </linearGradient>
        <clipPath id="ribbon-clip"><path d="M184 90C425 480 941 65 847 392C747 742 368 443 191 643C458 308 775 646 780 386C783 228 359 588 184 90Z" /></clipPath>
      </defs>
      <g clipPath="url(#ribbon-clip)">
        <image href="/references/approved-flyer.png" x="30" y="-930" width="1000" height="1650" opacity=".67" preserveAspectRatio="xMidYMax slice" />
        <path d="M0 0H1000V760H0Z" fill="url(#ribbon-warm)" />
      </g>
      <path d="M184 90C425 480 941 65 847 392C747 742 368 443 191 643C458 308 775 646 780 386C783 228 359 588 184 90Z" fill="url(#ribbon-warm)" stroke="url(#ribbon-edge)" strokeWidth="1.5" />
      <path d="M184 90C375 523 784 219 780 386C775 646 458 308 191 643" stroke="#fffdf5" strokeOpacity=".8" strokeWidth="2" />
    </svg>
  );
}
