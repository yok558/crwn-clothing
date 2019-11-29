import { createSelector } from 'reselect';

const COLLECTOIN_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5
};

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollection = collectionUrlParam =>
  createSelector([selectCollection], collections =>
    collections.find(
      collection => collection.id === COLLECTOIN_ID_MAP[collectionUrlParam]
    )
  );
