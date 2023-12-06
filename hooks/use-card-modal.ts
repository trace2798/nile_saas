// import { create } from "zustand";

// type CardModalStore = {
//   id?: string;
//   isOpen: boolean;
//   onOpen: (id: string) => void;
//   onClose: () => void;
// };

// export  const useCardModal = create<CardModalStore>((set) => ({
//   id: undefined,
//   isOpen: false,
//   onOpen: (id: string) => set({ isOpen: true, id }),
//   onClose: () => set({ isOpen: false, id: undefined }),
// }));

import { create } from "zustand";

type CardModalStore = {
  id?: string;
  userInfo?: any; // Add this line
  isOpen: boolean;
  onOpen: (id: string, userInfo: any) => void; // Modify this line
  onClose: () => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  userInfo: undefined, // Add this line
  isOpen: false,
  onOpen: (id: string, userInfo: any) => set({ isOpen: true, id, userInfo }), // Modify this line
  onClose: () => set({ isOpen: false, id: undefined, userInfo: undefined }), // Modify this line
}));

