/* eslint-disable prefer-destructuring */
import React, { useRef, useMemo, useCallback } from 'react';

import { SlideAnimatedButtons } from './SlideAnimatedButtons';
import { SlideInfo } from './SlideInfo';

import './Slide.scss';

const Slide = ({ slide, betAmount, onOutcomeClick, hasSwipedOnce, isContainMode, className = '' }) => {
  const videoRef = useRef(null);

  const videoEmbedUrl = useMemo(() => {
    if (!slide.event.video) return null;

    const { video } = slide.event;
    let videoId = '';
    let startTime = '';

    if (video.url.includes('youtube.com/watch?v=')) {
      const urlParts = video.url.split('v=')[1]?.split('&');
      videoId = urlParts[0];

      const timeMatch = video.url.match(/[?&](?:t|start)=(\d+)/);
      if (timeMatch) {
        startTime = timeMatch[1];
      }
    } else if (video.url.includes('youtu.be/')) {
      const urlParts = video.url.split('youtu.be/')[1]?.split('?');
      videoId = urlParts[0];

      const timeMatch = video.url.match(/[?&]t=(\d+)/);
      if (timeMatch) {
        startTime = timeMatch[1];
      }
    }

    if (!videoId) return null;

    // Строим базовый URL
    let embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&cc_load_policy=0&disablekb=1&playsinline=1`;
    
    // Добавляем таймкод если он есть
    if (startTime) {
      embedUrl += `&start=${startTime}`;
    }

    return embedUrl;
  }, [slide.event]);

  const primaryWinAmount = useMemo(() => {
    const winAmount = (betAmount * slide.primaryOutcome.odds).toFixed(2);
    // eslint-disable-next-line no-console
    console.log(`🎯 Primary: ${betAmount} × ${slide.primaryOutcome.odds} = ${winAmount}`);
    return winAmount;
  }, [betAmount, slide.primaryOutcome.odds]);

  const secondaryWinAmount = useMemo(() => {
    const winAmount = (betAmount * slide.secondaryOutcome.odds).toFixed(2);
    // eslint-disable-next-line no-console
    console.log(`🎯 Secondary: ${betAmount} × ${slide.secondaryOutcome.odds} = ${winAmount}`);
    return winAmount;
  }, [betAmount, slide.secondaryOutcome.odds]);

  // Стабильный колбек для успешного свайпа
  const handleSwipeSuccess = useCallback(
    outcome => {
      onOutcomeClick?.(outcome);
    },
    [onOutcomeClick]
  );

  return (
    <div className={`sb-Slide ${className}`}>
      {/* Видео/изображение фона */}
      <div className="sb-Slide__background">
        {slide.type === 'betVideo' && slide.event.video ? (
          <div className={`sb-Slide__video-container ${isContainMode ? 'is-contain' : ''}`}>
            <iframe
              ref={videoRef}
              allow="autoplay; encrypted-media"
              className="sb-Slide__video"
              frameBorder="0"
              src={videoEmbedUrl}
              title="Bet video"
            />
          </div>
        ) : (
          <div className="sb-Slide__banner">
            <div className="sb-Slide__banner-content">
              <h2 className="sb-Slide__banner-title">Bet Now</h2>
              <p className="sb-Slide__banner-subtitle">{slide.event.league}</p>
            </div>
          </div>
        )}
      </div>

      <SlideInfo event={slide.event} />

      <div className="sb-Slide__outcomes">
        {!hasSwipedOnce && (
          <div className="sb-Slide__swipe-hints">
            <div className="sb-Slide__swipe-hint sb-Slide__swipe-hint--left">
              <span className="sb-Slide__swipe-arrow">←</span>
              <span className="sb-Slide__swipe-text">swipe to bet</span>
            </div>
            <div className="sb-Slide__swipe-hint sb-Slide__swipe-hint--right">
              <span className="sb-Slide__swipe-text">swipe to bet</span>
              <span className="sb-Slide__swipe-arrow">→</span>
            </div>
          </div>
        )}
        <SlideAnimatedButtons
          primaryOutcome={slide.primaryOutcome}
          primaryWinAmount={primaryWinAmount}
          secondaryOutcome={slide.secondaryOutcome}
          secondaryWinAmount={secondaryWinAmount}
          onSwipeSuccess={handleSwipeSuccess}
        />
      </div>
    </div>
  );
};

export { Slide };
