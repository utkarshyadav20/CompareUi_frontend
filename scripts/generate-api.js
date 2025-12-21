const shell = require('shelljs');

// Using port 1000 as configured in backend .env and verified in previous steps
const SWAGGER_URL = 'http://localhost:1000/api-json'; 
const OUTPUT_DIR = 'src/api/generated';

console.log('Fetching Swagger JSON...');

// Ensure output directory exists
shell.mkdir('-p', OUTPUT_DIR);

// Fetch Swagger JSON
// The backend might expose it at /swagger-json or /api-json. 
// Based on "SwaggerModule.setup('swagger', app, document)" in main.ts, it's likely /swagger-json or accessible via the UI.
// However, the "new compare" script used http://localhost:1000/swagger-json.
if (shell.exec('curl -o swagger.json http://localhost:1000/swagger-json').code !== 0) {
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
