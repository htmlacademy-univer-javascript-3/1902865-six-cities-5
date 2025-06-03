import {useMemo, useState} from 'react';
import { TPlaceCard } from '../../utils/types.ts';
import { OfferList } from '../../components/OfferList/OfferList.tsx';
import { Map } from '../../components/map/map.tsx';
import {PlaceClassTypes, SortName} from '../../utils/const.ts';
import {CityList} from '../../components/city-list/CityList.tsx';
import {useAppSelector} from '../../store/hooks.ts';
import {SortFilter} from '../../components/sort-filter/SortFilter.tsx';

export const Main = () => {

  const [selectedPlace, setSelectedPlace] = useState<TPlaceCard | undefined>(
    undefined
  );
  const [currentFilter, setCurrentFilter] = useState<SortName>(SortName.POPULAR);

  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers);

  const handleListItemHover = (placeItemId: number | null) => {
    const currentPlace = currentOffers.find((place) => place.id === placeItemId);
    setSelectedPlace(currentPlace);
  };

  const onFilterChange = (filter: SortName) => {
    setCurrentFilter(filter);
  };

  const sortedOffers = useMemo(() => {
    switch (currentFilter) {
      case SortName.TOP_RATED:
        return currentOffers.toSorted((a, b) => b.rating - a.rating);
      case SortName.HIGH_TO_LOW:
        return currentOffers.toSorted((a, b) => b.price - a.price);
      case SortName.LOW_TO_HIGH:
        return currentOffers.toSorted((a, b) => a.price - b.price);
      default:
        return currentOffers;
    }
  }, [currentOffers, currentFilter]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers?.length} places to stay in {currentCity.name}</b>
              <SortFilter currentFilter={currentFilter} onFilterChange={onFilterChange}/>
              <OfferList offers={sortedOffers} onListItemHover={handleListItemHover} listType={PlaceClassTypes.Cities}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentCity} places={currentOffers} selectedPlace={selectedPlace}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
