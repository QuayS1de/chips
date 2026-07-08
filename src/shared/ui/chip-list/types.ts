import type { ChipItem } from '../chip-button/types';

export interface ChipListProps {
  /** Массив чипов для отображения */
  items: ChipItem[];

  /** Расстояние между чипами в пикселях */
  gap?: number;

  /** Закрывать ли попап при клике на чип внутри него */
  closeOnChildClick?: boolean;

  /** Колбэк при клике на чип */
  onClick?: (item: ChipItem) => void;
}
