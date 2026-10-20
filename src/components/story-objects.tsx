import { useId } from 'react';

export function StoryObject({ kind, x = 0, y = 0 }: { kind: string; x?: number; y?: number }) {
  const id = useId().replace(/:/g, '');
  return <svg className={`object object-${kind}`} viewBox="0 0 220 240" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}glass`} x1="40" y1="30" x2="170" y2="160" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity=".9" /><stop offset=".3" stopColor="#d3c8b8" stopOpacity=".05" /><stop offset=".55" stopColor="#fff" stopOpacity=".8" /><stop offset=".7" stopColor="#a89175" stopOpacity=".13" /><stop offset="1" stopColor="#fff" stopOpacity=".9" /></linearGradient>
      <linearGradient id={`${id}metal`} x1="40" y1="25" x2="165" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#56381f" /><stop offset=".23" stopColor="#c98f52" /><stop offset=".43" stopColor="#ffedc2" /><stop offset=".51" stopColor="#795032" /><stop offset=".72" stopColor="#b87c42" /><stop offset="1" stopColor="#ead6b5" /></linearGradient>
      <radialGradient id={`${id}wine`} cx=".35" cy=".2" r=".9"><stop stopColor="#d08c6f" /><stop offset=".4" stopColor="#8f343b" /><stop offset="1" stopColor="#3b1d2d" /></radialGradient>
      <radialGradient id={`${id}fire`} cx=".55" cy=".7" r=".65"><stop stopColor="#fffaf0" /><stop offset=".3" stopColor="#ffdfa3" /><stop offset=".64" stopColor="#df9147" stopOpacity=".65" /><stop offset="1" stopColor="#b05d31" stopOpacity="0" /></radialGradient>
      <filter id={`${id}soft`}><feGaussianBlur stdDeviation="3" /></filter>
    </defs>
    {kind === 'glass' && <g className="glass-body">
      <ellipse cx="110" cy="216" rx="43" ry="7" fill="#675345" opacity=".09" filter={`url(#${id}soft)`} />
      <path d="M63 47C51 89 49 120 67 140Q85 157 107 159L107 202Q104 211 76 212Q62 219 110 220Q159 218 144 212Q117 211 114 202L114 159Q145 154 159 139C176 115 167 73 158 47" fill={`url(#${id}glass)`} stroke="#a18b70" strokeOpacity=".48" strokeWidth=".8" />
      <path className="wine-fill" d={`M58 ${104+x*.12}C82 ${93-y*.18} 137 ${114+y*.12} 165 ${104-x*.12}C166 139 144 154 112 157C78 153 59 138 58 ${104+x*.12}Z`} fill={`url(#${id}wine)`} opacity=".9" />
      <path className="wine-surface" d={`M58 ${104+x*.12}C82 ${91-y*.18} 137 ${94+y*.12} 165 ${104-x*.12}C142 ${116+y*.12} 80 ${114-y*.18} 58 ${104+x*.12}Z`} fill="#ab6054" stroke="#e3af97" strokeWidth=".7" />
      <path d="M68 59C61 84 60 112 72 130" stroke="white" strokeWidth="2" opacity=".8" /><path d="M151 62C158 85 160 117 150 132" stroke="white" strokeWidth=".7" opacity=".85" />
      <ellipse cx="110" cy="47" rx="47" ry="10" fill={`url(#${id}glass)`} stroke="#9e8e79" strokeWidth=".8" /><path d="M69 42Q105 32 148 42" stroke="white" strokeWidth="1.5" />
    </g>}
    {kind === 'flame' && <g>
      <ellipse cx="111" cy="209" rx="34" ry="6" fill="#a5794b" opacity=".09" filter={`url(#${id}soft)`} />
      <path className="flame-outer" d={`M${111+x*.65} ${24+y*.5}C${155+x*.3} ${73+y*.25} 173 133 134 164C109 187 64 160 76 127C${83+x*.3} 102 ${117+x*.7} ${87+y*.3} ${111+x*.65} ${24+y*.5}Z`} fill={`url(#${id}fire)`} />
      <path className="flame-core" d={`M${113+x*.4} ${72+y*.3}C${137+x*.2} 117 139 137 117 160C100 175 87 148 99 129C${109+x*.3} 113 ${118+x*.4} 99 ${113+x*.4} ${72+y*.3}Z`} fill="#fff8d8" opacity=".8" />
      <path d="M109 173L115 155" stroke="#5d4632" strokeWidth="2" /><path d="M87 175Q110 182 134 175L131 203Q108 210 90 203Z" fill={`url(#${id}glass)`} stroke="#9c8060" strokeOpacity=".4" /><ellipse cx="110" cy="175" rx="23" ry="5" fill="#ece5d6" stroke="#bba78e" strokeWidth=".5" />
    </g>}
    {kind === 'ring' && <g className="ring-body">
      <ellipse cx="107" cy="193" rx="51" ry="9" fill="#88644d" opacity=".08" filter={`url(#${id}soft)`} />
      <ellipse cx="109" cy="117" rx={57+x*.15} ry={66-y*.15} transform="rotate(-28 109 117)" stroke={`url(#${id}metal)`} strokeWidth="5" />
      <ellipse cx="110" cy="117" rx={54+x*.15} ry={65-y*.15} transform="rotate(-28 110 117)" stroke="#fff6dc" strokeWidth=".8" />
      <g className="ring-tag"><path d="m149 159 5 11" stroke="#8f6a46" strokeWidth="2" /><path d="M145 173Q157 164 169 176L178 194Q170 208 155 203L145 184Z" fill={`url(#${id}metal)`} stroke="#9b7654" strokeWidth=".5" /><circle cx="156" cy="176" r="2" fill="#ece4d8" /><path d="M160 191q3-6 7 0q3 5-3 6q-7 1-4-6Z" fill="#684c33" /><circle cx="155" cy="189" r="1.8" fill="#684c33" /><circle cx="159" cy="185" r="1.8" fill="#684c33" /><circle cx="164" cy="184" r="1.8" fill="#684c33" /><circle cx="169" cy="187" r="1.8" fill="#684c33" /></g>
    </g>}
    {kind === 'leaf' && <g className="leaf-body">
      <path className="leaf-left" d={`M111 194C75 169 65 158 58 141L75 140L48 ${109+y*.1}L70 111L${66+x*.1} 85L86 94L${88+x*.3} ${56+y*.3}L${106+x*.2} 73L${126+x*.5} ${28+y*.5}L${134+x*.3} ${72+y*.2}L${154+x*.4} ${57+y*.4}L${149+x*.3} 95L${169+x*.4} ${86+y*.3}L${160+x*.2} 119L${177+x*.3} ${117+y*.2}L151 148L160 150C151 170 128 182 111 194Z`} fill={`url(#${id}metal)`} opacity=".9" stroke="#9e683a" strokeWidth=".5" />
      <path d={`M105 218Q${115+x*.1} 155 ${126+x*.5} ${28+y*.5}M112 185L65 146M116 161L150 148M117 143L62 112M${119+x*.2} 126L${153+x*.3} 100M${121+x*.25} 105L${91+x*.3} ${69+y*.3}M${124+x*.4} ${78+y*.2}L${137+x*.3} ${69+y*.2}`} stroke="#f6dba7" strokeWidth=".85" />
      <path className="leaf-right" d={`M${126+x*.5} ${28+y*.5}C${132+x*.2} 93 105 150 111 194C128 182 151 170 160 150L151 148L${177+x*.3} ${117+y*.2}L${160+x*.2} 119L${169+x*.4} ${86+y*.3}L${149+x*.3} 95L${154+x*.4} ${57+y*.4}L${134+x*.3} ${72+y*.2}Z`} fill="#8c4a27" opacity=".23" />
    </g>}
  </svg>;
}
