import { checkPostCode } from '../src/untils/postCodeChecker';

describe('post code checker', () => {

  const API_RESPONSE = { "localities": { "locality": [{ "category": "Delivery Area", "id": 5438, "latitude": -37.69045164, "location": "HILLSIDE", "longitude": 144.7416928, "postcode": 3037, "state": "VIC" }, { "category": "Delivery Area", "id": 8183, "latitude": -37.84069592, "location": "HILLSIDE", "longitude": 147.5160695, "postcode": 3875, "state": "VIC" }, { "category": "Delivery Area", "id": 14686, "latitude": -32.90714659, "location": "HILLSIDE", "longitude": 117.2132017, "postcode": 6312, "state": "WA" }] } }
  it('returns valid message if input values match data in API response', () => {
    const inputValues = { state: "VIC", suburb: "hillside", postCode: 3037 }

    const result = checkPostCode(inputValues, API_RESPONSE)
    expect(result).toEqual('The postcode, suburb and state entered are valid.');
  });

  it('returns correct error message if postcode not found in API response', () => {
    const inputValues = { state: "VIC", suburb: "hillside", postCode: 0 }

    const result = checkPostCode(inputValues, API_RESPONSE)
    expect(result).toEqual('The postcode 0 does not match the suburb hillside.');
  });

  it('returns correct error message if API response has no entries', () => {
    const inputValues = { state: "VIC", suburb: "hillside", postCode: 3037 }

    const result = checkPostCode(inputValues, { localities: {} })
    expect(result).toEqual('The postcode 3037 does not match the suburb hillside.');
  });

  it('returns correct error message if suburb does not exactly match', () => {
    const inputValues = { state: "VIC", suburb: "hill", postCode: 3037 }

    const result = checkPostCode(inputValues, API_RESPONSE)
    expect(result).toEqual('The postcode 3037 does not match the suburb hill.');
  });

  it('returns correct error message if suburb not in state', () => {
    const inputValues = { state: "NSW", suburb: "hillside", postCode: 3037 }

    const result = checkPostCode(inputValues, { localities: {} })
    expect(result).toEqual('The postcode 3037 does not match the suburb hillside.');
  });
});