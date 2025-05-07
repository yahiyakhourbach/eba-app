import { create } from 'zustand';

type searchType = {
  search: string;
  setSearch: (param: string) => void;
};

export const useSearchEventStor = create<searchType>()((set) => ({
  search: '',
  setSearch: (param) => set(() => ({ search: param })),
}));
