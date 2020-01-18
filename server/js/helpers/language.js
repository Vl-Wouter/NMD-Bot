import LanguageDetect from 'languagedetect';
import config from '../../config';

const lngDetector = new LanguageDetect();

lngDetector.setLanguageType('iso2');

/**
 * Detects language from a string and returns language code
 * @param {String} string
 */
const detectFromString = (string) => {
  const results = lngDetector.detect(string);
  const available = results.filter((result) => config.availableLanguages.includes(result[0]));
  return available.length > 0 ? available[0][0] : 'nl';
};
export default detectFromString;
