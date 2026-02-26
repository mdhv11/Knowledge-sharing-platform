const revokedTokens = new Set();

export const revokeToken = (token) => revokedTokens.add(token);
export const isTokenRevoked = (token) => revokedTokens.has(token);
