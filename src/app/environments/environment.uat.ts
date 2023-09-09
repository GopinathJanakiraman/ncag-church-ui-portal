export const environment = {
    production: true,
    agriService: "https://uat-zuul.globalagricentral.com/",
    // communityService: "https://farmvoicedev.olamdigital.com:4984/fsp-community-dev/",
    communityService: 'https://uat-zuul.globalagricentral.com/community-web-service/community/',
    historyCommunityService: 'https://uat-zuul.globalagricentral.com/community-history-web-service/community/',
    analyticService: "https://uat-zuul.globalagricentral.com/",
    syncPostsLink: 'https://10.101.32.228:4985/fsp-community-dev/_design/',
    syncGateWayUser: 'fspsyncuser',
    syncGatewayPwd: 'z9Bkn38L',
    blobService:"https://fspsitscs.globalagricentral.com/",
    farmerId:1782420,
    farmerMappingId: "d1085b243ac41981fad678abc91558832bbc694128781ae68ccc08d736b07c96",
    keycloakConfig: {
      clientId: 'agricentral-portal-dev',
      realm: 'agricentral-dev',
      url: 'https://digitalauthdev.olamnet.com/auth/'
    }
};
