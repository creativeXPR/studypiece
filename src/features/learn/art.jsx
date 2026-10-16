// Illustrations and card icons for tutorials, drawn as SVG so they follow the theme.
// Fills come from CSS classes (tut-f-*), never literal colours. Content files refer to
// these by name (`art: 'hall'`, `icon: 'force'`) through <Art> and <CardIcon>.

function Person({ x, base, cloth = 'tut-f-c1', skin = 'tut-f-skin1', s = 1 }) {
  return (
    <g transform={`translate(${x} ${base}) scale(${s})`}>
      <path d="M-30 0 C-30 -40 -18 -52 0 -52 C18 -52 30 -40 30 0Z" className={`${cloth} tut-s`} />
      <circle cx="0" cy="-72" r="20" className={`${skin} tut-s`} />
      <circle cx="-7" cy="-74" r="2.2" className="tut-f-ink" />
      <circle cx="7" cy="-74" r="2.2" className="tut-f-ink" />
      <path d="M-6 -64 Q0 -60 6 -64" className="tut-s" fill="none" />
    </g>
  );
}

function Stars({ pts }) {
  return pts.map(([x, y], i) => (
    <circle key={i} cx={x} cy={y} r="1.7" className="tut-f-star tut-twinkle" style={{ animationDelay: `${i * 0.37}s` }} />
  ));
}

function Hall() {
  const lit = [0, 2, 3, 5, 7, 8, 10, 13, 15, 16];
  const wins = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 6; c++)
      wins.push(
        <rect key={`${r}${c}`} x={92 + c * 32} y={82 + r * 26} width="18" height="15" rx="2"
          className={lit.includes(r * 6 + c) ? 'tut-f-yellow' : 'tut-f-win'} />,
      );
  return (
    <svg viewBox="0 0 360 210" className="tut-ill" role="img" aria-label="A hall of residence at night with an Elections Friday banner">
      <rect width="360" height="210" className="tut-f-sky" />
      <Stars pts={[[30, 30], [62, 18], [110, 40], [250, 22], [338, 76], [20, 92], [330, 120]]} />
      <circle cx="304" cy="42" r="16" className="tut-f-star" />
      <circle cx="297" cy="37" r="15" className="tut-f-sky" />
      <path d="M62 72 L180 30 L298 72Z" className="tut-f-roof tut-s" />
      <rect x="76" y="70" width="208" height="122" className="tut-f-wall tut-s" />
      {wins}
      <rect x="166" y="162" width="28" height="30" className="tut-f-roof tut-s" />
      <rect x="118" y="56" width="124" height="18" rx="3" className="tut-f-yellow tut-s" />
      <text x="180" y="69" fontSize="9.5" textAnchor="middle" className="tut-t" letterSpacing="1">ELECTIONS FRIDAY</text>
      <g transform="rotate(-5 112 172)">
        <rect x="96" y="162" width="32" height="22" className="tut-f-card tut-s" />
        <text x="112" y="177" fontSize="8" textAnchor="middle" className="tut-t">VOTE</text>
      </g>
      <g transform="rotate(4 248 172)">
        <rect x="232" y="162" width="32" height="22" className="tut-f-card tut-s" />
        <text x="248" y="177" fontSize="8" textAnchor="middle" className="tut-t">BISI!</text>
      </g>
      <rect y="192" width="360" height="18" className="tut-f-ground" />
    </svg>
  );
}

function Porter() {
  return (
    <svg viewBox="0 0 360 210" className="tut-ill" role="img" aria-label="Mr. Bello the hall porter at his desk saying: lights out by midnight">
      <rect width="360" height="210" className="tut-f-paper" />
      <circle cx="58" cy="52" r="20" className="tut-f-card tut-s" />
      <path d="M58 52 V40 M58 52 L66 48" className="tut-s" />
      <rect x="22" y="86" width="56" height="44" rx="4" className="tut-f-card tut-s" />
      <circle cx="36" cy="100" r="2.5" className="tut-f-ink" />
      <circle cx="50" cy="100" r="2.5" className="tut-f-ink" />
      <circle cx="64" cy="100" r="2.5" className="tut-f-ink" />
      <path d="M36 103v9M50 103v7M64 103v10" className="tut-s" />
      <g className="tut-float">
        <path d="M118 200 C118 152 136 136 164 136 C192 136 210 152 210 200Z" className="tut-f-c3 tut-s" />
        <circle cx="164" cy="108" r="25" className="tut-f-skin2 tut-s" />
        <path d="M138 98 Q164 70 190 98Z" className="tut-f-ink" />
        <rect x="134" y="95" width="60" height="7" rx="3" className="tut-f-ink" />
        <circle cx="156" cy="110" r="2.4" className="tut-f-white" />
        <circle cx="172" cy="110" r="2.4" className="tut-f-white" />
        <path d="M157 120 Q164 125 171 120" className="tut-s-white" fill="none" />
      </g>
      <rect x="52" y="164" width="256" height="12" rx="3" className="tut-f-wall tut-s" />
      <rect x="62" y="176" width="236" height="34" className="tut-f-roof tut-s" />
      <rect x="90" y="152" width="44" height="12" rx="2" className="tut-f-primary tut-s" />
      <path d="M214 120 L204 138 L232 124" className="tut-f-card tut-s" />
      <rect x="204" y="62" width="144" height="62" rx="14" className="tut-f-card tut-s" />
      <text x="276" y="88" fontSize="15" textAnchor="middle" className="tut-t">Lights out</text>
      <text x="276" y="108" fontSize="15" textAnchor="middle" className="tut-t">by midnight!</text>
    </svg>
  );
}

function PowerAB() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="Person A gets person B to do something B would not otherwise do">
      <rect width="360" height="200" className="tut-f-paper" />
      <Person x={86} base={182} cloth="tut-f-c1" skin="tut-f-skin1" />
      <Person x={274} base={182} cloth="tut-f-c2" skin="tut-f-skin2" />
      <text x="86" y="40" fontSize="26" textAnchor="middle" className="tut-t">A</text>
      <text x="274" y="40" fontSize="26" textAnchor="middle" className="tut-t">B</text>
      <path d="M128 100 H226" className="tut-s-primary" strokeWidth="4" />
      <path d="M216 90 L230 100 L216 110" className="tut-s-primary" strokeWidth="4" strokeLinejoin="round" />
      <rect x="132" y="116" width="96" height="38" rx="10" className="tut-f-yellow tut-s" />
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="tut-t">does what B</text>
      <text x="180" y="146" fontSize="10.5" textAnchor="middle" className="tut-t">wouldn’t have</text>
    </svg>
  );
}

function Lecture() {
  const seats = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 7; c++)
      seats.push(
        <circle key={`${r}${c}`} cx={60 + c * 40 + (r % 2) * 20} cy={150 + r * 20} r="8"
          className={['tut-f-skin1', 'tut-f-skin2'][(r + c) % 2] + ' tut-s'} />,
      );
  return (
    <svg viewBox="0 0 360 220" className="tut-ill" role="img" aria-label="A GES 103 lecture theatre; the lecturer asks who here is a politician">
      <rect width="360" height="220" className="tut-f-paper" />
      <rect x="40" y="22" width="190" height="96" rx="6" className="tut-f-board tut-s" />
      <text x="135" y="62" fontSize="17" textAnchor="middle" className="tut-t-white">GES 103</text>
      <text x="135" y="86" fontSize="11" textAnchor="middle" className="tut-t-white">Chapter 1: Politics</text>
      <g className="tut-float">
        <Person x={290} base={130} cloth="tut-f-c3" skin="tut-f-skin2" s={0.85} />
      </g>
      <rect x="236" y="20" width="118" height="44" rx="12" className="tut-f-card tut-s" />
      <text x="295" y="38" fontSize="10.5" textAnchor="middle" className="tut-t">Who here is</text>
      <text x="295" y="54" fontSize="10.5" textAnchor="middle" className="tut-t">a politician?</text>
      {seats}
    </svg>
  );
}

function Polis() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="A Greek temple representing the polis, the city-state">
      <rect width="360" height="200" className="tut-f-sky" />
      <circle cx="300" cy="46" r="20" className="tut-f-yellow" />
      <path d="M90 78 L180 40 L270 78Z" className="tut-f-wall tut-s" />
      <rect x="86" y="78" width="188" height="12" className="tut-f-wall tut-s" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={98 + i * 31} y="92" width="16" height="66" className="tut-f-wall tut-s" />
      ))}
      <rect x="76" y="158" width="208" height="12" className="tut-f-wall tut-s" />
      <rect x="66" y="170" width="228" height="12" className="tut-f-wall tut-s" />
      <rect y="182" width="360" height="18" className="tut-f-ground" />
      <text x="180" y="68" fontSize="11" textAnchor="middle" className="tut-t">POLIS</text>
    </svg>
  );
}

function WaterQueue() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="Students queueing with buckets at a dry tap in the hall">
      <rect width="360" height="200" className="tut-f-paper" />
      <rect x="30" y="40" width="16" height="110" className="tut-f-line tut-s" />
      <path d="M46 60 H76 V74" className="tut-s" fill="none" strokeWidth="5" />
      <text x="74" y="98" fontSize="22" textAnchor="middle" className="tut-t">…</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="tut-float" style={{ animationDelay: `${i * 0.4}s` }}>
          <Person x={120 + i * 62} base={176} cloth={['tut-f-c1', 'tut-f-c2', 'tut-f-c3', 'tut-f-c1'][i]}
            skin={i % 2 ? 'tut-f-skin2' : 'tut-f-skin1'} s={0.72} />
          <path d={`M${136 + i * 62} 150 h18 l-3 22 h-12z`} className="tut-f-yellow tut-s" />
        </g>
      ))}
      <rect y="176" width="360" height="24" className="tut-f-line" />
    </svg>
  );
}

function Sug() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="The Students' Union Government building with a banner">
      <rect width="360" height="200" className="tut-f-sky" />
      <Stars pts={[[40, 30], [90, 18], [270, 26], [330, 60]]} />
      <rect x="70" y="60" width="220" height="122" className="tut-f-wall tut-s" />
      <rect x="62" y="48" width="236" height="16" className="tut-f-roof tut-s" />
      <rect x="110" y="72" width="140" height="22" rx="4" className="tut-f-primary tut-s" />
      <text x="180" y="88" fontSize="11" textAnchor="middle" className="tut-t-white" letterSpacing="1">SUG SECRETARIAT</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={92 + i * 48} y="108" width="32" height="26" rx="3" className={i === 1 ? 'tut-f-yellow' : 'tut-f-win'} />
      ))}
      <rect x="164" y="146" width="32" height="36" className="tut-f-roof tut-s" />
      <rect y="182" width="360" height="18" className="tut-f-ground" />
    </svg>
  );
}

function Island() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="A small island nation with a flag, surrounded by sea">
      <rect width="360" height="200" className="tut-f-sea" />
      <path d="M0 150 Q45 140 90 150 T180 150 T270 150 T360 150 V200 H0Z" className="tut-f-sea2" />
      <ellipse cx="180" cy="140" rx="110" ry="34" className="tut-f-sand tut-s" />
      <path d="M120 130 Q150 70 190 128Z" className="tut-f-ground tut-s" />
      <path d="M200 132 Q228 86 256 132Z" className="tut-f-ground tut-s" />
      <path d="M180 128 V58" className="tut-s" strokeWidth="3" />
      <g className="tut-wave">
        <path d="M180 58 h46 l-8 12 8 12 h-46z" className="tut-f-primary tut-s" />
        <circle cx="198" cy="70" r="5" className="tut-f-yellow" />
      </g>
    </svg>
  );
}

function Assembly() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="A national assembly building with a dome">
      <rect width="360" height="200" className="tut-f-sky" />
      <Stars pts={[[30, 26], [80, 44], [300, 22], [336, 70], [250, 40]]} />
      <path d="M130 86 A50 50 0 0 1 230 86Z" className="tut-f-c1 tut-s" />
      <rect x="176" y="22" width="8" height="16" className="tut-f-wall tut-s" />
      <path d="M184 22 h18 l-5 5 5 5 h-18z" className="tut-f-yellow tut-s tut-wave" />
      <rect x="110" y="86" width="140" height="10" className="tut-f-wall tut-s" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={116 + i * 19} y="96" width="10" height="60" className="tut-f-wall tut-s" />
      ))}
      <rect x="40" y="110" width="74" height="56" className="tut-f-wall tut-s" />
      <rect x="246" y="110" width="74" height="56" className="tut-f-wall tut-s" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={50 + i * 20} y="124" width="12" height="16" rx="2" className={i === 1 ? 'tut-f-yellow' : 'tut-f-win'} />
          <rect x={256 + i * 20} y="124" width="12" height="16" rx="2" className={i === 0 ? 'tut-f-yellow' : 'tut-f-win'} />
        </g>
      ))}
      <rect x="100" y="156" width="160" height="10" className="tut-f-wall tut-s" />
      <rect y="166" width="360" height="34" className="tut-f-ground" />
    </svg>
  );
}

function Generator() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="A dark hostel corridor beside a hall generator with an empty fuel gauge">
      <rect width="360" height="200" className="tut-f-sky" />
      <Stars pts={[[24, 24], [70, 14], [320, 30]]} />
      <rect x="20" y="60" width="180" height="120" className="tut-f-wall tut-s" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={32 + i * 34} y="78" width="22" height="30" rx="2" className="tut-f-win" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={32 + i * 34} y="124" width="22" height="30" rx="2" className={i === 2 ? 'tut-f-yellow' : 'tut-f-win'} />
      ))}
      <g className="tut-float">
        <rect x="232" y="112" width="100" height="62" rx="8" className="tut-f-primary tut-s" />
        <rect x="244" y="124" width="40" height="26" rx="4" className="tut-f-card tut-s" />
        <path d="M250 144 A14 14 0 0 1 278 144" className="tut-s" fill="none" />
        <path d="M264 144 L254 134" className="tut-s-white" strokeWidth="2.6" />
        <text x="264" y="160" fontSize="8" textAnchor="middle" className="tut-t-white">FUEL</text>
        <circle cx="308" cy="134" r="8" className="tut-f-ink" />
        <rect x="244" y="174" width="12" height="8" className="tut-f-ink" />
        <rect x="308" y="174" width="12" height="8" className="tut-f-ink" />
      </g>
      <rect y="182" width="360" height="18" className="tut-f-ground" />
    </svg>
  );
}

function Newsstand() {
  return (
    <svg viewBox="0 0 360 210" className="tut-ill" role="img" aria-label="Men arguing at a roadside newspaper stand in the morning">
      <rect width="360" height="210" className="tut-f-paper" />
      <circle cx="318" cy="36" r="16" className="tut-f-yellow" />
      <rect x="40" y="40" width="160" height="10" className="tut-f-roof tut-s" />
      <path d="M48 50 V160 M192 50 V160" className="tut-s" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`rotate(${[-3, 2, -2, 3][i]} ${70 + i * 34} 90)`}>
          <rect x={56 + i * 34} y="66" width="28" height="40" className="tut-f-card tut-s" />
          <rect x={60 + i * 34} y="71" width="20" height="5" className={i % 2 ? 'tut-f-bad' : 'tut-f-ink'} />
          <path d={`M${60 + i * 34} 82h20M${60 + i * 34} 88h20M${60 + i * 34} 94h14`} className="tut-s" strokeWidth="1.4" />
        </g>
      ))}
      <rect x="44" y="118" width="152" height="12" className="tut-f-wall tut-s" />
      <g className="tut-float">
        <Person x={238} base={196} cloth="tut-f-c2" skin="tut-f-skin2" s={0.75} />
      </g>
      <g className="tut-float" style={{ animationDelay: '0.5s' }}>
        <Person x={300} base={196} cloth="tut-f-c1" skin="tut-f-skin1" s={0.75} />
      </g>
      <rect x="216" y="70" width="44" height="22" rx="10" className="tut-f-card tut-s" />
      <text x="238" y="85" fontSize="12" textAnchor="middle" className="tut-t">!!</text>
      <rect x="282" y="74" width="44" height="22" rx="10" className="tut-f-card tut-s" />
      <text x="304" y="89" fontSize="12" textAnchor="middle" className="tut-t">No o!</text>
      <rect y="196" width="360" height="14" className="tut-f-line" />
    </svg>
  );
}

function Factory() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="Smoking factory chimneys during the Industrial Revolution">
      <rect width="360" height="200" className="tut-f-sky" />
      {[[70, 30], [110, 18], [150, 34]].map(([x, y], i) => (
        <circle key={i} cx={x + 40} cy={y} r={16 + i * 3} className="tut-f-line tut-float" style={{ animationDelay: `${i * 0.6}s`, opacity: 0.7 }} />
      ))}
      <rect x="100" y="50" width="22" height="80" className="tut-f-roof tut-s" />
      <rect x="150" y="66" width="22" height="64" className="tut-f-roof tut-s" />
      <path d="M40 180 V120 L90 100 V120 L140 100 V120 L190 100 V120 L240 100 V180Z" className="tut-f-wall tut-s" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={56 + i * 46} y="140" width="22" height="18" rx="2" className="tut-f-yellow" />
      ))}
      <rect x="262" y="120" width="70" height="60" className="tut-f-wall tut-s" />
      <path d="M256 120 L297 96 L338 120Z" className="tut-f-roof tut-s" />
      <rect x="288" y="148" width="18" height="32" className="tut-f-win" />
      <rect y="180" width="360" height="20" className="tut-f-ground" />
    </svg>
  );
}

function Survey() {
  return (
    <svg viewBox="0 0 360 210" className="tut-ill" role="img" aria-label="A researcher with a clipboard interviewing a student">
      <rect width="360" height="210" className="tut-f-paper" />
      <g className="tut-float">
        <Person x={96} base={196} cloth="tut-f-c3" skin="tut-f-skin1" s={0.85} />
        <g transform="rotate(-8 140 140)">
          <rect x="118" y="112" width="48" height="62" rx="5" className="tut-f-roof tut-s" />
          <rect x="124" y="120" width="36" height="50" className="tut-f-card" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="128" y={126 + i * 14} width="8" height="8" rx="1.5" className="tut-f-card tut-s" strokeWidth="1.6" />
              {i < 2 && <path d={`M129.5 ${130 + i * 14} l2 2.5 4-5`} className="tut-s-good" strokeWidth="2" />}
              <path d={`M140 ${130 + i * 14} h16`} className="tut-s" strokeWidth="1.4" />
            </g>
          ))}
        </g>
      </g>
      <g className="tut-float" style={{ animationDelay: '0.6s' }}>
        <Person x={262} base={196} cloth="tut-f-c2" skin="tut-f-skin2" s={0.85} />
      </g>
      <rect x="196" y="48" width="132" height="44" rx="12" className="tut-f-card tut-s" />
      <text x="262" y="66" fontSize="10.5" textAnchor="middle" className="tut-t">Strongly agree…</text>
      <text x="262" y="82" fontSize="10.5" textAnchor="middle" className="tut-t">or maybe disagree?</text>
      <rect y="196" width="360" height="14" className="tut-f-line" />
    </svg>
  );
}

function Charts() {
  const bars = [44, 70, 96, 62, 30];
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="A whiteboard with a bar chart and a bell curve">
      <rect width="360" height="200" className="tut-f-paper" />
      <rect x="24" y="22" width="312" height="150" rx="8" className="tut-f-card tut-s" />
      {bars.map((h, i) => (
        <rect key={i} x={46 + i * 26} y={150 - h} width="18" height={h} rx="3" className={i === 2 ? 'tut-f-primary' : 'tut-f-c3'} opacity={i === 2 ? 1 : 0.55} />
      ))}
      <path d="M40 150 H186" className="tut-s" />
      <path d="M200 150 C236 150 240 60 266 60 C292 60 296 150 330 150" className="tut-s-primary" strokeWidth="3" />
      <path d="M266 60 V150" className="tut-s" strokeDasharray="3 4" strokeWidth="1.4" />
      <text x="266" y="52" fontSize="10" textAnchor="middle" className="tut-t">mean</text>
      <rect x="150" y="172" width="60" height="8" className="tut-f-line" />
      <rect x="176" y="180" width="8" height="18" className="tut-f-line" />
    </svg>
  );
}

function Lab() {
  return (
    <svg viewBox="0 0 360 210" className="tut-ill" role="img" aria-label="An old psychology laboratory with a lamp, a ticking timer and a researcher">
      <rect width="360" height="210" className="tut-f-paper" />
      <rect x="20" y="20" width="110" height="70" rx="4" className="tut-f-board tut-s" />
      <text x="75" y="50" fontSize="13" textAnchor="middle" className="tut-t-white">LEIPZIG</text>
      <text x="75" y="70" fontSize="13" textAnchor="middle" className="tut-t-white">1879</text>
      <rect x="40" y="150" width="280" height="12" rx="3" className="tut-f-wall tut-s" />
      <rect x="50" y="162" width="10" height="40" className="tut-f-roof" />
      <rect x="300" y="162" width="10" height="40" className="tut-f-roof" />
      <path d="M200 150 V112 M200 112 L224 98" className="tut-s" strokeWidth="3" fill="none" />
      <path d="M216 90 l22 -6 6 20 -22 6z" className="tut-f-c2 tut-s" />
      <circle cx="240" cy="102" r="12" className="tut-f-yellow tut-twinkle" />
      <circle cx="280" cy="128" r="18" className="tut-f-card tut-s" />
      <path d="M280 128 V116 M280 128 L289 133" className="tut-s" />
      <g className="tut-float">
        <Person x={120} base={196} cloth="tut-f-c3" skin="tut-f-skin1" s={0.8} />
      </g>
      <rect y="200" width="360" height="10" className="tut-f-line" />
    </svg>
  );
}

function EarthSpheres() {
  return (
    <svg viewBox="0 0 360 210" className="tut-ill" role="img" aria-label="Earth with its four spheres: atmosphere, hydrosphere, lithosphere and biosphere">
      <rect width="360" height="210" className="tut-f-sky" />
      <Stars pts={[[24, 22], [60, 50], [310, 26], [336, 120], [40, 170], [300, 180]]} />
      <circle cx="180" cy="105" r="88" className="tut-f-soft" opacity="0.45" />
      <circle cx="180" cy="105" r="72" className="tut-f-sea2 tut-s" />
      <path d="M128 70 q20 -22 46 -8 q14 10 4 26 q-18 18 -40 6 q-14 -8 -10 -24z" className="tut-f-ground tut-s" />
      <path d="M190 120 q24 -10 40 6 q8 16 -8 28 q-22 10 -36 -4 q-8 -14 4 -30z" className="tut-f-ground tut-s" />
      <path d="M212 62 q14 -6 22 4 q2 10 -10 12 q-12 0 -12 -16z" className="tut-f-sand tut-s" />
      <circle cx="146" cy="72" r="4" className="tut-f-c1" />
      <circle cx="210" cy="130" r="4" className="tut-f-c1" />
      <text x="180" y="12" fontSize="10" textAnchor="middle" className="tut-t-white">ATMOSPHERE</text>
    </svg>
  );
}

function Market() {
  return (
    <svg viewBox="0 0 360 200" className="tut-ill" role="img" aria-label="A busy open-air periodic market with stalls under umbrellas">
      <rect width="360" height="200" className="tut-f-paper" />
      <circle cx="320" cy="34" r="16" className="tut-f-yellow" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${30 + i * 110} 0)`}>
          <path d="M0 80 Q45 40 90 80Z" className={`${['tut-f-roof', 'tut-f-c3', 'tut-f-c1'][i]} tut-s`} />
          <path d="M45 80 V150" className="tut-s" strokeWidth="2" />
          <rect x="10" y="120" width="70" height="14" rx="3" className="tut-f-wall tut-s" />
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx={20 + k * 16} cy="114" r="6" className={['tut-f-c2', 'tut-f-yellow', 'tut-f-c1', 'tut-f-bad'][(k + i) % 4] + ' tut-s'} strokeWidth="1.5" />
          ))}
        </g>
      ))}
      <g className="tut-float">
        <Person x={140} base={196} cloth="tut-f-c2" skin="tut-f-skin2" s={0.55} />
      </g>
      <g className="tut-float" style={{ animationDelay: '0.7s' }}>
        <Person x={250} base={196} cloth="tut-f-c3" skin="tut-f-skin1" s={0.55} />
      </g>
      <rect y="190" width="360" height="10" className="tut-f-line" />
    </svg>
  );
}

function Badge() {
  return (
    <svg className="tut-badge" viewBox="0 0 140 140" role="img" aria-label="A ballot going into a ballot box">
      <circle cx="70" cy="70" r="64" className="tut-f-soft" />
      <g className="tut-float">
        <rect x="56" y="24" width="28" height="38" rx="3" className="tut-f-card tut-s" />
        <path d="M62 44l6 6 10-12" className="tut-s-good" strokeWidth="3.5" strokeLinejoin="round" />
      </g>
      <rect x="34" y="62" width="72" height="48" rx="6" className="tut-f-primary tut-s" />
      <rect x="52" y="60" width="36" height="6" rx="2" className="tut-f-ink" />
      <text x="70" y="92" fontSize="12" textAnchor="middle" className="tut-t-white">DONE</text>
    </svg>
  );
}

/* ---------- 56px card icons ---------- */
const I = ({ children, label }) => (
  <svg viewBox="0 0 56 56" aria-hidden={label ? undefined : 'true'} role={label ? 'img' : undefined} aria-label={label}>
    {children}
  </svg>
);

const ICONS = {
  force: (
    <I>
      <rect x="12" y="24" width="32" height="24" rx="5" className="tut-f-bad tut-s" />
      <path d="M19 24v-6a9 9 0 0 1 18 0v6" className="tut-s" fill="none" />
      <circle cx="28" cy="34" r="3.2" className="tut-f-ink" />
      <path d="M28 36v6" className="tut-s" />
    </I>
  ),
  domination: (
    <I>
      <path d="M8 23h9l21-10v30L17 33H8z" className="tut-f-yellow tut-s" />
      <path d="M17 33l3 10h6l-2-9" className="tut-f-card tut-s" />
      <path d="M43 21q5 7 0 14M47 16q8 12 0 24" className="tut-s" fill="none" />
    </I>
  ),
  manipulation: (
    <I>
      <path d="M12 9h32M28 5v8" className="tut-s" />
      <path d="M15 9l5 24M41 9l-5 24M28 9v10" className="tut-s" strokeWidth="1.4" />
      <circle cx="28" cy="24" r="5" className="tut-f-skin1 tut-s" />
      <path d="M21 31h14l-2 15h-10z" className="tut-f-c3 tut-s" />
    </I>
  ),
  traditional: (
    <I>
      <path d="M9 40 L11 17 L20 28 L28 13 L36 28 L45 17 L47 40Z" className="tut-f-yellow tut-s" />
      <rect x="9" y="40" width="38" height="7" rx="2" className="tut-f-roof tut-s" />
      <circle cx="28" cy="30" r="3" className="tut-f-bad" />
    </I>
  ),
  charismatic: (
    <I>
      <path d="M28 5l5.6 13.6L48 20l-11 9.8L40.6 45 28 37.4 15.4 45 19 29.8 8 20l14.4-1.4z" className="tut-f-yellow tut-s" />
    </I>
  ),
  legal: (
    <I>
      <rect x="13" y="7" width="30" height="42" rx="3" className="tut-f-card tut-s" />
      <path d="M19 17h18M19 24h18M19 31h11" className="tut-s" />
      <circle cx="37" cy="41" r="6" className="tut-f-bad tut-s" />
    </I>
  ),
  manifest: (
    <I>
      <circle cx="18" cy="28" r="9" className="tut-f-c1 tut-s" />
      <circle cx="42" cy="28" r="9" className="tut-f-c2 tut-s" />
      <path d="M27 28h6" className="tut-s" />
      <path d="M30 24l4 4-4 4" className="tut-s" fill="none" />
    </I>
  ),
  potential: (
    <I>
      <circle cx="18" cy="28" r="9" className="tut-f-c1 tut-s" strokeDasharray="3 3" />
      <circle cx="42" cy="28" r="9" className="tut-f-c2 tut-s" />
      <path d="M27 28h6" className="tut-s" strokeDasharray="2 3" />
    </I>
  ),
  aristotle: (
    <I>
      <rect x="14" y="14" width="28" height="6" className="tut-f-wall tut-s" />
      <rect x="18" y="20" width="6" height="24" className="tut-f-wall tut-s" />
      <rect x="32" y="20" width="6" height="24" className="tut-f-wall tut-s" />
      <rect x="12" y="44" width="32" height="6" className="tut-f-wall tut-s" />
      <path d="M10 14 L28 5 L46 14Z" className="tut-f-roof tut-s" />
    </I>
  ),
  lasswell: (
    <I>
      <circle cx="28" cy="28" r="18" className="tut-f-card tut-s" />
      <path d="M28 28 V10 A18 18 0 0 1 44 36Z" className="tut-f-yellow tut-s" />
      <path d="M28 28 L44 36 A18 18 0 0 1 16 41Z" className="tut-f-c3 tut-s" />
    </I>
  ),
  easton: (
    <I>
      <path d="M28 8v38M14 46h28" className="tut-s" />
      <path d="M10 18h36" className="tut-s" />
      <path d="M10 18 L4 32 h12z M46 18 L40 32 h12z" className="tut-f-yellow tut-s" />
    </I>
  ),
  institutional: (
    <I>
      <rect x="8" y="22" width="40" height="26" className="tut-f-wall tut-s" />
      <path d="M6 22 L28 8 L50 22Z" className="tut-f-primary tut-s" />
      <path d="M16 28v14M24 28v14M32 28v14M40 28v14" className="tut-s" />
    </I>
  ),
  divine: (
    <I>
      <circle cx="28" cy="28" r="10" className="tut-f-yellow tut-s" />
      <path d="M28 6v8M28 42v8M6 28h8M42 28h8M12 12l6 6M38 38l6 6M44 12l-6 6M12 44l6-6" className="tut-s" />
    </I>
  ),
  organic: (
    <I>
      <path d="M28 50V28" className="tut-s" strokeWidth="3" />
      <circle cx="28" cy="20" r="13" className="tut-f-c1 tut-s" />
      <circle cx="18" cy="28" r="7" className="tut-f-c1 tut-s" />
      <circle cx="38" cy="28" r="7" className="tut-f-c1 tut-s" />
    </I>
  ),
  conquest: (
    <I>
      <path d="M14 42 L38 12 l4 4 -30 24z" className="tut-f-line tut-s" />
      <path d="M10 38l8 8M16 46l-6 2 2-6" className="tut-s" />
      <path d="M36 10l8 2 2 8" className="tut-s" fill="none" />
    </I>
  ),
  genetic: (
    <I>
      <circle cx="28" cy="10" r="5" className="tut-f-c2 tut-s" />
      <circle cx="14" cy="28" r="5" className="tut-f-c1 tut-s" />
      <circle cx="42" cy="28" r="5" className="tut-f-c1 tut-s" />
      <circle cx="28" cy="46" r="6" className="tut-f-primary tut-s" />
      <path d="M25 14 L17 24M31 14 L39 24M17 32 L25 41M39 32 L31 41" className="tut-s" />
    </I>
  ),
  executive: (
    <I>
      <rect x="8" y="20" width="40" height="28" rx="5" className="tut-f-c3 tut-s" />
      <path d="M21 20v-6h14v6M8 31h40" className="tut-s" fill="none" />
      <rect x="24" y="28" width="8" height="7" rx="1.5" className="tut-f-yellow tut-s" />
    </I>
  ),
  legislature: (
    <I>
      <path d="M14 26 A14 14 0 0 1 42 26Z" className="tut-f-c1 tut-s" />
      <rect x="10" y="26" width="36" height="5" className="tut-f-wall tut-s" />
      <path d="M15 31v13M23 31v13M33 31v13M41 31v13" className="tut-s" />
      <rect x="8" y="44" width="40" height="5" className="tut-f-wall tut-s" />
    </I>
  ),
  judiciary: (
    <I>
      <rect x="10" y="14" width="26" height="12" rx="3" transform="rotate(-35 23 20)" className="tut-f-roof tut-s" />
      <path d="M27 27 L44 44" className="tut-s" strokeWidth="5" />
      <rect x="8" y="44" width="26" height="6" rx="2" className="tut-f-wall tut-s" />
    </I>
  ),
  contract: (
    <I>
      <rect x="12" y="6" width="32" height="44" rx="3" className="tut-f-card tut-s" />
      <path d="M18 16h20M18 23h20M18 30h12" className="tut-s" />
      <path d="M18 42 q4 -6 8 0 t8 0" className="tut-s-primary" />
    </I>
  ),
};

const ART = { hall: Hall, porter: Porter, powerAB: PowerAB, lecture: Lecture, polis: Polis, water: WaterQueue, sug: Sug, island: Island, assembly: Assembly, generator: Generator, newsstand: Newsstand, factory: Factory, survey: Survey, charts: Charts, lab: Lab, earth: EarthSpheres, market: Market, badge: Badge };

export function Art({ name }) {
  const Drawing = ART[name];
  return Drawing ? <Drawing /> : null;
}

export function CardIcon({ name }) {
  return ICONS[name] ?? null;
}
