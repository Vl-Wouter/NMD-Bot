import BotResponse from '../response';
import filterImages from '../helpers/filterImages';
import consola from 'consola';
import { Person } from '../models';

const handleGetPerson = async (intent, entities) => {
  console.log("inside get person")
  const { value } = entities.person_name
  if ('person_name' in entities) {
    try {
      const person = await Person.findOne({ 'name': value }).exec();
      if (!person) {
        return {
          message: "Sorry, ik kon " + value + " niet vinden in de lijst.",
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
  }else{
    return {
      message: "Ik kan geen persoon opzoeken zonder een naam 🤷‍♂️",
      image: null
    }
  }
}

export default handleGetPerson;