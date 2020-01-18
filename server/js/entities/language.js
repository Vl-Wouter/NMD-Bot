const handleLanguage = async (entities) => {
  if ('language' in entities) {
    const newLanguage = entities.language[0].value;
    return {
      message: 'Ok.',
      session: {
        language: newLanguage === 'null' ? null : newLanguage,
      },
    };
  }
};

export default handleLanguage;
