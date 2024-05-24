import { IGenre } from '@/models/Movie';
import styles from './Filter.module.scss';
import { Button, Group, MultiSelect, NumberInput, Select } from '@mantine/core';
import { createFormActions, useForm } from '@mantine/form';
import Image from 'next/image';
import { useState } from 'react';

interface IFilterProps {
  genres: IGenre[];
  setFilter: (values: IFilterFormValues) => void;
}

export interface IFilterFormValues {
  genres?: string[];
  year?: string;
  lte?: number | null;
  gte?: number | null;
  sort?: string;
}

const sortList = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Most Rated' },
  { value: 'vote_average.asc', label: 'Least Rated' },
  { value: 'vote_count.desc', label: 'Most Voted' },
  { value: 'vote_count.asc', label: 'Least Voted' },
  { value: 'revenue.desc', label: 'Highest revenue' },
  { value: 'revenue.asc', label: 'Lowest revenue' },
  { value: 'primary_release_date.desc', label: 'Newest' },
  { value: 'primary_release_date.asc', label: 'Oldest' },
  { value: 'title.desc', label: 'Title A-Z' },
  { value: 'title.asc', label: 'Title Z-A' },
  { value: 'original_title.desc', label: 'Original Title A-Z' },
  { value: 'original_title.asc', label: 'Original Title Z-A' },
];

export const filterFormActions = createFormActions<IFilterFormValues>('filter-form');

const Filter: React.FC<IFilterProps> = ({ genres, setFilter }) => {
  const form = useForm<IFilterFormValues>({
    mode: 'uncontrolled',
    name: 'filter-form',
    initialValues: {
      genres: [],
      year: '',
      lte: null,
      gte: null,
      sort: 'popularity.desc',
    },
    onValuesChange: (values) => {
      setFilter(values);
      console.log(values);
    },
  });

  const yearsData: string[] = [];
  for (let i = 2024; i >= 1900; i--) {
    yearsData.push(i.toString());
  }

  const genresList = genres.map((genre) => {
    return { value: `${genre.id}`, label: genre.name };
  });

  const [isOpenGenres, setIsOpenGenres] = useState(false);
  const changeOpenGenres = () => setIsOpenGenres(!isOpenGenres);

  const [isOpenYear, setIsOpenYear] = useState(false);
  const changeOpenYear = () => setIsOpenYear(!isOpenYear);

  const [isOpenSort, setIsOpenSort] = useState(false);
  const changeOpenSort = () => setIsOpenSort(!isOpenSort);

  return (
    <form className={styles.form} onSubmit={form.onSubmit((values) => console.log(values))}>
      <div className={styles.row}>
        <MultiSelect
          classNames={{
            pill: styles.pill,
            pillsList: styles.pillsList,
            option: styles.option,
            input: styles.selectInput,
            label: styles.label,
          }}
          label="Genres"
          placeholder="Select genre"
          data={genresList}
          key={form.key('genres')}
          {...form.getInputProps('genres')}
          withCheckIcon={false}
          clearable={true}
          rightSection={
            <Image
              src={isOpenGenres ? '/arrow-down.svg' : '/arrow-up.svg'}
              alt="arrow"
              width={24}
              height={24}
            />
          }
          onDropdownOpen={changeOpenGenres}
          onDropdownClose={changeOpenGenres}
        />
        <Select
          classNames={{
            option: styles.option,
            input: styles.selectInput,
            label: styles.label,
          }}
          label="Select release year"
          placeholder="Pick value"
          data={yearsData}
          key={form.key('year')}
          {...form.getInputProps('year')}
          withCheckIcon={false}
          rightSection={
            <Image
              src={isOpenYear ? '/arrow-down.svg' : '/arrow-up.svg'}
              alt="arrow"
              width={24}
              height={24}
            />
          }
          onDropdownOpen={changeOpenYear}
          onDropdownClose={changeOpenYear}
        />
        <div className={styles.numberContainer}>
          <NumberInput
            classNames={{
              input: styles.numberInput,
              control: styles.numberControl,
              label: styles.label,
            }}
            key={form.key('lte')}
            {...form.getInputProps('gte')}
            label="Ratings"
            placeholder="From"
            clampBehavior="strict"
            min={0}
            max={10}
            step={1}
          />
          <NumberInput
            classNames={{
              input: styles.numberInput,
              control: styles.numberControl,
              label: styles.label,
            }}
            key={form.key('gte')}
            {...form.getInputProps('lte')}
            label=" "
            placeholder="To"
            clampBehavior="strict"
            min={0}
            max={10}
            step={1}
          />
        </div>
        <Group justify="flex-end" mt="md">
          <Button
            variant="transparent"
            className={styles.button}
            onClick={() => filterFormActions.reset()}
          >
            Reset filters
          </Button>
        </Group>
      </div>
      <div className={styles.row}>
        <Select
          classNames={{
            option: styles.option,
            input: styles.selectInput,
            label: styles.label,
          }}
          label="Sort by"
          data={sortList}
          key={form.key('sort')}
          {...form.getInputProps('sort')}
          withCheckIcon={false}
          rightSection={
            <Image
              src={isOpenSort ? '/arrow-down.svg' : '/arrow-up.svg'}
              alt="arrow"
              width={24}
              height={24}
            />
          }
          onDropdownOpen={changeOpenSort}
          onDropdownClose={changeOpenSort}
        />
      </div>
    </form>
  );
};

export default Filter;
