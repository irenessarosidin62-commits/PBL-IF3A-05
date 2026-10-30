import { INITIAL_ROOMS } from '../constants/sarprasConstants';

const STORAGE_KEY = 'siap_pbm_sarpras_rooms';

const getStoredRooms = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ROOMS));
      return INITIAL_ROOMS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ROOMS;
  }
};

const saveRooms = (rooms) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  } catch (err) {
    console.error('Failed to save sarpras rooms to localStorage', err);
  }
};

export const fetchRooms = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredRooms());
    }, 150);
  });
};

export const createRoom = async (roomData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rooms = getStoredRooms();
      const codeTrimmed = (roomData.code || '').trim();

      // Check unique code
      const isExist = rooms.some(
        (r) => r.code.trim().toLowerCase() === codeTrimmed.toLowerCase()
      );

      if (isExist) {
        reject(new Error(`Kode ruang "${codeTrimmed}" sudah digunakan. Gunakan kode lain.`));
        return;
      }

      const newRoom = {
        id: `room-${Date.now()}`,
        code: codeTrimmed,
        name: (roomData.name || '').trim(),
        category: roomData.category || 'Ruang kelas',
        facilities: (roomData.facilities || '').trim(),
        building: (roomData.building || '').trim(),
        floor: Number(roomData.floor) || 1,
        capacity: Number(roomData.capacity) || 1,
        status: roomData.status || 'tersedia'
      };

      const updated = [newRoom, ...rooms];
      saveRooms(updated);
      resolve(newRoom);
    }, 150);
  });
};

export const updateRoom = async (id, roomData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rooms = getStoredRooms();
      const index = rooms.findIndex((r) => r.id === id);

      if (index === -1) {
        reject(new Error('Data ruang tidak ditemukan.'));
        return;
      }

      const codeTrimmed = (roomData.code || '').trim();
      // Check unique code excluding self
      const isExist = rooms.some(
        (r) => r.id !== id && r.code.trim().toLowerCase() === codeTrimmed.toLowerCase()
      );

      if (isExist) {
        reject(new Error(`Kode ruang "${codeTrimmed}" sudah digunakan oleh ruang lain.`));
        return;
      }

      const updatedRoom = {
        ...rooms[index],
        code: codeTrimmed,
        name: (roomData.name || '').trim(),
        category: roomData.category || rooms[index].category,
        facilities: (roomData.facilities || '').trim(),
        building: (roomData.building || '').trim(),
        floor: Number(roomData.floor) || rooms[index].floor,
        capacity: Number(roomData.capacity) || rooms[index].capacity,
        status: roomData.status || rooms[index].status
      };

      rooms[index] = updatedRoom;
      saveRooms(rooms);
      resolve(updatedRoom);
    }, 150);
  });
};
