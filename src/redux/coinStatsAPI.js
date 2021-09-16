const fetchCoins = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  const response = await fetch('https://api.coinstats.app/public/v1/coins', requestOptions);
  const result = await response.json();
  const { coins } = result;
  return coins;
};

export default fetchCoins;
