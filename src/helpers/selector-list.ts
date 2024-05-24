export const sortList = [
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

export const yearsData: string[] = [];
for (let i = 2024; i >= 1900; i--) {
  yearsData.push(i.toString());
}
