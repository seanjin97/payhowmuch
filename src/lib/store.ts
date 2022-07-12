import { writable, type Writable } from 'svelte/store';
import type { Person } from './types';

export const gst: Writable<number> = writable(7);
export const svcCharge:  Writable<number> = writable(10);
export const people: Writable<Person[]> = writable([{id: "1", name: 'john', subtotal: 0, styleProps: {primary: "#606E8C"}, items: [{id: "1", name: 'chicken rice', price: 4 }] }, {"id": "2", name: 'alex', subtotal: 0, styleProps: {primary: "#343E40"}, items: [{id: '2', name: 'fish', price: 2 }] }]);
// export const people: Writable<Person[]> = writable([]);
export const personCount: Writable<number> = writable(0);