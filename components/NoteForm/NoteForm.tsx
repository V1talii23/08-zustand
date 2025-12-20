'use client';

import css from './NoteForm.module.css';
import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNoteDraft } from '../../lib/store/noteStore';
import { Metadata } from 'next';

import { KEY } from '@/types/constants';
import { createNote } from '@/lib/api';
import type { CreateNoteData } from '@/types/note';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create a new note and keep your thoughts organized.',
  openGraph: {
    title: 'Create Note',
    description: 'Create a new note and keep your thoughts organized.',
    url: 'https://08-zustand-k51s5autg-v1talii23s-projects.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub',
      },
    ],
  },
};

function NoteForm() {
  const id = useId();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraft();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateNoteData) => createNote(data),
  });

  const handleSubmit = (formData: FormData) => {
    const title = (formData.get('title') as string).trim();
    const content = (formData.get('content') as string).trim();
    const tag = formData.get('tag') as string;

    if (!title || !content) {
      alert('Please fill all the fields to create new note');
      return;
    }

    mutate(
      { title: title, content: content, tag: tag },
      {
        onSuccess: (data) => {
          console.log('Created note:', data);
          queryClient.invalidateQueries({ queryKey: [KEY] });
          clearDraft();
          router.push('/notes/filter/all');
        },
        onError: (error) => {
          console.log(error.message);
        },
      }
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          type="text"
          name="title"
          id={`${id}-title`}
          value={draft.title}
          className={css.input}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          rows={8}
          name="content"
          id={`${id}-content`}
          value={draft.content}
          className={css.textarea}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          name="tag"
          id={`${id}-tag`}
          value={draft.tag}
          className={css.select}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.push('/notes/filter/all')}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending && true}
        >
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
