// Session token type
export interface SessionToken {
  expirationDate: string;
  token: string;
}

// Get token response type
export interface GetTokenResponse {
  value: SessionToken;
}

// Create session token input type
export interface CreateSessionTokenInput {
  employeeToken: string;
  consumerToken: string;
  expirationDate: Date;
}
