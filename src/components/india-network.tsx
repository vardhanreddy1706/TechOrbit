const cities = [
  {name:'New Delhi',x:282,y:62,dx:18,dy:5}, {name:'Mumbai',x:106,y:178,dx:-23,dy:-19},
  {name:'Hyderabad',x:302,y:211,dx:18,dy:5}, {name:'Bengaluru',x:226,y:316,dx:-24,dy:29},
  {name:'Chennai',x:383,y:300,dx:18,dy:5}, {name:'Kolkata',x:490,y:135,dx:-15,dy:-22},
];
export function IndiaNetwork() {
  return <div className="india-network">
    <div className="india-word" aria-hidden="true">INDIA<span>↗</span></div>
    <svg viewBox="0 0 600 390" role="img" aria-label="Animated connections between Indian cities, illustrating remote collaboration across the country">
      <defs><linearGradient id="connection-line"><stop stopColor="#1769FF"/><stop offset="1" stopColor="#8B5CF6"/></linearGradient></defs>
      <g className="network-grid" fill="none"><ellipse cx="300" cy="205" rx="260" ry="155"/><ellipse cx="300" cy="205" rx="180" ry="155"/><path d="M40 205H560M66 135H534M70 280H530"/></g>
      {cities.filter(c=>c.name!=='Hyderabad').map((c,i)=><g key={c.name}>
        <path className="connection-base" d={`M302 211 Q${(c.x+302)/2} ${Math.min(c.y,211)-55} ${c.x} ${c.y}`}/>
        <path className="connection-travel" style={{animationDelay:`${i*-.9}s`}} d={`M302 211 Q${(c.x+302)/2} ${Math.min(c.y,211)-55} ${c.x} ${c.y}`}/>
      </g>)}
      {cities.map((city,i)=><g key={city.name} className="network-city">
        <circle className="city-halo" cx={city.x} cy={city.y} r="11" style={{animationDelay:`${i*-.4}s`}}/>
        <circle className="city-core" cx={city.x} cy={city.y} r={city.name==='Hyderabad'?5:3.5}/>
        <text x={city.x+city.dx} y={city.y+city.dy} textAnchor={city.dx<0?'end':'start'}>{city.name}</text>
      </g>)}
    </svg>
    <p>One connected studio. Wherever you’re building.<span>Connected remotely · Across the country</span></p>
  </div>;
}

