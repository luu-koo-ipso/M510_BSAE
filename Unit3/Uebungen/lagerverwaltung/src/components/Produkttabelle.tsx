import { useEffect, useMemo, useState } from 'react'
import { produkte, type Produkt } from '../data/mockData'
import type { SortFeld, SortRichtung, ZeilenProSeite } from './types'
import ProduktToolbar from './ProduktToolbar'
import BestandsTabelle from './BestandsTabelle'
import Pagination from './Pagination'

export default function Produkttabelle() {
  const [seite, setSeite] = useState(1)
  const [zeilenProSeite, setZeilenProSeite] = useState<ZeilenProSeite>(25)
  const [suche, setSuche] = useState('')
  const [kategorieFilter, setKategorieFilter] = useState('')
  const [sortFeld, setSortFeld] = useState<SortFeld>(null)
  const [sortRichtung, setSortRichtung] = useState<SortRichtung>('asc')
  const [nurUnterbestand, setNurUnterbestand] = useState(false)

  const kategorien = useMemo(
    () => Array.from(new Set(produkte.map((p) => p.kategorie))).sort(),
    [],
  )

  const anzahlUnterbestand = useMemo(
    () => produkte.filter((p) => p.lagerbestand < p.mindestbestand).length,
    [],
  )

  const gefiltert = useMemo(() => {
    const s = suche.trim().toLowerCase()
    let result = produkte.filter((p) => {
      if (s && !p.name.toLowerCase().includes(s) && !p.artikelnummer.toLowerCase().includes(s)) {
        return false
      }
      if (kategorieFilter && p.kategorie !== kategorieFilter) {
        return false
      }
      if (nurUnterbestand && p.lagerbestand >= p.mindestbestand) {
        return false
      }
      return true
    })

    if (sortFeld !== null) {
      const feld = sortFeld
      const dir = sortRichtung === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const av = a[feld]
        const bv = b[feld]
        if (typeof av === 'number' && typeof bv === 'number') {
          return (av - bv) * dir
        }
        return String(av).localeCompare(String(bv), 'de') * dir
      })
    }
    return result
  }, [suche, kategorieFilter, nurUnterbestand, sortFeld, sortRichtung])

  const gesamtSeiten = Math.max(1, Math.ceil(gefiltert.length / zeilenProSeite))

  useEffect(() => {
    if (seite > gesamtSeiten) {
      setSeite(1)
    }
  }, [gesamtSeiten, seite])

  const sichtbar = gefiltert.slice((seite - 1) * zeilenProSeite, seite * zeilenProSeite)

  function toggleSort(feld: keyof Produkt) {
    if (sortFeld === feld) {
      setSortRichtung((r) => (r === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortFeld(feld)
      setSortRichtung('asc')
    }
  }

  function reset() {
    setSuche('')
    setKategorieFilter('')
    setNurUnterbestand(false)
    setSortFeld(null)
    setSortRichtung('asc')
    setSeite(1)
  }

  return (
    <div>
      <ProduktToolbar
        suche={suche}
        onSucheChange={(v) => {
          setSuche(v)
          setSeite(1)
        }}
        kategorieFilter={kategorieFilter}
        onKategorieChange={(v) => {
          setKategorieFilter(v)
          setSeite(1)
        }}
        kategorien={kategorien}
        nurUnterbestand={nurUnterbestand}
        onNurUnterbestandChange={(v) => {
          setNurUnterbestand(v)
          setSeite(1)
        }}
        onReset={reset}
        anzahlGefiltert={gefiltert.length}
        anzahlGesamt={produkte.length}
        anzahlUnterbestand={anzahlUnterbestand}
      />

      <BestandsTabelle
        produkte={sichtbar}
        sortFeld={sortFeld}
        sortRichtung={sortRichtung}
        onSortChange={toggleSort}
      />

      <Pagination
        seite={seite}
        gesamtSeiten={gesamtSeiten}
        onSeiteChange={setSeite}
        zeilenProSeite={zeilenProSeite}
        onZeilenProSeiteChange={(v) => {
          setZeilenProSeite(v)
          setSeite(1)
        }}
      />
    </div>
  )
}