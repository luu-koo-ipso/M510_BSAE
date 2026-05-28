import type { Produkt } from '../data/mockData'

export type SortFeld = keyof Produkt | null
export type SortRichtung = 'asc' | 'desc'
export type ZeilenProSeite = 10 | 25 | 50