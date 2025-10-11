# Slide Component

Компонент Slide для отображения ставок в стиле TikTok/Instagram Reels.

## Описание

Компонент Slide предназначен для отображения спортивных ставок в формате коротких видео или баннеров, аналогично популярным платформам как TikTok или Instagram Reels. Компонент поддерживает два типа контента: видео ставки (betVideo) и баннерные ставки (betBanner).

## Основные возможности

- 🎥 Поддержка YouTube видео с зацикливанием
- 🎨 Современный UI в стиле Reels/Shorts
- 📱 Адаптивный дизайн для мобильных устройств
- ⚡ Анимации и переходы
- 🎯 Отображение двух исходов с приоритетом выигрыша
- 📊 Информация о событии (команды, счет, время)

## Использование

```jsx
import { Slide, mapBetDataToSlide } from '@sportsbook/common/components/slide';

const MyComponent = () => {
  const slide = mapBetDataToSlide(betData);

  return (
    <Slide slide={slide} />
  );
};
```

## Props

### Slide

| Prop | Тип | Обязательный | Описание |
|------|-----|-------------|----------|
| `slide` | `Slide` | Да | Объект слайда с данными о ставке |
| `className` | `string` | Нет | Дополнительные CSS классы |

### Slide (тип данных)

```typescript
interface Slide {
  type: 'betVideo' | 'betBanner';
  event: {
    type: string;
    league: string;
    teams: {
      home: { name: string; id: number };
      away: { name: string; id: number };
    };
    start_time: string;
    score?: string;
    video?: {
      url: string;
      type: 'youtube';
      loop_start_time_code: string;
      loop_end_time_code: string;
    };
  };
  primaryOutcome: {
    name: string;
    odds: number;
    id: number;
  };
  secondaryOutcome: {
    name: string;
    odds: number;
    id: number;
  };
}
```

## Маппер данных

Функция `mapBetDataToSlide` преобразует исходные данные ставки в унифицированный формат Slide:

```javascript
import { mapBetDataToSlide } from '@sportsbook/common/components/slide';

const rawBetData = {
  event: {
    type: "tennis",
    league: "ATP, Wimbledon",
    teams: {
      home: { name: "Djokovic", id: 3001 },
      away: { name: "Federer", id: 3002 }
    },
    start_time: "2025-10-11T14:00:00+01:00",
    video: {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      type: "youtube",
      loop_start_time_code: "00:00:30",
      loop_end_time_code: "00:01:30"
    }
  },
  markets: [
    {
      id: "set_handicap",
      name: "Set handicap",
      selections: [
        { id: 3003, name: "Djokovic -1.5", odds: 2.40 },
        { id: 3004, name: "Federer +1.5", odds: 1.55 }
      ]
    }
  ]
};

const slide = mapBetDataToSlide(rawBetData);
```

## Стилизация

Компонент использует SCSS модули. Основные CSS классы:

- `.sb-Slide` - основной контейнер
- `.sb-Slide__background` - фон (видео или баннер)
- `.sb-Slide__event-info` - информация о событии
- `.sb-Slide__outcomes` - контейнер исходов
- `.sb-Slide__outcome--primary` - основной исход (приоритет выигрыша)
- `.sb-Slide__outcome--secondary` - вторичный исход (коэффициент)

## Адаптивность

Компонент полностью адаптивен и оптимизирован для:
- Десктопных устройств (полноэкранный режим)
- Мобильных устройств (вертикальная ориентация)
- Планшетов (промежуточные размеры)

## Анимации

- Плавные переходы между слайдами
- Анимация появления элементов
- Hover эффекты для интерактивных элементов
- Пульсирующая анимация кнопки воспроизведения

## Примеры использования

### Базовое использование

```jsx
import { Slide, mapBetDataToSlide } from '@sportsbook/common/components/slide';

const BetSlider = ({ betData }) => {
  const slide = mapBetDataToSlide(betData);
  
  return <Slide slide={slide} />;
};
```

### С навигацией между слайдами

```jsx
const BetSlider = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = mapBetDataToSlide(events[currentIndex]);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };
  
  return (
    <div>
      <Slide slide={slide} />
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};
```

### Кастомные стили

```jsx
<Slide 
  slide={slide} 
  className="my-custom-slide"
/>
```

```scss
.my-custom-slide {
  .sb-Slide__outcome--primary {
    border-color: #custom-color;
  }
}
```
