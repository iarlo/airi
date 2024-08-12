import { create } from 'zustand';

interface UserState {
  userCount: number;
  update: (by: number) => void;
}

const useUserCountStore = create<UserState>()((set) => ({
  userCount: 0,
  update: (newValue) => set(() => ({ userCount: newValue })),
}));

export default useUserCountStore;
