const handleExplain = async (intent) => {
  if (intent === 'explain_NMD') {
    return {
      message: 'NMD staat voor New Media Development. Het is een keuzetraject binnen de opleiding Grafische en Digitale Media bij de Arteveldehogeschool in Gent.',
      image: {
        url: 'https://i.imgur.com/mL1SCAQ.jpg',
        text: 'NMD',
        is_accessory: true,
      },
      link: {
        url: 'https://www.arteveldehogeschool.be/opleidingen/bachelor/grafische-en-digitale-media/new-media-development-multimediaproductie',
        text: 'Meer info over de opleiding',
      },
      activeIntent: null,
    };
  } if (intent === 'explain_undefined') {
    return {
      message: 'Undefined NMD is een web agency bestaande uit derdejaarsstudenten New Media Development van de Arteveldehogeschool in Gent. Met de tagline We Build Digital Stuff werken we verschillende digitale projecten uit van beginschets tot eindproduct.',
      image: {
        url: 'https://i.imgur.com/tqDiRbD.jpg',
        text: 'Undefined logo',
        is_accessory: true,
      },
      link: {
        url: 'https://undefinednmd.gdm.gent/',
        text: 'Meer info over Undefined vind je hier',
      },
      activeIntent: null,
    };
  }
  return {
    message: 'Ik weet niet wat uit te leggen? Help?',
    activeIntent: null,
  };
};

export default handleExplain;
