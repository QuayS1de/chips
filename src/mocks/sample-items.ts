import type { ChipItem } from '../shared/ui/chip-button/types';

export const sampleItems: ChipItem[] = [
  { id: '1', label: 'Чипс 1' },
  { id: '2', label: 'Чипс 2' },
  { id: '3', label: 'Чипс 3' },
  { id: '4', label: 'Чипс 4' },
  { id: '5', label: 'Чипс 5' },
  { id: '6', label: 'Чипс 6' },
  { id: '7', label: 'Чипс 7' },
  { id: '8', label: 'Чипс 8' },
  { id: '9', label: 'Чипс 9' },
  { id: '10', label: 'Чипс 10' },
  { id: '11', label: 'Чипс 11' },
  { id: '12', label: 'Чипс 12' },
  { id: '13', label: 'Чипс 13' },
];

export const sampleItemsWithProps: ChipItem[] = [
  { id: '1', label: 'Чипс 1' },
  { id: '2', label: 'Чипс 2', disabled: true },
  { id: '3', label: 'Чипс 3', className: 'test' },
  { id: '4', label: 'Чипс 4', externalStyle: { color: 'green' } },
  {
    id: '5',
    label: 'Чипс 5',
    onClick: (item) => {
      console.log(
        'Пример отдельного навешивания события клика по выбранному элементу',
        'ID элемента: ' + item?.id,
      );
    },
  },
  { id: '6', label: 'Чипс 6' },
  { id: '7', label: 'Чипс 7' },
  { id: '8', label: 'Чипс 8' },
  { id: '9', label: 'Чипс 9' },
  { id: '10', label: 'Чипс 10' },
  { id: '11', label: 'Чипс 11' },
  { id: '12', label: 'Чипс 12' },
  { id: '13', label: 'Чипс 13' },
];
