const shell = require('shelljs');
require('dotenv').config();

// Using hosted backend URL from process.env or fallback
const SWAGGER_URL = process.env.VITE_API_BASE_URL+ '/swagger-json'; 
const OUTPUT_DIR = 'src/api/generated';

console.log('Fetching Swagger JSON from:', SWAGGER_URL);

// Ensure output directory exists
shell.mkdir('-p', OUTPUT_DIR);

// Fetch Swagger JSON
if (shell.exec(`curl -o swagger.json ${SWAGGER_URL}`).code !== 0) {
  console.error('Error: Failed to fetch swagger.json. Is the backend running?');
  process.exit(1);
}

console.log('Generating API client...');

// Generate API Client
if (shell.exec(`npx openapi-generator-cli generate -g typescript-axios -i swagger.json -o ${OUTPUT_DIR} --skip-validate-spec`).code !== 0) {
  console.error('Error: API generation failed');
  process.exit(1);
}

// Cleanup
shell.rm('swagger.json');

console.log('API Client generated successfully!');
