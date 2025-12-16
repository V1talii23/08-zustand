import css from './Error.module.css';

export default function Error() {
  return (
    <p className={css.text}>Looks like there are no notes with this tag yet.</p>
  );
  // return <p className={css.text}>There was an error, please try again...</p>;
}
