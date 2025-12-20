import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { KEY } from '@/types/constants';

type FilteredNotesProps = {
  params: Promise<{ slug: string[] }>;
};

export const generateMetadata = async ({
  params,
}: FilteredNotesProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  if (!tag)
    return {
      title: `Notes`,
      description: `All notes`,
      openGraph: {
        title: 'Notes page',
        description: 'All notes',
        url: 'https://08-zustand-k51s5autg-v1talii23s-projects.vercel.app/notes/filter/all',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'Notes page',
          },
        ],
      },
    };

  return {
    title: `Notes: ${tag}`,
    description: `Notes filtered by tag: ${tag}`,

    openGraph: {
      title: `${tag} notes`,
      description: `Notes filtered by tag: ${tag}`,
      url: `https://08-zustand-k51s5autg-v1talii23s-projects.vercel.app/notes/filter/${tag}`,
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
};

async function FilteredNotes({ params }: FilteredNotesProps) {
  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [KEY, tag],
    queryFn: () => getNotes('', 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default FilteredNotes;
