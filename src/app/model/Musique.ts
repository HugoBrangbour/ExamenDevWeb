export interface Musique {
  id?: number;
  title?: string;
  description?: string;
  album?: string;
  artist?: string;
  duration?: string;
  date?: string;
  picture?: string | ArrayBuffer | null;
  styles?: string[];
}
