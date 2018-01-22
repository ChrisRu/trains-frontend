import React from 'react';
import { Link } from 'preact-router/match';

const List = ({ trains }) => (
  <div class="train-selector">
    {trains.map(train => (
      <Link href={`/${train.id}`} class="train-selector--button">
        {train.startingPoint}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 31.49 31.49"
          width="512"
          height="512">
          <path
            d="M21.205 5.007a1.112 1.112 0 0 0-1.587 0 1.12 1.12 0 0 0 0 1.571l8.047 8.047H1.111A1.106 1.106 0 0 0 0 15.737c0 .619.492 1.127 1.111 1.127h26.554l-8.047 8.032c-.429.444-.429 1.159 0 1.587a1.112 1.112 0 0 0 1.587 0l9.952-9.952a1.093 1.093 0 0 0 0-1.571l-9.952-9.953z"
            fill="#FFF"
          />
        </svg>
        {train.destination}
      </Link>
    ))}
  </div>
);

export default List;
