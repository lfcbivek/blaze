// Zustand store to handle loading globally in the application

import { create } from 'zustand';

type LoaderStore = {
    loading: boolean;
    showLoader(): void;
    hideLoader(): void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
    loading: false,
    showLoader: () => set({ loading: true }),
    hideLoader: () => set({ loading: false }),
  }));