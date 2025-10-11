// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState, useCallback } from "react"

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Keyboard } from "swiper/modules"
// eslint-disable-next-line import/no-unresolved
import "swiper/css"

// Components
import { OnboardingFlow, BetAmountPrompt, TinderBetHeader, CustomizationMenu } from "../components"
import { Slide } from "../components/slide"

// Hooks
import { useTinderBetOnboarding, useBetAmount } from "../hooks"

// Mock data
import basketballEvents from "../mock-data/basketball_events.json"
import boxingEvents from "../mock-data/boxing_events.json"
import csEvents from "../mock-data/cs_events.json"
import dotaEvents from "../mock-data/dota_events.json"
import footballEvents from "../mock-data/football_events.json"
import tennisEvents from "../mock-data/tennis_events.json"

// Styles
import "./tinder-bet.scss"

// Swiper modules configuration
const SWIPER_MODULES = [Mousewheel, Keyboard]

// Массив всех спортов для ротации
const SPORTS_DATA = [
  { name: "basketball", events: basketballEvents },
  { name: "boxing", events: boxingEvents },
  { name: "cs", events: csEvents },
  { name: "dota", events: dotaEvents },
  { name: "tennis", events: tennisEvents },
  { name: "football", events: footballEvents },
]

// Функция для случайного перемешивания массива (алгоритм Фишера-Йетса)
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Функция для получения событий со случайным перемешиванием
const getRotatedEvents = () => {
  const allEvents = []

  // Перемешиваем порядок спортов для случайности
  const shuffledSports = shuffleArray(SPORTS_DATA)

  // Собираем все события из всех спортов, чередуя их в случайном порядке
  const maxEventsPerSport = Math.max(...shuffledSports.map((sport) => sport.events.length))

  for (let i = 0; i < maxEventsPerSport; i++) {
    shuffledSports.forEach((sport) => {
      if (sport.events[i]) {
        allEvents.push({
          ...sport.events[i],
          sportType: sport.name, // Добавляем тип спорта для отладки
        })
      }
    })
  }

  // Дополнительно перемешиваем весь массив событий для большей случайности
  return shuffleArray(allEvents)
}

// Функция для преобразования мок данных в формат Slide
const transformMockDataToSlide = (mockEvent) => {
  // Отладочная информация
  // eslint-disable-next-line no-console
  console.log(
    `🎯 Processing ${mockEvent.event.type}: ${mockEvent.event.teams.home.name} vs ${mockEvent.event.teams.away.name}`
  )
  // eslint-disable-next-line no-console
  console.log(
    "Available markets:",
    mockEvent.markets.map((m) => m.id)
  )

  // Пытаемся найти подходящий маркет в порядке приоритета
  let winnerMarket = mockEvent.markets.find((market) => market.id === "winner_incl_ot")

  // Если не нашли winner_incl_ot, пробуем найти winner
  if (!winnerMarket) {
    winnerMarket = mockEvent.markets.find((market) => market.id === "winner")
  }

  // Если не нашли winner, пробуем найти point_handicap
  if (!winnerMarket) {
    winnerMarket = mockEvent.markets.find((market) => market.id === "point_handicap")
  }

  // Если не нашли point_handicap, пробуем найти map_handicap (для Dota2)
  if (!winnerMarket) {
    winnerMarket = mockEvent.markets.find((market) => market.id === "map_handicap")
  }

  // // Если не нашли map_handicap, пробуем найти любой handicap маркет
  // if (!winnerMarket) {
  //   winnerMarket = mockEvent.markets.find(market => market.id.includes('handicap'));
  // }

  // Если не нашли handicap, пробуем найти любой маркет с 2+ исходами
  if (!winnerMarket) {
    winnerMarket = mockEvent.markets.find((market) => market.selections.length >= 2)
  }

  // Если не нашли ни один подходящий маркет или нет достаточно исходов, возвращаем null
  if (!winnerMarket || winnerMarket.selections.length < 2) {
    // eslint-disable-next-line no-console
    console.log(`❌ No suitable market found for ${mockEvent.event.type}`)
    return null
  }

  // eslint-disable-next-line no-console
  console.log(
    `✅ Using market: ${winnerMarket.id} with ${winnerMarket.selections.length} selections`
  )

  return {
    type: "betVideo", // Используем видео тип
    event: {
      ...mockEvent.event,
      score: mockEvent.event.score || "0 : 0", // Добавляем score с fallback
    },
    primaryOutcome: winnerMarket.selections[0], // Первый исход (домашняя команда)
    secondaryOutcome: winnerMarket.selections[1], // Второй исход (гостевая команда)
  }
}

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  // Преобразуем все события из всех спортов в массив слайдов со случайным перемешиванием
  const slidesData = useMemo(() => {
    const rotatedEvents = getRotatedEvents()

    // Отладочная информация
    // eslint-disable-next-line no-console
    console.log(
      "🎯 Randomly shuffled events order:",
      rotatedEvents.map(
        (e) => `${e.sportType}: ${e.event.teams.home.name} vs ${e.event.teams.away.name}`
      )
    )

    if (rotatedEvents.length > 0) {
      // Фильтруем события без подходящих маркетов
      const slides = rotatedEvents
        .map((event) => transformMockDataToSlide(event))
        .filter((slide) => slide !== null)
      // eslint-disable-next-line no-console
      console.log("🎯 Generated slides count:", slides.length)
      return slides
    }
    return []
  }, [])

  // Отслеживание активного слайда для ленивой загрузки
  const [activeIndex, setActiveIndex] = useState(0)

  // All hooks must be called before any conditional returns
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false)
  const [hasSwipedOnce, setHasSwipedOnce] = useState(false)
  const [isContainMode, setIsContainMode] = useState(false)
  const onboarding = useTinderBetOnboarding()
  const betAmount = useBetAmount()

  const handleOutcomeClick = useCallback(
    (outcome) => {
      setHasSwipedOnce(true)
      // eslint-disable-next-line no-console
      console.log("🎯 Outcome clicked:", outcome)
      // eslint-disable-next-line no-console
      console.log(
        "💰 Bet amount:",
        betAmount.amount,
        "Odds:",
        outcome.odds,
        "Win amount:",
        (betAmount.amount * outcome.odds).toFixed(2)
      )
    },
    [betAmount.amount]
  )

  const handleOpenCustomization = useCallback(() => {
    setIsCustomizationOpen(true)
  }, [])

  const handleCloseCustomization = useCallback(() => {
    setIsCustomizationOpen(false)
  }, [])

  const handleSaveCustomization = useCallback(() => {
    // Additional save logic can be added here if needed
  }, [])

  const handleBetAmountContinue = useCallback(() => {
    // Continue to feed after setting bet amount
  }, [])

  const toggleDisplayMode = useCallback(() => {
    setIsContainMode((prev) => !prev)
  }, [])

  // Обработчик изменения слайда для оптимизации загрузки
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex)
  }, [])

  // Мемоизированные оптимизированные слайды - загружаем видео только для активного слайда ± 1
  const optimizedSlidesData = useMemo(
    () =>
      slidesData.map((slide, index) => {
        const shouldLoad = Math.abs(index - activeIndex) <= 1
        return shouldLoad ? slide : { ...slide, event: { ...slide.event, video: null } }
      }),
    [slidesData, activeIndex]
  )

  // Если нет данных, показываем заглушку
  if (!slidesData || slidesData.length === 0) {
    return (
      <div className="sb-TinderBet">
        <div className="sb-TinderBet__error">No data available</div>
      </div>
    )
  }

  const renderContent = () => {
    // Show onboarding if not completed
    if (!onboarding.isCompleted) {
      return (
        <OnboardingFlow
          currentStep={onboarding.currentStep}
          freeBetsLeft={betAmount.freeBetsLeft}
          gamblingLevel={onboarding.gamblingLevel}
          selectedLeagues={onboarding.selectedLeagues}
          onComplete={onboarding.completeOnboarding}
          onNextStep={onboarding.nextStep}
          onPreviousStep={onboarding.previousStep}
          onSetGamblingLevel={onboarding.setGamblingLevel}
          onSetLeagues={onboarding.setSelectedLeagues}
          onSkipCustomization={onboarding.skipCustomization}
        />
      )
    }

    // Show bet amount prompt if user needs to set amount
    if (betAmount.needsAmountSetup) {
      return (
        <BetAmountPrompt
          amount={betAmount.amount}
          balance={betAmount.balance}
          customAmount={betAmount.customAmount}
          validationError={betAmount.validationError}
          onAmountSelect={betAmount.setAmount}
          onContinue={handleBetAmountContinue}
          onCustomAmountApply={betAmount.applyCustomAmount}
          onCustomAmountChange={betAmount.setCustomAmount}
        />
      )
    }

    // Show the main feed
    return (
      <div className="sb-TinderBet-mainContent">
        <TinderBetHeader
          isContainMode={isContainMode}
          onContainModeChange={toggleDisplayMode}
          onSettingsClick={handleOpenCustomization}
        />
        <div className="sb-TinderBetWrapper-content">
          <Swiper
            className="sb-TinderBet-swiper"
            direction="vertical"
            modules={SWIPER_MODULES}
            slidesPerView={1}
            speed={600}
            touchAngle={45}
            touchStartPreventDefault={false}
            keyboard
            mousewheel
            onSlideChange={handleSlideChange}
          >
            {optimizedSlidesData.map((slide, index) => {
              const slideKey = `${slide.event.teams.home.id}-${slide.event.teams.away.id}`
              const shouldRenderContent = Math.abs(index - activeIndex) <= 1

              return (
                <SwiperSlide key={slideKey} className="sb-TinderBet-swiperSlide">
                  {shouldRenderContent ? (
                    <Slide
                      betAmount={betAmount.amount}
                      hasSwipedOnce={hasSwipedOnce}
                      isContainMode={isContainMode}
                      slide={slide}
                      onContainModeChange={toggleDisplayMode}
                      onOutcomeClick={handleOutcomeClick}
                    />
                  ) : (
                    <div className="sb-Slide-placeholder" />
                  )}
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    )
  }

  return (
    <div className="sb-TinderBet">
      {renderContent()}

      <CustomizationMenu
        balance={betAmount.balance}
        betAmount={betAmount.amount}
        customAmount={betAmount.customAmount}
        freeBetsLeft={betAmount.freeBetsLeft}
        gamblingLevel={onboarding.gamblingLevel}
        isOpen={isCustomizationOpen}
        selectedLeagues={onboarding.selectedLeagues}
        validationError={betAmount.validationError}
        onApplyCustomAmount={betAmount.applyCustomAmount}
        onClose={handleCloseCustomization}
        onSave={handleSaveCustomization}
        onSetAmount={betAmount.setAmount}
        onSetCustomAmount={betAmount.setCustomAmount}
        onSetGamblingLevel={onboarding.setGamblingLevel}
        onSetLeagues={onboarding.setSelectedLeagues}
      />
    </div>
  )
}
