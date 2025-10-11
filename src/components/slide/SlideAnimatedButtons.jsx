import { useDrag } from '@use-gesture/react';
import React, { useMemo, memo } from 'react';
import { useSpring, animated } from 'react-spring';

const SlideAnimatedButtons = memo(
  ({ primaryOutcome, secondaryOutcome, primaryWinAmount, secondaryWinAmount, onSwipeSuccess }) => {
    const [
      {
        x: primaryX,
        scale: primaryScale,
        acceptedOpacity: primaryAcceptedOpacity,
        backgroundOpacity: primaryBackgroundOpacity,
      },
      primaryApi,
    ] = useSpring(() => ({
      x: 0,
      scale: 1,
      acceptedOpacity: 0,
      backgroundOpacity: 0,
    }));

    const bindPrimary = useDrag(
      ({ active, movement: [mx] }) => {
        // Ограничиваем движение только влево
        const movementX = mx < 0 ? mx : 0;

        // Если свайп влево достаточно сильный, делаем ставку
        if (!active && mx < -100) {
          onSwipeSuccess?.(primaryOutcome);

          // Показываем фон и текст "Accepted"
          primaryApi.start({
            acceptedOpacity: 1,
            backgroundOpacity: 1,
            immediate: true,
          });

          // Отправляем элемент за экран влево
          primaryApi.start({
            x: -window.innerWidth,
            scale: 1,
            config: { tension: 200, friction: 20 },
            onRest: () => {
              // После того как элемент уехал за экран, держим его там 1400ms и возвращаем
              primaryApi.start({
                x: 0,
                acceptedOpacity: 0,
                backgroundOpacity: 0,
                delay: 1400,
                config: { tension: 200, friction: 25 },
              });
            },
          });

          return;
        }

        primaryApi.start({
          x: active ? movementX : 0,
          scale: active && mx < 0 ? 1.1 : 1,
          immediate: name => active && name === 'x',
        });
      },
      {
        axis: 'x',
      }
    );

    // Анимация для правой кнопки (secondary) - тянется только вправо
    const [
      {
        x: secondaryX,
        scale: secondaryScale,
        acceptedOpacity: secondaryAcceptedOpacity,
        backgroundOpacity: secondaryBackgroundOpacity,
      },
      secondaryApi,
    ] = useSpring(() => ({
      x: 0,
      scale: 1,
      acceptedOpacity: 0,
      backgroundOpacity: 0,
    }));

    const bindSecondary = useDrag(
      ({ active, movement: [mx] }) => {
        // Ограничиваем движение только вправо
        const movementX = mx > 0 ? mx : 0;

        // Если свайп вправо достаточно сильный, делаем ставку
        if (!active && mx > 100) {
          onSwipeSuccess?.(secondaryOutcome);

          // Показываем фон и текст "Accepted"
          secondaryApi.start({
            acceptedOpacity: 1,
            backgroundOpacity: 1,
            immediate: true,
          });

          // Отправляем элемент за экран вправо
          secondaryApi.start({
            x: window.innerWidth,
            scale: 1,
            config: { tension: 200, friction: 20 },
            onRest: () => {
              // После того как элемент уехал за экран, держим его там 1400ms и возвращаем
              secondaryApi.start({
                x: 0,
                acceptedOpacity: 0,
                backgroundOpacity: 0,
                delay: 1400,
                config: { tension: 200, friction: 25 },
              });
            },
          });

          return;
        }

        secondaryApi.start({
          x: active ? movementX : 0,
          scale: active && mx > 0 ? 1.1 : 1,
          immediate: name => active && name === 'x',
        });
      },
      {
        axis: 'x',
      }
    );

    // Стили для анимированных кнопок
    const primaryButtonStyle = useMemo(
      () => ({
        x: primaryX,
        scale: primaryScale,
      }),
      [primaryX, primaryScale]
    );

    const secondaryButtonStyle = useMemo(
      () => ({
        x: secondaryX,
        scale: secondaryScale,
      }),
      [secondaryX, secondaryScale]
    );

    // Стили для фона - появляется только при успешном свайпе
    const primaryBackgroundStyle = useMemo(
      () => ({
        opacity: primaryBackgroundOpacity,
      }),
      [primaryBackgroundOpacity]
    );

    const secondaryBackgroundStyle = useMemo(
      () => ({
        opacity: secondaryBackgroundOpacity,
      }),
      [secondaryBackgroundOpacity]
    );

    // Стили для текста "Accepted"
    const primaryAcceptedStyle = useMemo(
      () => ({
        opacity: primaryAcceptedOpacity,
      }),
      [primaryAcceptedOpacity]
    );

    const secondaryAcceptedStyle = useMemo(
      () => ({
        opacity: secondaryAcceptedOpacity,
      }),
      [secondaryAcceptedOpacity]
    );

    return (
      <div className="sb-Slide__outcomes-container">
        <div className="sb-Slide__outcome-wrapper">
          <animated.div
            className="sb-Slide__outcome-background sb-Slide__outcome-background--primary"
            style={primaryBackgroundStyle}>
            <animated.div className="sb-Slide__outcome-accepted" style={primaryAcceptedStyle}>
              Accepted ✓
            </animated.div>
          </animated.div>
          <animated.div
            {...bindPrimary()}
            className="sb-Slide__outcome sb-Slide__outcome--primary"
            style={primaryButtonStyle}>
            <div className="sb-Slide__outcome-content">
              <div className="sb-Slide__outcome-name">{primaryOutcome.name}</div>
              <div className="sb-Slide__outcome-win">
                <span className="sb-Slide__outcome-amount">+${primaryWinAmount}</span>
                <span className="sb-Slide__outcome-odds">{primaryOutcome.odds}</span>
              </div>
            </div>
          </animated.div>
        </div>

        <div className="sb-Slide__outcome-wrapper">
          <animated.div
            className="sb-Slide__outcome-background sb-Slide__outcome-background--secondary"
            style={secondaryBackgroundStyle}>
            <animated.div className="sb-Slide__outcome-accepted" style={secondaryAcceptedStyle}>
              Accepted ✓
            </animated.div>
          </animated.div>
          <animated.div
            {...bindSecondary()}
            className="sb-Slide__outcome sb-Slide__outcome--secondary"
            style={secondaryButtonStyle}>
            <div className="sb-Slide__outcome-content">
              <div className="sb-Slide__outcome-name">{secondaryOutcome.name}</div>
              <div className="sb-Slide__outcome-win">
                <span className="sb-Slide__outcome-amount">+${secondaryWinAmount}</span>
                <span className="sb-Slide__outcome-odds">{secondaryOutcome.odds}</span>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    );
  }
);

SlideAnimatedButtons.displayName = 'SlideAnimatedButtons';

export { SlideAnimatedButtons };
