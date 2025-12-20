import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateNoteData } from '@/types/note';

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteDraft {
  draft: CreateNoteData;
  setDraft: (note: CreateNoteData) => void;
  clearDraft: () => void;
}

export const useNoteDraft = create<NoteDraft>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'new-note',
      partialize: (note) => ({ draft: note.draft }),
    }
  )
);
