interface Type {
  id: number;
  title: string;
}

interface Series {
  id: string;
  title: string;
  fullName: string;
  koTitle: string;
  series: string;
  open: string;
  platform: string;
}

interface Weak {
  id: string;
  title: string;
  char: string;
}

interface Item {
  id: string;
  img: string;
  icon: string;
  name: string;
  nickname1: string;
  nickname2: string;
  type: string;
  species: string;
  seriesId: string[];
  infoSeriesId: string[];
  title: string | null;
  titleId: string | null;
  weakEl: string[];
  element: string[];
  ailment: string[];
  small: string;
  large: string;
  flash: boolean;
  sonic: boolean;
  dung: boolean;
  shock: boolean;
  pitfall: boolean;
  break: string[];
  weak: {
    부위: string;
    참격: string;
    타격: string;
    "탄/활": string;
    화: string;
    수: string;
    뇌: string;
    빙: string;
    용: string;
  }[];
  relate: {
    id: string;
    icon: string[];
    name: string;
  }[];
  eco: string[];
}
