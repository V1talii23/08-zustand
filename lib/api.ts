import axios from 'axios';
import type { Note, CreateNoteData } from '@/types/note';

const NOTES_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const URL = '/notes';

interface HttpsResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${NOTES_KEY}`;

const getNotes = async (search: string, page: number, tag?: string) => {
  const { data } = await axios.get<HttpsResponse>(URL, {
    params: { page, perPage: 12, search, tag },
  });
  return data;
};

const getNoteById = async (id: string) => {
  const { data } = await axios.get<Note>(`${URL}/${id}`);
  return data;
};

const createNote = async (data: CreateNoteData) => {
  const res = await axios.post<Note>(URL, data);
  return res.data;
};

const deleteNote = async (id: Note['id']) => {
  const res = await axios.delete<Note>(`${URL}/${id}`);
  return res.data;
};

export { getNotes, createNote, deleteNote, getNoteById };
