import React from 'react';
import { Main } from './pages/Main/Main.tsx';
import { PlaceCardProps } from './components/PlaceCard/PlaceCard.tsx';

type AppScreenProps = {
  places: PlaceCardProps[];
}

export const App: React.FC<AppScreenProps> = ({places}) => (
  <Main places={places}/>
);
