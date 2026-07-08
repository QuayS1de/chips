import type { ReactNode, RefObject } from 'react';

export interface PopupProps {
  /** Элемент-якорь, относительно которого позиционируется попап */
  anchorEl: RefObject<HTMLElement | null>;

  /** Состояние открытие попапа */
  open: boolean;

  /** Колбэк, вызываемый при закрытии попапа */
  onClose: () => void;

  /** Содержимое попапа */
  children: ReactNode;
}
