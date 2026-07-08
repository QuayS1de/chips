import type { ChipButtonProps } from './types';
import styles from './chip-button.module.css';

/**
 * Компонент чипа
 */
export const ChipButton = ({
  item,
  visible = true,
  selected = false,
  disabled = false,
  onClick,
  registerRef,
  label,
  children,
  externalStyle,
  className = '',
}: ChipButtonProps) => {
  const content = children ?? label ?? item?.label ?? '';

  const classes = [
    styles['chip-button'],
    selected && styles['chip-button--selected'],
    !visible && styles['chip-button--hidden'],
    !onClick && styles['chip-button--static'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (disabled) return;
    onClick?.(item);
  };

  return (
    <button
      ref={registerRef}
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={externalStyle}
      className={classes}
    >
      {content}
    </button>
  );
};
