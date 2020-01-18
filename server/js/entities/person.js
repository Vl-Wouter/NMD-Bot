import { Person } from '../models';
import responses from '../data/responses.json';
import { fillString } from '../helpers';


const handleGetPerson = async (entities, language) => {
  console.log(entities);

  const { value } = entities.person_name[0];
  if ('person_name' in entities) {
    try {
      const person = await Person.findOne({ name: value }).exec();
      if (!person) {
        return {
          message: fillString(responses.error.not_found[language], [value]),
          image: null,
          activeIntent: null,
        };
      }

      return {
        message: person.description,
        image: {
          url: person.image,
          text: person.name,
          is_accessory: false,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        message: 'Er is iets misgelopen bij het ophalen van deze persoon.',
        image: null,
        activeIntent: null,
      };
    }
  } else {
    return {
      message: 'Ik kan geen persoon opzoeken zonder een naam 🤷‍♂️',
      image: null,
      activeIntent: null,
    };
  }
};

const handleGetRandomPerson = async (language) => {
  try {
    const count = await Person.count().exec();
    const rng = Math.floor(Math.random() * count);
    const person = await Person.findOne().skip(rng).exec();

    if (!person) {
      return {
        message: fillString(responses.error.not_found[language], ['']),
        image: null,
        activeIntent: null,
      };
    }

    return {
      message: person.description,
      image: {
        url: person.image,
        text: person.name,
        is_accessory: false,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      message: 'Er is iets misgelopen bij het ophalen van een teamlid.',
      image: null,
      activeIntent: null,
    };
  }
};

export default handleGetPerson;
