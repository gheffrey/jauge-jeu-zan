import React from 'react';

const CRITICAL_MESSAGES = {
  'Bien-être': '⚠️ Le cadre de vie est très dégradé ! Améliorez l’aménagement ou les services.',
  'Biodiversité': '⚠️ La biodiversité est gravement menacée ! Renaturez, plantez mieux ou développez de nouveaux parcs.',
  'Artificialisation': '⚠️ Le sol est trop artificialisé ! Réduisez l’étalement ou compensez.',
};

function getColor(value) {
  if (value <= 20) return '#8B0000';
  if (value <= 40) return '#CC3300';
  if (value <= 60) return '#FF9900';
  if (value <= 80) return '#99CC33';
  return '#66FF66';
}

const FLASH_THRESHOLD = 10;

export default function Gauge({ src, alt, label, value, onChange }) {
  const [selectValue, setSelectValue] = React.useState(0);
  const [flash, setFlash] = React.useState(false);
  const prevValueRef = React.useRef(value);

  // Détection variation forte
  React.useEffect(() => {
    const delta = Math.abs(value - prevValueRef.current);
    if (delta >= FLASH_THRESHOLD) {
      setFlash(true);
      setTimeout(() => setFlash(false), 800);
    }
    prevValueRef.current = value;
  }, [value]);

  const handlePlus = () => {
    onChange(Math.min(100, value + parseInt(selectValue)));
  };

  const handleMinus = () => {
    onChange(Math.max(0, value - parseInt(selectValue)));
  };

  const color = getColor(value);
  const isCritical = value <= 20;
  const criticalMessage = isCritical ? CRITICAL_MESSAGES[label] : null;

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

      {criticalMessage && (
        <div className="gauge-warning" style={{
          color: '#B22222',
          marginTop: '10px',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          backgroundColor: '#ffe6e6',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #cc0000',
        }}>
          {criticalMessage}
        </div>
      )}
    </div>
  );
}
