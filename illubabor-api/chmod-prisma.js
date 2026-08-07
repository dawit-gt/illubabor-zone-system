const { execSync } = require('child_process');
try {
  execSync('chmod +x node_modules/.bin/prisma', { stdio: 'inherit' });
} catch (e) {
  console.log('chmod-prisma: skipped (non-unix or already executable)');
}
