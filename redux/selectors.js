import get from 'lodash.get';

export const userSelector = state => state.auth.user;
export const userIdSelector = state => get(state, 'auth.user._id', null);
export const cartSelector = state => state.cart.cart;
export const cartCountSelector = state => get(state, 'cart.cart.details.length', 0);
export const cartIdSelector = state => get(state, 'cart.cart._id', null);

export const getAggregationData = state => {
  const aggregations = get(state, 'search.searchResults.products.aggregations.facets', []);
  const selectedFacets = get(state, 'search.selectedFacets', {});
  const tags = [];

  Object.keys(selectedFacets).forEach(key => {
    if (Array.isArray(selectedFacets[key])) {
      selectedFacets[key].forEach(valueId => {
        const facet = aggregations.find(f => f.keyId === key);
        if (facet) {
          facet.values.forEach(val => {
            if (val.valueId === valueId) {
              const tag = {
                name:
                  facet.keyLabel && val.valueLabel && `${facet.keyLabel.en}: ${val.valueLabel.en}`,
                keyId: facet.keyId,
                valueId: val.valueId,
              };
              tags.push(tag);
            }
          });
        }
      });
    }
  });

  return tags;
};
