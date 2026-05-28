import type { ZeilenProSeite } from './types'
import styles from './Pagination.module.css'

type Props = {
  seite: number
  gesamtSeiten: number
  onSeiteChange: (seite: number) => void
  zeilenProSeite: ZeilenProSeite
  onZeilenProSeiteChange: (wert: ZeilenProSeite) => void
}

const OPTIONEN: ZeilenProSeite[] = [10, 25, 50]

export default function Pagination({
  seite,
  gesamtSeiten,
  onSeiteChange,
  zeilenProSeite,
  onZeilenProSeiteChange,
}: Props) {
  const istErste = seite === 1
  const istLetzte = seite === gesamtSeiten

  return (
    <nav className={styles.bar} aria-label="Tabellen-Paginierung">
      <label className={styles.zeilenLabel}>
        Zeilen pro Seite:
        <select
          className={styles.select}
          value={zeilenProSeite}
          onChange={(e) => onZeilenProSeiteChange(Number(e.target.value) as ZeilenProSeite)}
        >
          {OPTIONEN.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.nav}>
        <button
          type="button"
          className={styles.navBtn}
          disabled={istErste}
          onClick={() => onSeiteChange(1)}
          aria-label="Erste Seite"
        >
          « Erste
        </button>
        <button
          type="button"
          className={styles.navBtn}
          disabled={istErste}
          onClick={() => onSeiteChange(seite - 1)}
          aria-label="Vorherige Seite"
        >
          ‹ Zurück
        </button>
        <span className={styles.info} aria-live="polite">
          Seite <strong>{seite}</strong> von <strong>{gesamtSeiten}</strong>
        </span>
        <button
          type="button"
          className={styles.navBtn}
          disabled={istLetzte}
          onClick={() => onSeiteChange(seite + 1)}
          aria-label="Nächste Seite"
        >
          Vor ›
        </button>
        <button
          type="button"
          className={styles.navBtn}
          disabled={istLetzte}
          onClick={() => onSeiteChange(gesamtSeiten)}
          aria-label="Letzte Seite"
        >
          Letzte »
        </button>
      </div>
    </nav>
  )
}