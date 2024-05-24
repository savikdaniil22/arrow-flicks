import { Modal, Text, Rating as MantineRating, Group, Button } from '@mantine/core';
import { IMovieShort } from '@/models/Movie';
import styles from './RatingPopup.module.scss';
import { useEffect, useState } from 'react';
import { getLocalStoreItems } from '@/helpers/localStorage';

interface IRatingProps {
  opened: boolean;
  movie: IMovieShort;
  modaleClose: () => void;
  addMovie: (movie: IMovieShort) => void;
  deleteMovie: (movie: IMovieShort) => void;
}

const RatingPopup: React.FC<IRatingProps> = ({
  opened,
  movie,
  modaleClose,
  addMovie,
  deleteMovie,
}) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const storedMovies = getLocalStoreItems();
    const storedMovie = storedMovies.find((storedMovie) => storedMovie.id === movie.id);
    if (typeof storedMovie?.rating === 'number') {
      setRating(storedMovie.rating);
    }
  }, [movie]);

  const handleSave = () => {
    const movieWithRating = { ...movie, rating };
    addMovie(movieWithRating);
    modaleClose();
  };

  const handleDelete = () => {
    deleteMovie(movie);
    modaleClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => modaleClose()}
      title="Your rating"
      centered
      closeButtonProps={{
        style: { color: 'rgba(172, 173, 185, 1)' },
      }}
      styles={{
        content: {
          maxWidth: '380px',
          borderRadius: '8px',
          header: {
            maxWidth: '48px',
          },
          title: {
            fontWeight: 500,
            fontSize: '16px',
          },
        },
      }}
    >
      <Text className={styles.modalTitle}>{movie.original_title}</Text>
      <div className={styles.mantineRating}>
        <MantineRating
          count={10}
          size={'xl'}
          value={rating}
          styles={{
            symbolBody: {
              margin: '0 3px 0 0',
            },
          }}
          onChange={setRating}
        />
      </div>
      <Group>
        <Button className={styles.fillButton} onClick={handleSave}>
          Save
        </Button>
        <Button variant="transparent" className={styles.transporentButton} onClick={handleDelete}>
          Remove rating
        </Button>
      </Group>
    </Modal>
  );
};

export default RatingPopup;
