// export const environment = {
//     production: true,
//     olamFSPApiEndpoint : "http://104.215.199.203:8080/",
//     olamFSPURLEndpoint : "http://104.215.199.203:8080/"
//   };


//   export const urlConfiguration = {
//     marketPortalUrls: "marketprice/marketprice/portal/details", 
//     postLoginFSPurl:  "olamoauth/api/v1/oauth/portal/authenticate"
// }

export const environment = {
  production: true,

  agriService: "https://sit-zuul.globalagricentral.com/",
  // communityService: "https://farmvoicedev.olamdigital.com:4984/fsp-community-dev/",
  communityService: 'https://sit-zuul.globalagricentral.com/community-web-service/community/',
  historyCommunityService: 'https://sit-zuul.globalagricentral.com/community-history-web-service/community/',

  analyticService: "https://sit-zuul.globalagricentral.com/",
  syncPostsLink: 'https://10.101.32.228:4985/fsp-community-dev/_design/',
  syncGateWayUser: 'fspsyncuser',
  syncGatewayPwd: 'z9Bkn38L',
  blobService:"https://fspsitscs.globalagricentral.com/",
  farmerId: 1655984,
  farmerMappingId: "b6ef7fafc6b0127f255b5f8d0982a243477a8451a78731546e342e6608bc700d",
  keycloakConfig: {
    clientId: 'agricentral-portal-dev',
    realm: 'agricentral-dev',
    url: 'https://digitalauthdev.olamnet.com/auth/'
  }
};
