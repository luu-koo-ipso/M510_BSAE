import styles from './ProduktToolbar.module.css'

type Props = {
  suche: string
  onSucheChange: (wert: string) => void
  kategorieFilter: string
  onKategorieChange: (wert: string) => void
  kategorien: string[]
  nurUnterbestand: boolean
  onNurUnterbestandChange: (wert: boolean) => void
  onReset: () => void
  anzahlGefiltert: number
  anzahlGesamt: number
  anzahlUnterbestand: number
}

export default function ProduktToolbar({
  suche,
  onSucheChange,
  kategorieFilter,
  onKategorieChange,
  kategorien,
  nurUnterbestand,
  onNurUnterbestandChange,
  onReset,
  anzahlGefiltert,
  anzahlGesamt,
  anzahlUnterbestand,
}: Props) {
  return (
    <>
      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Suche nach Name oder Artikelnummer …"
          aria-label="Produkte durchsuchen"
          value={suche}
          onChange={(e) => onSucheChange(e.target.value)}
          className={styles.suche}
        />

        <select
          aria-label="Kategorie filtern"
          value={kategorieFilter}
          onChange={(e) => onKategorieChange(e.target.value)}
          className={styles.select}
        >
          <option value="">Alle Kategorien</option>
          {kategorien.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={nurUnterbestand}
            onChange={(e) => onNurUnterbestandChange(e.target.checked)}
          />
          Nur Unterbestand
        </label>

        <button type="button" onClick={onReset} className={styles.resetBtn}>
          Zurücksetzen
        </button>
      </div>

      <div className={styles.statistik} aria-live="polite">
        <strong>{anzahlGefiltert}</strong> von {anzahlGesamt} Produkten
        {' · '}
        <span className={styles.unterbestand}>
          {anzahlUnterbestand} mit Unterbestand
        </span>
      </div>
    </>
  )
}