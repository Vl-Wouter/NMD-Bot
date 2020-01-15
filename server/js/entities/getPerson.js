import BotResponse from '../response';
import filterImages from '../helpers/filterImages';
import consola from 'consola';
import { Person } from '../models';

const handleGetPerson = async (personNameEntity) => {
  const [primary] = personNameEntity;

    try {
      const person = await Person.findOne({ 'name': primary.value }).exec();
      if (!person) {
        return {
          message: "Sorry, ik kon " + primary.value + " niet vinden in de lijst.",
          image: null
        }
      }

      return {
        message: person.description,
        image: person.image
      }
    } catch (err) {
      console.log(err);
      return {
        message: "Er is iets misgelopen bij het ophalen van deze persoon.",
        image: null
      }
    }
}

export default handleGetPerson;