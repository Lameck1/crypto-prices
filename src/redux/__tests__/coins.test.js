/**
 * Do the following imports.
 * getCoins is the thunk we defined in coins.js
 */
import reducer, { getCoins } from '../coins';

/**
 * A redux action holds a 'type' and a 'payload'.
 * Payload is the data an action passes to the reducer so that it can be used to update the state of the app.
 * The payload constant below is therefore a mock of the exact kind of payload that our app expects to work with.
 */
const payload = [
  {
    id: 'bitcoin',
    icon: 'https://static.coinstats.app/coins/Bitcoin6l39t.png',
    name: 'Bitcoin',
    rank: 1,
    priceInUSD: 45146.43320282811,
    priceInBitcoin: 1,
    volume: 29903342654.921547,
    marketCap: 849362962818.6051,
    hourlyPriceChange: -0.33,
  },
];

describe('Coins Reducer', () => {
  /**
   * A reducer is a funtion that accepts an initialState and an action.
   * Here, we are defining some actions (pendingAction, fulfilledAction, rejectedAction) and
   * an initialState that we can use to test our reducer:- reducer(state, action).
   * 
   * Take a look at how the action's type property have been defined.We are using the getCoins thunk
   */
  const pendingAction = { type: getCoins.pending };
  const fulfilledAction = { type: getCoins.fulfilled, payload };
  const rejectedAction = { type: getCoins.rejected };

  const initialState = {
    coins: [],
    status: null,
  };

  it('returns the initial state and sets status to "loading"', () => {
    /**
     * When the the getCoins thunk is pending, it's only the status that can be updated, in this
     * case, to 'loading'
     */
    expect(reducer(initialState, pendingAction)).toEqual({
      coins: [],
      status: 'loading',
    });
  });

  /**
   * When the the getCoins thunk is fulfilled, the status and the coins will be updated
   */
  it('loads fulfilled state and sets status to "success"', () => {
    expect(reducer(initialState, fulfilledAction)).toEqual({
      coins: [...payload],
      status: 'success',
    });
  });

  /**
   * When the the getCoins thunk is rejected, it's only the status that can be updated, in this
   * case, to 'failed'
   */
  it('handles rejected action and sets status to "failed"', () => {
    expect(reducer(initialState, rejectedAction)).toEqual({
      coins: [],
      status: 'failed',
    });
  });
});
