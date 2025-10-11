import React from 'react';

import './SlideInfo.scss';

const SlideInfo = ({ event }) => {
  return (
    <div className="sb-SlideInfo">
      <div className="sb-SlideInfo__header">
        <div className="sb-SlideInfo__league">{event.league}</div>
      </div>
      <div className="sb-SlideInfo__teams">
        <div className="sb-SlideInfo__team sb-SlideInfo__team--home">
          {event.teams.home.logo && (
            <img
              alt={`${event.teams.home.name} logo`}
              className="sb-SlideInfo__team-logo"
              src={event.teams.home.logo}
            />
          )}
          <span className="sb-SlideInfo__team-name">{event.teams.home.name}</span>
        </div>
        <div className="sb-SlideInfo__score-container">
          <div className="sb-SlideInfo__score">{event.score || '0 : 0'}</div>
        </div>
        <div className="sb-SlideInfo__team sb-SlideInfo__team--away">
          <span className="sb-SlideInfo__team-name">{event.teams.away.name}</span>
          {event.teams.away.logo && (
            <img
              alt={`${event.teams.away.name} logo`}
              className="sb-SlideInfo__team-logo"
              src={event.teams.away.logo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { SlideInfo };
