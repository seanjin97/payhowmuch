import { writable, type Writable } from 'svelte/store';
import type { Person, SharingItem } from './types';

export const gst: Writable<number> = writable(7);
export const svcCharge:  Writable<number> = writable(10);
export const people: Writable<Person[]> = writable([]);
export const personCount: Writable<number> = writable(0);
export const theme: Writable<string> = writable();
export const sharingItems: Writable<SharingItem[]> = writable([])
export const sharingItemsCount: Writable<number> = writable(0);
export const expandedList: Writable<string[]> = writable([]);