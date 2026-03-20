import { create } from 'zustand';

interface NotifyState {
  hidden: boolean;
  message: string;
  displayNotification: (message: string, time?: number) => void;
  closeNotification: () => void;
}

export const useNotifyStore = create<NotifyState>((set) => ({
  hidden: true,
  message:
    'The platypus is only found in eastern Australia in small rivers and streams within the states of Queensland, New South Wales, Victoria and Tasmania.',

  displayNotification: (message, time) => {
    const openTime = time || 3000;
    set({ hidden: false, message });
    setTimeout(() => set({ hidden: true }), openTime);
  },

  closeNotification: () => {
    set({ hidden: true });
  }
}));
