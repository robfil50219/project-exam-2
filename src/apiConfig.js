export const getApiKeyOptions = (token) => ({
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': '389ca4b7-468d-43d0-ba65-51f53f29b2ce',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
  });
  