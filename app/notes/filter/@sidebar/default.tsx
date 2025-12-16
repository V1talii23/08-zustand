// import { getNotes } from '@/lib/api';
import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { Note } from '@/types/note';

const tags: Note['tag'][] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

async function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>

      {tags.map((tag) => (
        <li key={tags.indexOf(tag)} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarNotes;
