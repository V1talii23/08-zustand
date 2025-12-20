import css from '@/app/page.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create new note',
  description: 'Page for creating new notes',
  openGraph: {
    title: 'Note Hub, Create your note here',
    description: 'Page for creating new notes',
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

function CreateNote() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  );
}

export default CreateNote;
