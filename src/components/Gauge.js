// src/components/Gauge.js
import { useEffect } from 'react';

export default function Gauge({ src, alt, label, value, onChange, autoUpdate = false }) {
  // Si autoUpdate est activé, variation aléatoire simulée
  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => {
      const randomChange = Math.floor(Math.random() * 11 - 5); // -5 à +5
      const newValue = Math.max(0, Math.min(100, value + randomChange));
      onChange(newValue);
    }, 3000); // toutes les 3 secondes

    return () => clearInterval(interval);
  }, [value, autoUpdate, onChange]);

  return (
    <div className="gauge">
      <div className="gauge-container">
        <img src={src} alt={alt} className="gauge-image" />
        <div className="gauge-overlay" style={{ height: `${100 - value}%` }} />
      </div>
      <p>{label} : {value}%</p>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
      />
    </div>
  );
}
