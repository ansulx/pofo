// Use CommonJS require instead of import
const { configureSanityCors } = require('../sanity/config');

// Run the CORS configuration
configureSanityCors()
  .then(() => console.log('CORS settings updated successfully'))
  .catch((err: any) => console.error('Failed to update CORS settings:', err)); 