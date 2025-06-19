export default function WishCard({
  wish,
  selected,
  disabled,
  onClick,
  showPriority,
  isPriority,
  onPriorityChange,
  autoPriority
}) {
  return (
    <div
      className={`wish-card ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${isPriority ? 'priority' : ''}`}
      onClick={() => !disabled || selected ? onClick() : null}
    >
      <div className="image-placeholder">[Image ici]</div>
      <h3>{wish.label}</h3>
      <p><strong>Catégorie:</strong> {wish.category}</p>
      {wish.remarks && <p className="remarks"><strong>Remarques:</strong> {wish.remarks}</p>}

      {/* Affiche la case à cocher si plusieurs souhaits sont sélectionnés */}
      {showPriority && selected && (
        <label>
          <input
            type="checkbox"
            checked={isPriority}
            onChange={(e) => onPriorityChange(wish.label, e.target.checked)}
            onClick={(e) => e.stopPropagation()} // évite le conflit avec le clic de sélection
          />
          Prioritaire
        </label>
      )}

      {/* Affiche le tag auto-prioritaire si un seul choix */}
      {autoPriority && selected && (
        <p className="priority-label">✅ Prioritaire par défaut</p>
      )}
    </div>
  );
}
