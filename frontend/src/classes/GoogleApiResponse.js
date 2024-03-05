export class GooglePlacesApiResponse {
  constructor(response) {
    this.response = response;
    this.formattedAddress = response.formattedAddress;
    this.rating = response.rating;
    this.googleMapsUri = response.googleMapsUri;
    this.websiteUri = response.websiteUri;
    this.regularOpeningHours = response.regularOpeningHours;
    this.userRatingCount = response.userRatingCount;
    this.displayName = response.displayName;
    this.category = response.category;
    this.location = response.location;
  }
}
