import app from './app';
import config from './config'
/**
 * Set port and run application
 */
consola.info("Starting server...")
const PORT = config.serverPort || 8000;
app.listen(PORT,  () => {
  consola.start(`Server started on port: ${PORT}`);
});