import { Person } from '../models';

const handleGetPerson = async (entities) => {
  
  const { value } = entities.person_name[0];
  if ('person_name' in entities) {
    try {
      const person = await Person.findOne({ name: value }).exec();
      if (!person) {
        return {
          message: `Sorry, ik kon ${value} niet vinden in de lijst.`,
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

const handleGetRandomPerson = async () => {

  try {
    const count = await Person.count().exec();
    let rng = Math.floor(Math.random() * count);
    const person = await Person.findOne().skip(random).exec();

    if (!person) {
      return {
        message: `Sorry, ik kon geen teamlid vinden`,
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

  } catch (error) {
    console.log(err);
      return {
        message: 'Er is iets misgelopen bij het ophalen van een teamlid.',
        image: null,
        activeIntent: null,
      };
  }

};

export default handleGetPerson;
