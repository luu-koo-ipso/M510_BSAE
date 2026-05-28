import type { Produkt } from '../data/mockData'
import type { SortFeld, SortRichtung } from './types'
import styles from './BestandsTabelle.module.css'

const chfFormat = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
})

type Spalte = {
  feld: keyof Produkt
  label: string
  align?: 'right'
}

const SPALTEN: Spalte[] = [
  { feld: 'artikelnummer', label: 'Artikelnummer' },
  { feld: 'name', label: 'Name' },
  { feld: 'kategorie', label: 'Kategorie' },
  { feld: 'lagerbestand', label: 'Bestand', align: 'right' },
  { feld: 'mindestbestand', label: 'Mindest', align: 'right' },
  { feld: 'preis', label: 'Preis', align: 'right' },
  { feld: 'standort', label: 'Standort' },
  { feld: 'lieferant', label: 'Lieferant' },
]

type Props = {
  produkte: Produkt[]
  sortFeld: SortFeld
  sortRichtung: SortRichtung
  onSortChange: (feld: keyof Produkt) => void
}

export default function BestandsTabelle({
  produkte,
  sortFeld,
  sortRichtung,
  onSortChange,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {SPALTEN.map(({ feld, label, align }) => {
              const aktiv = sortFeld === feld
              const ariaSort = aktiv
                ? sortRichtung === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
              return (
                <th
                  key={feld}
                  scope="col"
                  aria-sort={ariaSort}
                  data-align={align}
                  className={styles.th}
                >
                  <button
                    type="button"
                    className={styles.sortBtn}
                    onClick={() => onSortChange(feld)}
                  >
                    {label}
                    {aktiv && (
                      <span className={styles.sortIndikator} aria-hidden="true">
                        {sortRichtung === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {produkte.length === 0 && (
            <tr>
              <td colSpan={SPALTEN.length} className={styles.empty}>
                Keine Produkte gefunden.
              </td>
            </tr>
          )}
          {produkte.map((p) => {
            const warn = p.lagerbestand < p.mindestbestand
            return (
              <tr key={p.id} className={`${styles.row} ${warn ? styles.warn : ''}`}>
                <td className={styles.td}>{p.artikelnummer}</td>
                <td className={styles.td}>{p.name}</td>
                <td className={styles.td}>{p.kategorie}</td>
                <td className={`${styles.td} ${styles.right} ${warn ? styles.warnText : ''}`}>
                  {p.lagerbestand} {p.einheit}
                </td>
                <td className={`${styles.td} ${styles.right}`}>{p.mindestbestand}</td>
                <td className={`${styles.td} ${styles.right}`}>{chfFormat.format(p.preis)}</td>
                <td className={styles.td}>{p.standort}</td>
                <td className={styles.td}>{p.lieferant}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}