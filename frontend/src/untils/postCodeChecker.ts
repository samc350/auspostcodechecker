
interface valuesType {
  state: string,
  postCode: number,
  suburb: string
}

interface localityDate {
  postcode: string,
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

export const checkPostCode = ({ state, postCode, suburb }: valuesType, data: apiResponse): string => {
  if (data.localities && data.localities.locality) {
    const areas = data.localities.locality;
    let areaWithPostCode: localityDate | undefined;
    if (Array.isArray(areas)) {
      // need to cast this to an array so 
      const castedAreas = areas as localityDate[];
      // finds the first area with matching post code if none is found returns undefined. it should be safe to 
      // assume there will not be two areas with the same postcode as they should be unique.
      areaWithPostCode = castedAreas.find(area => area.postcode === postCode.toString());
    } else {
      areaWithPostCode = data.localities.locality as localityDate
    }
    if (areaWithPostCode && areaWithPostCode.postcode === postCode.toString() && areaWithPostCode.location === suburb) {
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