import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Business Lunch',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T14:00:00',
    description: 'Discuss new business strategy over lunch',
    backgroundColor: '#e6e6e6',
  },
  {
    id: createEventId(),
    title: 'Meeting',
    start: TODAY_STR + 'T16:30:00',
    end: TODAY_STR + 'T18:30:00',
    description: 'Discuss upcoming project with team',
    backgroundColor: '#b3b3b3',
  },
];

export function createEventId() {
  return String(eventGuid++);
}
