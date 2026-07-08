import './App.css';
import { sampleItems, sampleItemsWithProps } from './mocks/sample-items';
import { ChipButton } from './shared/ui/chip-button/chip-button';
import { ChipList } from './shared/ui/chip-list/chip-list';

function App() {
  return (
    <div className="main container">
      <div className="main-item">
        <div>Пример чистого списка:</div>
        <ChipList
          items={sampleItems}
          onClick={(item) => {
            console.log('выбранный элемент:', item);
          }}
        />
      </div>
      <div className="main-item">
        <div>Пример списка с дополнительными свойствами</div>
        <ChipList
          items={sampleItemsWithProps}
          onClick={(item) => {
            console.log('выбранный элемент:', item);
          }}
          closeOnChildClick={false}
        />
      </div>
      <div className="main-item">
        <div>Чипс вне списка (Передача названия через label)</div>
        <ChipButton label="Чипс вне списка 1" />
      </div>
      <div className="main-item">
        <div>Чипс вне списка (Передача названия через children)</div>
        <ChipButton
          onClick={() => {
            console.log('Клик по одиночному чипсу');
          }}
        >
          Чипс вне списка 2
        </ChipButton>
      </div>
    </div>
  );
}

export default App;
