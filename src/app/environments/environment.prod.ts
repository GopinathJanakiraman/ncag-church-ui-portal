// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // olamFSPApiEndpoint : "//13.67.70.67:8084/",
  // olamFSPURLEndpoint : "//13.67.49.127:8080/",
  // olamFSPfarmerCount : "//13.67.72.99:2027/",
  // olamFSPauthServiceApi: "//13.67.49.127:8080/",
  // https://prod-zuul.globalagricentral.com/
  //104.215.199.203:8080/
  // olamFSPApiEndpoint: "//104.215.199.203:8080/",
  // olamFSPURLEndpoint: "//104.215.199.203:8080/",
  // olamFSPfarmerCount: "//104.215.199.203:8080/",
  // olamFSPcropGuide: "//104.215.199.203:8080/",
  // olamFSPcropGuideSave: "//104.215.199.203:8080/",
  // olamFSPcropGuideDelete: "//104.215.199.203:8080/",
  // olamFSPcropGuideAddNew: "//104.215.199.203:8080/",
  // olamFSPcropGuideEdit: "//104.215.199.203:8080/",
  // olamFSPgetAllLanguage: "//104.215.199.203:8080/",
  // olamFSPgetAllState: "//104.215.199.203:8080/",
  // olamFSPpostagriSection: "//104.215.199.203:8080/",
  // olamFSPgetagriBuzz: "//104.215.199.203:8080/",
  // olamFSPdeleteagriBuzz: "//104.215.199.203:8080/",
  // olamImageUploadCloud: "//104.215.199.203:8080/",
  // olamFSPImageSend: "//104.215.199.203:8080/",
  // olamFSPeditagriBuzz: "//104.215.199.203:8080/",

  agriService: "https://prod-zuul.globalagricentral.com/",
  // communityService: "https://farmvoicedev.olamdigital.com:4984/fsp-community-dev/",
  communityService: 'https://prod-zuul.globalagricentral.com/community-web-service/community/',
  historyCommunityService: 'https://prod-zuul.globalagricentral.com/community-history-web-service/community/',

  analyticService: "https://prod-zuul.globalagricentral.com/",
  syncPostsLink: 'https://10.101.32.228:4985/fsp-community-dev/_design/',
  syncGateWayUser: 'fspsyncuser',
  syncGatewayPwd: 'z9Bkn38L',
  blobService:"https://fspprdscs.globalagricentral.com/",
  farmerId:136304,
  farmerMappingId: "a6c353c57d566f7659ca8f80a8dade36f9b4cc56e5cda5d26c6cb755691ea969",
  keycloakConfig: {
    clientId: 'agricentral-portal-dev',
    realm: 'agricentral-dev',
    url: 'https://digitalauthdev.olamnet.com/auth/'
  }
};


// export const urlConfiguration = {
//   // marketPortalUrls: "marketprice/portal/details",
//   // postLoginFSPurl: "api/v1/oauth/portal/authenticate",
//   // getuniquefarmercount : "farmerdata/farmdetails/getuniquefarmercount",
//   // authServiceApiurl: "api/v1/oauth/token"

//   marketPortalUrls: "marketprice/marketprice/portal/details",
//   postLoginFSPurl: "olamoauth/api/v1/oauth/portal/authenticate",
//   getuniquefarmercount: "fspadminservice/admin/dashboard/farmer/details",
//   UrlCropguideget: "cropcare/crops/master/portal",
//   UrlCropguideSave: "cropcare/crops/portal",
//   UrlCropguideDelete: "cropcare/crops/portal",
//   UrlCropguideaddNew: "cropcare/crops/portal",
//   urlCropguideEdit: "cropcare/crops/portal",
//   urlagrinewsLanguage: "cropcare/agrinews/getAllLanguage",
//   urlagrinewsState: "cropcare/agrinews/getAllState",
//   urlagripostScheme: "cropcare/agrinews/saveAgriNews",
//   urlgetagriBuzzInformation: 'cropcare/agrinews/getAllAgriNews/en',
//   urldeleteagriBuzz: 'cropcare/agrinews/deleteAgriNews/',
//   urlCloudImage: 'utility/uploadFspFile',
//   urlAgriNewSubmit: '/cropcare/agrinews/submitAgriNews/',
//   urlAgribuzzGetCall: '/cropcare/agrinews/getAgriNews/'
// };