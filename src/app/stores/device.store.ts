import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IoTDevice } from '../entities/devices';

type DevicesState = {
  devices: IoTDevice[];
};

const LOCAL_STORAGE_KEY = 'devices_data';

function loadFromLocalStorage(): IoTDevice[] {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(devices: IoTDevice[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(devices));
}

const initialDevices: IoTDevice[] =
  loadFromLocalStorage().length > 0
    ? loadFromLocalStorage()
    : [
        {
          id: 1,
          name: 'Термосенсор T100',
          type: 'Датчик температуры',
          status: 'online',
          ipAddress: '192.168.0.10',
          firmwareVersion: '1.2.0',
        },
        {
          id: 2,
          name: 'Умная розетка SPX-22',
          type: 'Умная розетка',
          status: 'offline',
          ipAddress: '192.168.0.45',
          firmwareVersion: '3.1.5',
        },
        {
          id: 3,
          name: 'Контроллер влажности H2O-9000',
          type: 'Контроллер влажности',
          status: 'maintenance',
          ipAddress: '192.168.0.87',
          firmwareVersion: '2.0.0-beta',
        },
        {
          id: 4,
          name: 'Камера OBS-CAM7',
          type: 'Камера наблюдения',
          status: 'online',
          ipAddress: '192.168.1.4',
          firmwareVersion: '4.0.1',
        },
        {
          id: 5,
          name: 'Дрон SkyPatrol-X',
          type: 'Аэро-дрон',
          status: 'offline',
          ipAddress: '192.168.1.15',
          firmwareVersion: '1.0.0',
        },
        {
          id: 6,
          name: 'Замок SecureLock L3',
          type: 'Умный замок',
          status: 'online',
          ipAddress: '192.168.0.99',
          firmwareVersion: '5.5.2',
        },
        {
          id: 7,
          name: 'Датчик дыма SMK-A2',
          type: 'Датчик дыма',
          status: 'online',
          ipAddress: '192.168.0.33',
          firmwareVersion: '1.1.0',
        },
        {
          id: 8,
          name: 'Световой контроллер LX-210',
          type: 'Контроллер освещения',
          status: 'offline',
          ipAddress: '192.168.0.71',
          firmwareVersion: '2.2.1',
        },
        {
          id: 9,
          name: 'Метеостанция WX-5',
          type: 'Метеостанция',
          status: 'online',
          ipAddress: '192.168.0.112',
          firmwareVersion: '3.0.0',
        },
        {
          id: 10,
          name: 'IoT Хаб NX-Core',
          type: 'Шлюз IoT',
          status: 'maintenance',
          ipAddress: '192.168.0.1',
          firmwareVersion: '4.0.0-rc1',
        },
        {
          id: 11,
          name: 'Модуль CO2-Sense',
          type: 'Датчик углекислого газа',
          status: 'online',
          ipAddress: '192.168.0.66',
          firmwareVersion: '1.3.3',
        },
        {
          id: 12,
          name: 'Вентиляционный контроллер VNT-600',
          type: 'Контроллер вентиляции',
          status: 'online',
          ipAddress: '192.168.0.90',
          firmwareVersion: '2.0.2',
        },
        {
          id: 13,
          name: 'Датчик движения MoveIt',
          type: 'Датчик движения',
          status: 'offline',
          ipAddress: '192.168.0.58',
          firmwareVersion: '1.0.4',
        },
        {
          id: 14,
          name: 'Контроль доступа ADMS Pro',
          type: 'Система доступа',
          status: 'online',
          ipAddress: '192.168.0.11',
          firmwareVersion: '6.6.6',
        },
        {
          id: 15,
          name: 'IoT-Маяк BeaconOne',
          type: 'BLE-маяк',
          status: 'online',
          ipAddress: '192.168.0.77',
          firmwareVersion: '0.9.9',
        },
      ];

const initialState: DevicesState = {
  devices: initialDevices,
};

export const DevicesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setDevices(devices?: IoTDevice[]) {
      patchState(store, { devices: devices || [] });
      saveToLocalStorage(store.devices());
    },
    addDevice(device: IoTDevice) {
      patchState(store, { devices: [...store.devices(), device] });
      saveToLocalStorage(store.devices());
    },
    editDevice(editedDevice: IoTDevice) {
      const devices = store
        .devices()
        .map((d) => (d.id !== editedDevice.id ? d : editedDevice));
      patchState(store, { devices });
      saveToLocalStorage(store.devices());
    },
    deleteDevice(id: number) {
      const devices = store.devices().filter((d) => d.id !== id);
      patchState(store, { devices });
      saveToLocalStorage(store.devices());
    },
  }))
);
