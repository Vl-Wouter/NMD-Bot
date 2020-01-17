const handleGetSchedule = async () => ({
  message: 'Het lessenrooster is te vinden op mijnrooster.arteveldehogeschool.be',
  link: {
    url: 'https://mijnrooster.arteveldehogeschool.be',
    text: 'Klik hier om het lessenrooster te bekijken',
  },
  activeIntent: null,
});

export default handleGetSchedule;
