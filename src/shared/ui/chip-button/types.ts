import type { CSSProperties, ReactNode } from 'react';

interface UIProps {
  /** Состояние "недоступен" */
  disabled?: boolean;

  /** Кастомные инлайн стили */
  externalStyle?: CSSProperties;

  /** Дополнительный CSS-класс */
  className?: string;
}

export interface ChipItem extends UIProps {
  /** ID переданного элемента */
  id: string;

  /** Текстовая метка чипа */
  label: string;

  /** Колбэк при клике. Получает элемент данных, если передан */
  onClick?: (item?: ChipItem) => void;
}

export interface ChipButtonProps extends UIProps {
  /** Элемент данных (используется внутри ChipList) */
  item?: ChipItem;

  /** Состояние выделения */
  selected?: boolean;

  /** Состояние "недоступен" */
  visible?: boolean;

  /** Колбэк при клике. Получает элемент данных, если передан */
  onClick?: (item?: ChipItem) => void;

  /** Реф для регистрации в ResizeObserver (для ChipList) */
  registerRef?: (el: HTMLButtonElement | null) => void;

  /** Текстовая метка чипа */
  label?: string;

  /** Кастомное содержимое (имеет приоритет над label) */
  children?: ReactNode;
}
