
interface valuesType {
  state: string,
  postCode: number,
  suburb: string
}

interface localityDate {
  postcode: number,
  state: string,
  location: string,
  category: string,
  id: number,
  latitude: number,
  longitude: number,
}

interface apiResponse {
  localities: {
    locality?: localityDate[] | localityDate
  }
}
/**
 * helper method for checking if a API response matches the searched for post code, suburb, and state information 
 * 
 * @param param searched post code information 
 * @param data 
 * @returns 
 */
export const checkPostCode = ({ state, postCode, suburb }: valuesType, data: apiResponse): string => {
  console.log(data);
  if (data.localities && data.localities.locality) {
    const areas = data.localities.locality;
    let areaWithPostCode: localityDate | undefined;
    if (Array.isArray(areas)) {
      // need to cast this to an array so 
      const castedAreas = areas as localityDate[];
      // finds the first area with matching post code if none is found returns undefined. it should be safe to 
      // assume there will not be two areas with the same postcode as they should be unique.
      areaWithPostCode = castedAreas.find(area => area.postcode === postCode);
    } else {
      areaWithPostCode = data.localities.locality as localityDate
    }
    if (areaWithPostCode && areaWithPostCode.postcode === postCode && areaWithPostCode.location.toUpperCase() === suburb.toUpperCase()) {
      if (areaWithPostCode.state === state) {
        return `The postcode, suburb and state entered are valid.`
      } else {
        return `The suburb ${suburb} does not exist in the state ${state}.`;
      }
    } else {
      return `The postcode ${postCode} does not match the suburb ${suburb}.`;
    }
  }
  return `The postcode ${postCode} does not match the suburb ${suburb}.`
}