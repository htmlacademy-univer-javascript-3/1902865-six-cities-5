import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import {Actions, AppRoute, LoadingStatus} from './utils/const';
import {initAsyncActionsStore} from './utils/mocks.ts';

const {mockStoreCreator} = initAsyncActionsStore();

describe('App Routing', () => {
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [Actions.User]: {
        authorizationStatus: false,
        userData: {
          name: 'John Doe',
          avatarUrl: '/img/avatar.jpg',
          isPro: false,
          email: 'john.doe@example.com',
          token: 'token123',
        },
      },
      [Actions.City]: {
        city: {
          name: 'Paris',
          location: {latitude: 48.8566, longitude: 2.3522, zoom: 12},
        },
      },
      [Actions.Offers]: {
        offers: [],
        nearbyOffers: [],
        isOffersDataLoading: LoadingStatus.Success,
      },
      [Actions.Offer]: {
        activeOffer: '1',
        offer: {
          id: '1',
          title: 'Test Offer',
          type: 'apartment',
          price: 100,
          isFavorite: false,
          isPremium: true,
          rating: 4.5,
          city: {name: 'Paris', location: {latitude: 48.8566, longitude: 2.3522}},
          location: {latitude: 48.8566, longitude: 2.3522},
          description: 'description',
          bedrooms: 2,
          goods: ['window'],
          host: {
            name: 'Aba',
            avatarUrl: 'img/src1.jpg',
            isPro: false
          },
          images: ['img/src1.jpg'],
          maxAdults: 2
        },
        isOfferDataLoading: LoadingStatus.Success,
      },
      Comments: {
        comments: [],
        isCommentsDataLoading: LoadingStatus.Success
      },
      Favorites: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Success
      },
    });
  });

  it('should render Main page for "/" route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render Login page for "/login" route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render Favorites page for "/favorites" route if authorized', () => {
    store = mockStoreCreator({
      [Actions.User]: {
        authorizationStatus: true,
        userData: {
          name: 'John Doe',
          avatarUrl: '/img/avatar.jpg',
          isPro: false,
          email: 'john.doe@example.com',
          token: 'token123',
        },
      },
      [Actions.City]: {
        city: {
          name: 'Paris',
          location: {latitude: 48.8566, longitude: 2.3522, zoom: 12},
        },
      },
      [Actions.Offers]: {
        offers: [],
        nearbyOffers: [],
        isOffersDataLoading: LoadingStatus.Init,
      },
      [Actions.Offer]: {
        activeOffer: '1',
        offer: {
          id: '1',
          title: 'Test Offer',
          type: 'apartment',
          price: 100,
          isFavorite: false,
          isPremium: true,
          rating: 4.5,
          city: {name: 'Paris', location: {latitude: 48.8566, longitude: 2.3522}},
          location: {latitude: 48.8566, longitude: 2.3522},
          description: 'description',
          bedrooms: 2,
          goods: ['window'],
          host: {
            name: 'Aba',
            avatarUrl: 'img/src1.jpg',
            isPro: false
          },
          images: ['img/src1.jpg'],
          maxAdults: 2
        },
        isOfferDataLoading: LoadingStatus.Init,
      },
      Comments: {
        comments: [],
        isCommentsDataLoading: LoadingStatus.Init
      },
      Favorites: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Init
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render Offer page for "/offer/:id" route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Offer.replace(':id', '1')]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

  it('should render NotFound page for unknown route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
  });
});
