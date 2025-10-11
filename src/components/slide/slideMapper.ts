import { Slide, RawBetData } from './types';

export const createSlideMapper = (): ((data: RawBetData) => Slide) => {
  return (data: RawBetData): Slide => {
    // Определяем тип слайда на основе наличия видео
    const slideType = data.event.video ? 'betVideo' : 'betBanner';

    // Выбираем первые два исхода из первых двух markets
    const primaryMarket = data.markets[0];
    const secondaryMarket = data.markets[1] || data.markets[0];

    const primaryOutcome = primaryMarket?.selections[0] || {
      id: 0,
      name: 'N/A',
      odds: 0
    };

    const secondaryOutcome = secondaryMarket?.selections[1] || secondaryMarket?.selections[0] || primaryMarket?.selections[1] || {
      id: 0,
      name: 'N/A',
      odds: 0
    };

    return {
      type: slideType,
      event: {
        ...data.event,
        score: '0-0'
      },
      primaryOutcome,
      secondaryOutcome
    };
  };
};

export const mapBetDataToSlide = (data: RawBetData): Slide => {
  const mapper = createSlideMapper();
  return mapper(data);
};
