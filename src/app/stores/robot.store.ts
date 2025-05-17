import { Robots } from '../entities/robots';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type RobotState = {
  robots: Robots[];
};

const LOCAL_STORAGE_KEY = 'robots_data';

function loadFromLocalStorage(): Robots[] {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(robots: Robots[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(robots));
}

const initialRobots: Robots[] =
  loadFromLocalStorage().length > 0
    ? loadFromLocalStorage()
    : [
        { id: 1, name: 'РобоМакс', type: 'Разведчик', status: 'active' },
        { id: 2, name: 'ТехноХантер', type: 'Охранник', status: 'offline' },
        { id: 3, name: 'Дронус', type: 'Летун', status: 'active' },
        { id: 4, name: 'ГидроБот', type: 'Водный', status: 'active' },
        { id: 5, name: 'Механоид', type: 'Грузовой', status: 'offline' },
        { id: 6, name: 'ФермоБот', type: 'Агроном', status: 'active' },
        { id: 7, name: 'ТурбоПёс', type: 'Питомец', status: 'active' },
        { id: 8, name: 'Сенсобот', type: 'Сенсорный', status: 'offline' },
        { id: 9, name: 'КиберДок', type: 'Медик', status: 'active' },
        { id: 10, name: 'Прометей', type: 'Огненный', status: 'active' },
        { id: 11, name: 'Ночной Страж', type: 'Охранник', status: 'offline' },
        { id: 12, name: 'Ротобой', type: 'Крутой', status: 'active' },
        { id: 13, name: 'Лазерон', type: 'Лазерный', status: 'active' },
        { id: 14, name: 'ЭкоТех', type: 'Уборщик', status: 'active' },
        { id: 15, name: 'Радарик', type: 'Аналитик', status: 'offline' },
      ];

const initialState: RobotState = {
  robots: initialRobots,
};

export const RobotsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setRobots(robots?: Robots[]) {
      patchState(store, { robots: robots || [] });
      saveToLocalStorage(store.robots());
    },

    addRobot(robot: Robots) {
      const updated = [...store.robots(), robot];
      patchState(store, { robots: updated });
      saveToLocalStorage(updated);
    },

    editRobot(editedRobot: Robots) {
      const updated = store
        .robots()
        .map((r) => (r.id === editedRobot.id ? editedRobot : r));
      patchState(store, { robots: updated });
      saveToLocalStorage(updated);
    },

    deleteRobot(id: number) {
      const updated = store.robots().filter((r) => r.id !== id);
      patchState(store, { robots: updated });
      saveToLocalStorage(updated);
    },
  }))
);
