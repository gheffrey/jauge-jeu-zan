import React from 'react';

function getColor(value) {
  if (value <= 20) return '#8B0000';      // rouge foncé
  if (value <= 40) return '#CC3300';      // rouge-orangée
  if (value <= 60) return '#FF9900';      // orange clair
  if (value <= 80) return '#99CC33';      // vert olive
  return '#66FF66';                       // vert clair
}


  const FLASH_THRESHOLD = 10;

export default function Gauge({ src, alt, label, value, onChange }) {
  const [selectValue, setSelectValue] = React.useState(0);

  const handlePlus = () => {
    onChange(Math.min(100, value + parseInt(selectValue)));
  };

  const handleMinus = () => {
    onChange(Math.max(0, value - parseInt(selectValue)));
  };

  const color = getColor(value);
const [flash, setFlash] = React.useState(false);
const prevValueRef = React.useRef(value);

React.useEffect(() => {
  const delta = Math.abs(value - prevValueRef.current);
  if (delta >= FLASH_THRESHOLD) {
    setFlash(true);
    setTimeout(() => setFlash(false), 800);
  }
  prevValueRef.current = value;
}, [value]);


  return (
    <div className="gauge-container">
      <img src={src} alt={alt} className="gauge-icon" />
      <div className="gauge-label">{label}</div>

<div className={`gauge-value-wrapper ${flash ? 'flash' : ''}`}>
        <div
          className="gauge-halo"
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '40px',
            borderRadius: '8px',
            boxShadow: `0 0 20px 5px ${color}`,
            transition: 'box-shadow 0.4s ease-in-out',
            zIndex: 0,
          }}
        />
        <div
          className="gauge-value"
          style={{
            color,
            textShadow: value >= 80 ? `0 0 10px ${color}, 0 0 20px ${color}` : 'none',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {value}
        </div>
      </div>

      <div className="gauge-controls">
        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {[...Array(11)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <button onClick={handlePlus}>+</button>
        <button onClick={handleMinus}>−</button>
      </div>
    </div>
  );
}
