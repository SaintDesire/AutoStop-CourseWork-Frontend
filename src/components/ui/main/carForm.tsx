import { useState, ChangeEvent, FormEvent } from 'react';

interface CarFormProps {
  onSubmit: (car: { model: string; year: string; price: string }) => void;
}

const CarForm: React.FC<CarFormProps> = ({ onSubmit }) => {
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ model, year, price });

    setModel('');
    setYear('');
    setPrice('');
  };

  const handleModelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <label>
        Модель:
        <input
          type="text"
          value={model}
          onChange={handleModelChange}
          required
        />
      </label>
      <label>
        Год:
        <input
          type="number"
          value={year}
          onChange={handleYearChange}
          required
        />
      </label>
      <label>
        Цена:
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          required
        />
      </label>
      <button type="submit">Разместить объявление</button>
    </form>
  );
};

export default CarForm;
