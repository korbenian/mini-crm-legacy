import { create } from 'zustand';

type UserProfile = {
  uid: string;
  email: string | null;
  name: string;
  avatarUrl?: string;
};

type UserStore = {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
