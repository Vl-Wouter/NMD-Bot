import { Project } from '../models';
import responses from '../data/responses.json';
import { fillString } from '../helpers';


const handleGetProject = async (entities, language) => {
  if(entities.project_name){
    const { value } = entities.project_name[0];

    if ('project_name' in entities) {
      try {
        const project = await Project.findOne({ name: value }).exec();
        if (!project) {
          return {
            message: fillString(responses.error.not_found[language], [value]),
            image: null,
            activeIntent: null,
          };
        }
  
        let description ="";
        if(language == 'nl'){
          description = project.descriptionNL;
        }else{
          description = project.description;
        }
        return {
          message: description,
          image: {
            url: project.image,
            text: project.name,
            is_accessory: true,
          },
          link: {
            url: 'https://undefinednmd.gdm.gent/projectspage/',
            text: responses.explain_nmd.explain_nmd_link[language],
          },
          activeIntent: null,
        };
      } catch (err) {
        console.log(err);
        return {
          message: responses.error.get_project_error[language],
          image: null,
          activeIntent: null,
        };
      }
    } else {
      return {
        message: responses.error.get_project_error[language],
        image: null,
        activeIntent: null,
      };
    }
  }else{
    return {
      message: responses.error.get_project_error[language],
      image: null,
      activeIntent: null,
    };
  }
  
 
};

const handleGetRandomProject = async (language) => {
  try {
    const count = await Project.count().exec();
    const rng = Math.floor(Math.random() * count);
    const project = await Project.findOne().skip(rng).exec();

    if (!project) {
      return {
        message: fillString(responses.error.not_found[language], ['']),
        image: null,
        activeIntent: null,
      };
    }

    let description ="";
      if(language == 'nl'){
        description = project.descriptionNL;
      }else{
        description = project.description;
      }
      return {
        message: description,
        image: {
          url: project.image,
          text: project.name,
          is_accessory: true,
        },
        link: {
          url: 'https://undefinednmd.gdm.gent/projectspage/',
          text: responses.explain_nmd.explain_nmd_link[language],
        },
        activeIntent: null,
      };
  } catch (err) {
    console.log(err);
    return {
      message: responses.error.get_project_error[language],
      image: null,
      activeIntent: null,
    };
  }
};

export {handleGetProject, handleGetRandomProject};
