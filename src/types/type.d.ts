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

interface Content {
  id: string;
  img: string;
  icon: string;
  name: string;
  nickname1: string | null;
  nickname2: string | null;
  type: string;
  species: string;
  seriesId: string[];
  title: string | null;
  titleId: string[] | null;
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
  relate: string[];
  color: string;
  weak: { [key: string]: string }[];
  eco: string;
}
