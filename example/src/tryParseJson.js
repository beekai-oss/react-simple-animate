export default function tryParseJSON(jsonString) {
  try {
    const object = JSON.parse(jsonString);

    if (object && typeof object === 'object') {
      return object;
    }
  } catch (e) {
    return false;
  }

  return false;
}
