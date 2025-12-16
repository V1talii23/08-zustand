'use client';

type Props = { error?: Error };

function ErrorMsg({ error }: Props) {
  if (!error) return <p>Something went wrong </p>;

  return <p>Could not fetch the list of notes. {error.message}</p>;
}

export default ErrorMsg;
