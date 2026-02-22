interface Series {
  id: string;
  title: string;
  fullName: string;
  series: string;
}

interface Type {
  id: number;
  title: string;
}

interface Weak {
  id: string;
  title: string;
}

interface CardContent {
  id: string;
  icon: string;
  title: string | null;
  titleId: string[] | null;
  type: string;
  name: string;
  color: string;
}

interface Content extends CardContent {
  img: string;
  nickname1: string | null;
  nickname2: string | null;
  species: string;
  seriesId: string[];
  relate: string[] | null;
  eco: string;
}

interface SeriesInfo {
  id: string;
  title: string;
  haveData: boolean;
  element: string[];
  ailment: string[];
  weakEl: string[];
  small: string;
  large: string;
  flash: string;
  sonic: string;
  dung: string;
  shock: string;
  pitfall: string;
  break: string[];
  weak: { [key: string]: string }[];
}
