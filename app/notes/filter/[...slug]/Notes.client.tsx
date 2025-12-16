'use client';

import css from '@/app/page.module.css';
import { KEY } from '@/types/constants';
import { getNotes } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Loader from '@/components/Loader/Loader';
import Error from '@/components/Error/Error';

interface NotesClientProps {
  tag?: string;
}

function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    const el = document.getElementById('modal');
    if (!el) alert('Something went wrong! Try to create note later.');
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = useDebouncedCallback((note: string) => {
    setSearch(note);
    setPage(1);
  }, 1000);

  const { data, isSuccess, error, isLoading } = useQuery({
    queryKey: [KEY, search, page, tag],
    queryFn: () => getNotes(search, page, tag),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  if (data && data?.notes.length < 1) return <Error />;

  if (isLoading) return <Loader />;

  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox onChange={handleSearch} value={search} />}
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pages={data.totalPages}
            handleChangePage={(page) => setPage(page)}
            currentPage={page}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>

      {isSuccess && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
