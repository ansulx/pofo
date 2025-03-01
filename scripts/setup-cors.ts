import { configureSanityCors } from '../sanity/config';

// Run the CORS configuration
configureSanityCors()
  .then(() => console.log('CORS settings updated successfully'))
  .catch(err => console.error('Failed to update CORS settings:', err)); 