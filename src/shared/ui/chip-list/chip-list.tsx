import { useEffect, useRef, useState, useCallback } from 'react';
import { ChipButton } from '../chip-button/chip-button';
import { Popup } from '../popup/popup';
import styles from './сhip-list.module.css';
import type { ChipListProps } from './types';

/**
 * Компонент списка чипов с адаптивным скрытием.
 *
 * Автоматически перерасчитывает количество видимых чипов при изменении
 * размера контейнера. Лишние чипы скрываются, а вместо них появляется
 * кнопка `...`, по клику на которую открывается попап.
 */
export const ChipList = ({
  items,
  gap = 6,
  closeOnChildClick = true,
  onClick,
}: ChipListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const moreChipRef = useRef<HTMLButtonElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const calculateVisible = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;

    if (containerWidth === 0) return;

    const moreChipWidth =
      moreChipRef.current?.getBoundingClientRect().width || 0;

    let totalWidth = 0;
    let count = 0;

    for (let i = 0; i < items.length; i++) {
      const chip = chipRefs.current[i];
      if (!chip) continue;

      const chipWidth = chip.getBoundingClientRect().width;
      if (chipWidth === 0) continue;

      const newTotal = totalWidth + chipWidth + (count > 0 ? gap : 0);
      const hasMoreAfter = i < items.length - 1;
      const availableWidth =
        containerWidth - (hasMoreAfter ? moreChipWidth + gap : 0);

      if (newTotal <= availableWidth) {
        totalWidth = newTotal;
        count = i + 1;
      } else {
        break;
      }
    }

    setVisibleCount(count);

    if (count === items.length && popoverOpen) {
      setPopoverOpen(false);
    }
  }, [items.length, gap, popoverOpen]);

  useEffect(() => {
    calculateVisible();

    const resizeObserver = new ResizeObserver(() => {
      calculateVisible();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateVisible]);

  const hiddenItems = items.slice(visibleCount);
  const hasHidden = hiddenItems.length > 0;

  return (
    <>
      <div ref={containerRef} className={styles['chip-list']} style={{ gap }}>
        {items.map((item, index) => (
          <ChipButton
            key={item.id}
            item={item}
            visible={index < visibleCount}
            selected={item.id === selectedId}
            disabled={item.disabled}
            onClick={(item) => {
              if (item) {
                onClick?.(item);
                setSelectedId(item.id);
                item.onClick?.(item);
              }
            }}
            registerRef={(el) => {
              chipRefs.current[index] = el;
            }}
            externalStyle={item.externalStyle}
            className={`${styles['popover-chip-button']} ${item.className ? item.className : ''}`.trim()}
          />
        ))}

        <ChipButton
          item={{ id: 'more', label: '...' }}
          visible={hasHidden}
          selected={false}
          onClick={() => setPopoverOpen(true)}
          registerRef={(el) => {
            moreChipRef.current = el;
          }}
        />
      </div>

      <Popup
        anchorEl={moreChipRef}
        open={popoverOpen}
        onClose={() => setPopoverOpen(false)}
      >
        <div className={styles['popover-chip-list']} style={{ gap }}>
          {hiddenItems.map((item) => (
            <ChipButton
              key={item.id}
              item={item}
              visible={true}
              selected={item.id === selectedId}
              onClick={(item) => {
                if (item) {
                  onClick?.(item);
                  setSelectedId(item.id);
                  item.onClick?.(item);
                }
                if (closeOnChildClick) {
                  setPopoverOpen(false);
                }
              }}
              registerRef={() => {}}
              externalStyle={item.externalStyle}
              className={`${styles['popover-chip-button']} ${item.className ? item.className : ''}`.trim()}
            />
          ))}
        </div>
      </Popup>
    </>
  );
};
