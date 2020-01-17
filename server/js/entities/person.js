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
        image: person.image,
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

export default handleGetPerson;
