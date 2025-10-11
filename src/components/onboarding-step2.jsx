import React, { useCallback, useState } from 'react';

// Mock leagues data - in real implementation, this would come from API
const MOCK_TOP_LEAGUES = [
  { id: 'premier-league', name: 'Premier League', sport: 'Football', liveMatches: 5 },
  { id: 'la-liga', name: 'La Liga', sport: 'Football', liveMatches: 3 },
  { id: 'serie-a', name: 'Serie A', sport: 'Football', liveMatches: 4 },
  { id: 'bundesliga', name: 'Bundesliga', sport: 'Football', liveMatches: 2 },
  { id: 'nba', name: 'NBA', sport: 'Basketball', liveMatches: 6 },
  { id: 'nhl', name: 'NHL', sport: 'Ice Hockey', liveMatches: 4 },
  { id: 'atp-tour', name: 'ATP Tour', sport: 'Tennis', liveMatches: 8 },
  { id: 'champions-league', name: 'Champions League', sport: 'Football', liveMatches: 2 },
  { id: 'mlb', name: 'MLB', sport: 'Baseball', liveMatches: 7 },
  { id: 'ufc', name: 'UFC', sport: 'MMA', liveMatches: 1 },
];

export function OnboardingStep2({ selectedLeagues, onLeaguesChange, onContinue, onBack }) {
  const [localSelection, setLocalSelection] = useState(selectedLeagues || []);

  const toggleLeague = useCallback(leagueId => {
    setLocalSelection(prev => {
      if (prev.includes(leagueId)) {
        return prev.filter(id => id !== leagueId);
      }
      return [...prev, leagueId];
    });
  }, []);

  const handleContinue = useCallback(() => {
    onLeaguesChange(localSelection);
    onContinue();
  }, [localSelection, onLeaguesChange, onContinue]);

  const handleLeagueToggle = useCallback(
    leagueId => () => {
      toggleLeague(leagueId);
    },
    [toggleLeague]
  );

  return (
    <div className="sb-TinderBet-onboardingStep sb-TinderBet-onboardingStep2">
      <div className="sb-TinderBet-onboardingContent">
        <h2 className="sb-TinderBet-onboardingTitle">Choose Your Leagues</h2>

        <p className="sb-TinderBet-onboardingDescription">
          Select the leagues you want to see in your feed. You can change this later.
        </p>

        <div className="sb-TinderBet-leaguesList">
          {MOCK_TOP_LEAGUES.map(league => (
            <label key={league.id} className="sb-TinderBet-leagueItem" htmlFor={`league-${league.id}`}>
              <input
                checked={localSelection.includes(league.id)}
                className="sb-TinderBet-leagueCheckbox"
                id={`league-${league.id}`}
                type="checkbox"
                onChange={handleLeagueToggle(league.id)}
              />
              <div className="sb-TinderBet-leagueInfo">
                <span className="sb-TinderBet-leagueName">{league.name}</span>
                <span className="sb-TinderBet-leagueSport">{league.sport}</span>
              </div>
              <span className="sb-TinderBet-leagueLive">{league.liveMatches} live</span>
            </label>
          ))}
        </div>

        <div className="sb-TinderBet-onboardingActions">
          <button className="sb-TinderBet-button sb-TinderBet-button--secondary" type="button" onClick={onBack}>
            Back
          </button>

          <button className="sb-TinderBet-button sb-TinderBet-button--primary" type="button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
