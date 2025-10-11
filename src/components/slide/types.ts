export interface Slide {
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
      loop_start_time_code?: string;
      loop_end_time_code?: string;
    };
  };
  primaryOutcome: {
    id: number;
    name: string;
    odds: number;
  };
  secondaryOutcome: {
    id: number;
    name: string;
    odds: number;
  };
}

export interface RawBetData {
  event: {
    type: string;
    league: string;
    teams: {
      home: { name: string; id: number };
      away: { name: string; id: number };
    };
    start_time: string;
    video?: {
      url: string;
      type: 'youtube';
      loop_start_time_code: string;
      loop_end_time_code: string;
    };
  };
  markets: Array<{
    id: string;
    name: string;
    selections: Array<{
      id: number;
      name: string;
      odds: number;
    }>;
  }>;
}

export interface SlideProps {
  slide: Slide;
  className?: string;
}
