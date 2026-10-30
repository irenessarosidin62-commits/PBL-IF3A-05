// Konstanta & data dummy awal untuk Sarana dan Prasarana (Laboran)

export const SARPRAS_FILTER_CATEGORIES = [
  'Semua Kategori',
  'Ruang kelas',
  'Laboratorium',
  'Workspace'
];

export const ROOM_CATEGORIES = [
  'Ruang kelas',
  'Laboratorium',
  'Workspace'
];

export const ROOM_STATUS = {
  AVAILABLE: 'tersedia',
  ISSUE: 'bermasalah'
};

export const STATUS_OPTIONS = [
  { value: 'tersedia', label: 'Tersedia', dotColor: '#16A34A' },
  { value: 'bermasalah', label: 'Bermasalah', dotColor: '#DC2626' }
];

export const INITIAL_ROOMS = [
  {
    id: 'room-1',
    code: 'GU 701',
    name: 'Ruang GU 701',
    category: 'Ruang kelas',
    facilities: '30 PC, Proyektor, AC, papan tulis',
    capacity: 40,
    building: 'Gedung Utama',
    floor: 7,
    status: 'tersedia'
  },
  {
    id: 'room-2',
    code: 'GU 702',
    name: 'Ruang GU 702',
    category: 'Ruang kelas',
    facilities: '28 PC, Proyektor, AC, smart board',
    capacity: 40,
    building: 'Gedung Utama',
    floor: 7,
    status: 'tersedia'
  },
  {
    id: 'room-3',
    code: 'GU 704',
    name: 'Ruang GU 704',
    category: 'Ruang kelas',
    facilities: '30 PC, Proyektor, AC',
    capacity: 36,
    building: 'Gedung Utama',
    floor: 7,
    status: 'tersedia'
  },
  {
    id: 'room-4',
    code: 'GU 705',
    name: 'Ruang GU 705',
    category: 'Ruang kelas',
    facilities: '30 PC, proyektor, AC, papan tulis',
    capacity: 30,
    building: 'Gedung Utama',
    floor: 7,
    status: 'tersedia'
  },
  {
    id: 'room-5',
    code: 'GU 706',
    name: 'Ruang GU 706',
    category: 'Ruang kelas',
    facilities: '25 PC, Proyektor, AC, smart board',
    capacity: 28,
    building: 'Gedung Utama',
    floor: 7,
    status: 'tersedia'
  },
  {
    id: 'room-6',
    code: 'GU 707',
    name: 'Ruang GU 707',
    category: 'Ruang kelas',
    facilities: '30 PC, proyektor, AC, papan tulis',
    capacity: 30,
    building: 'Gedung Utama',
    floor: 7,
    status: 'bermasalah'
  }
];
