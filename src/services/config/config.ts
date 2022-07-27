// export const config = {
//   financeDetailsApiUrl: process.env.REACT_APP_FINANCE_DETAILS_API || '',
//   REACT_APP_AUTH_URL: process.env.REACT_APP_AUTH_URL || '',
//   REACT_APP_API_KEY: process.env.REACT_APP_API_KEY || '',
//   REACT_APP_ENV_DEVELOPMENT: process.env.REACT_APP_ENV_DEVELOPMENT || '',
//   REACT_APP_ENV_STAGING: process.env.REACT_APP_ENV_STAGING || '',
//   REACT_APP_ENV_PRODUCTION: process.env.REACT_APP_ENV_PRODUCTION || '',
// }

export const config = {
  financeDetailsApiUrl: "https://auth.hackney.gov.uk/auth?redirect_uri=",
  REACT_APP_AUTH_URL: "https://auth.hackney.gov.uk/auth?redirect_uri=",
  REACT_APP_API_KEY: "Jne1LB5BWE3Lnlh4EHLM7xGANmM8jvq7QBxACiX1",
  REACT_APP_ENV_DEVELOPMENT:
    "https://prmbiqp252.execute-api.eu-west-2.amazonaws.com/development/api/v1",
  REACT_APP_ENV_STAGING:
    "https://wk623vt63g.execute-api.eu-west-2.amazonaws.com/staging/api/v1",
  REACT_APP_ENV_PRODUCTION:
    "https://ebedbh115d.execute-api.eu-west-2.amazonaws.com/production/api/v1",
};
