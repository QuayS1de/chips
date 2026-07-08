import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './popup.module.css';
import type { PopupProps } from './types';

/**
 * Компонент попапа с позиционированием относительно якоря.
 * Рендерится через портал в document.body.
 */
export const Popup = ({ anchorEl, open, onClose, children }: PopupProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const EDGE_PADDING = 10;

  const calculatePosition = () => {
    if (!anchorEl.current || !popoverRef.current) return;

    const rect = anchorEl.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    let top = rect.bottom + 6;
    let left = rect.left;

    const maxLeft = window.innerWidth - popoverRect.width - EDGE_PADDING;
    if (left > maxLeft) {
      left = maxLeft;
    }

    if (left < EDGE_PADDING) {
      left = EDGE_PADDING;
    }

    if (top + popoverRect.height > window.innerHeight - EDGE_PADDING) {
      top = rect.top - popoverRect.height - 6;
    }

    if (top < EDGE_PADDING) {
      top = EDGE_PADDING;
    }

    setPos({ top, left });
  };

  useLayoutEffect(() => {
    if (!open) return;
    calculatePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, children]);

  useEffect(() => {
    if (!open || !anchorEl.current) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(calculatePosition);
    });

    observer.observe(anchorEl.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, anchorEl.current]);

  useEffect(() => {
    if (!open || !popoverRef.current) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(calculatePosition);
    });

    observer.observe(popoverRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculatePosition);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', calculatePosition, true);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', calculatePosition, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        anchorEl.current &&
        !anchorEl.current.contains(target)
      ) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, anchorEl]);

  if (!open) return null;

  return createPortal(
    <div
      ref={popoverRef}
      className={styles['popup-container']}
      style={{
        top: pos.top,
        left: pos.left,
        maxWidth: `calc(100vw - ${EDGE_PADDING * 2}px)`,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};
