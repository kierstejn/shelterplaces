
export interface GeocodedAddress {
    lat: string,
    lon: string,
    display_name?: string,
    address?: {
        house_number?: string
        road?: string
        suburb?: string,
        county?: string,
        region?: string,
        state?: string,
        postcode?: string,
        country?: string,
        country_code?: string
    }
}

