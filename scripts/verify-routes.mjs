import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import net from 'node:net';
import { spawn, spawnSync } from 'node:child_process';

const args = new Set(process.argv.slice(2));
const shouldSpawnServer = args.has('--spawn-server') || process.env.VERIFY_SPAWN_SERVER === '1';

const CORE_HTML_ROUTES = [
  '/',
  '/about',
  '/events',
  '/events/art',
  '/events/literary',
  '/events/music',
  '/events/theatre',
  '/events/dance',
  '/schedule',
  '/notice-board',
  '/team',
  '/gallery',
  '/winners',
];

const SPRITE_FILES = [
  'sakura_blossoms.png',
  'sakura_petals.png',
  'sakura_branch.png',
  'butterflies.png',
];

function runStaticChecks() {
  console.log('--- Verifying Blossoms SOS Routes & 404 Pages ---');

  // 1. Verify Source Route Definitions
  const requiredAppRoutes = [
    'src/app/page.tsx',
    'src/app/about/page.tsx',
    'src/app/events/page.tsx',
    'src/app/events/[category]/page.tsx',
    'src/app/schedule/page.tsx',
    'src/app/notice-board/page.tsx',
    'src/app/team/page.tsx',
    'src/app/gallery/page.tsx',
    'src/app/winners/page.tsx',
    'src/app/not-found.tsx',
  ];

  for (const route of requiredAppRoutes) {
    const fullPath = path.resolve(process.cwd(), route);
    assert(fs.existsSync(fullPath), `Missing required route file: ${route}`);
    console.log(`✔ Verified route file: ${route}`);
  }

  // 2. Verify Custom 404 Page Source & Capabilities
  const notFoundSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/app/not-found.tsx'), 'utf8');
  assert(notFoundSrc.includes('Lost in the Quadrangle?'), 'Custom 404 must contain headline');
  assert(notFoundSrc.includes('ERROR 404 • ROUTE NOT FOUND'), 'Custom 404 must contain status indicator');
  assert(notFoundSrc.includes('/events/${d.slug}'), 'Custom 404 must link to category disciplines');
  assert(notFoundSrc.includes('/schedule'), 'Custom 404 must link to Schedule');
  assert(notFoundSrc.includes('/notice-board'), 'Custom 404 must link to Notice Board');
  assert(notFoundSrc.includes('/about'), 'Custom 404 must link to About');
  assert(notFoundSrc.includes('BackButton'), 'Custom 404 must include interactive BackButton');
  console.log('✔ Custom 404 page content, recovery links, and pillar navigation verified.');

  // 3. Verify next.config.ts Redirects & Aliases
  const nextConfigText = fs.readFileSync(path.resolve(process.cwd(), 'next.config.ts'), 'utf8');
  assert(nextConfigText.includes('/index.html'), 'Redirect for index.html required');
  assert(nextConfigText.includes('/about.html'), 'Redirect for about.html required');
  assert(nextConfigText.includes('/event1.html'), 'Redirect for event1.html required');
  assert(nextConfigText.includes('/events/theater'), 'Redirect for theater spelling alias required');
  console.log('✔ Configured redirects and URL routing aliases verified.');

  // 3.5 Verify ScrollAmbience Mount, Z-Layering & 2D Sprite Assets
  const layoutSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/app/layout.tsx'), 'utf8');
  const ambienceSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/components/effects/ScrollAmbience.tsx'), 'utf8');
  assert(layoutSrc.includes('<ScrollAmbience />'), 'RootLayout must mount <ScrollAmbience />');
  assert(ambienceSrc.includes('z-30'), 'ScrollAmbience canvas must use z-30 above z-20 sections');
  for (const sprite of SPRITE_FILES) {
    const spritePath = path.resolve(process.cwd(), 'public/sprites', sprite);
    assert(fs.existsSync(spritePath) && fs.statSync(spritePath).size > 500, `Missing or empty sprite sheet: ${sprite}`);
  }
  console.log('✔ ScrollAmbience mount, z-30 layering, and 2D sprite sheets verified.');

  // 3.6 Verify Self-Hosted Brand Variable Fonts & Non-Cyclic @theme Tokens
  const globalsCss = fs.readFileSync(path.resolve(process.cwd(), 'src/styles/globals.css'), 'utf8');
  assert(!globalsCss.includes('--font-body: var(--font-body)'), 'globals.css must not have a cyclic --font-body self-reference');
  assert(globalsCss.includes('--font-sans: var(--font-jakarta)'), 'globals.css must map --font-sans to --font-jakarta');
  for (const fontFile of [
    'Orbitron-Variable.woff2',
    'SpaceGrotesk-Variable.woff2',
    'PlusJakartaSans-Variable.woff2',
    'CormorantGaramond-Variable.woff2',
  ]) {
    const fontPath = path.resolve(process.cwd(), 'src/fonts', fontFile);
    assert(fs.existsSync(fontPath) && fs.statSync(fontPath).size > 5000, `Missing variable font: ${fontFile}`);
  }
  console.log('✔ Self-hosted Orbitron, Space Grotesk, Plus Jakarta Sans & Cormorant Garamond fonts verified.');
}

async function isBlossomsServerRunning(baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/`, { signal: AbortSignal.timeout(1500) });
    if (res.status !== 200) return false;
    const poweredBy = res.headers.get('x-powered-by') ?? '';
    const html = await res.text();
    return poweredBy.includes('Next.js') || (html.includes('Blossoms') && html.includes('/_next/'));
  } catch {
    return false;
  }
}

function tryListenPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => {
      const addr = server.address();
      const chosenPort = typeof addr === 'object' && addr ? addr.port : port;
      server.close((closeErr) => {
        if (closeErr) reject(closeErr);
        else resolve(chosenPort);
      });
    });
  });
}

async function findAvailablePort(preferredPort = 3199) {
  try {
    return await tryListenPort(preferredPort);
  } catch {
    return await tryListenPort(0);
  }
}

function spawnNextStart(port) {
  const localNextCli = path.resolve(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next');
  const useLocalCli = fs.existsSync(localNextCli);
  const command = useLocalCli ? process.execPath : (process.platform === 'win32' ? 'npx.cmd' : 'npx');
  const cmdArgs = useLocalCli
    ? [localNextCli, 'start', '-p', String(port)]
    : ['next', 'start', '-p', String(port)];

  const child = spawn(command, cmdArgs, {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: process.platform !== 'win32',
    shell: !useLocalCli && process.platform === 'win32',
  });

  let recentLogs = '';
  const appendLog = (chunk) => {
    recentLogs = (recentLogs + chunk.toString('utf8')).slice(-4000);
  };
  child.stdout?.on('data', appendLog);
  child.stderr?.on('data', appendLog);

  return { child, getLogs: () => recentLogs };
}

async function waitForServer(baseUrl, child, getLogs, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (child.exitCode !== null || child.signalCode !== null) {
      throw new Error(
        `next start exited prematurely (code=${child.exitCode}, signal=${child.signalCode}).\n${getLogs()}`,
      );
    }
    if (await isBlossomsServerRunning(baseUrl)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting ${timeoutMs}ms for ${baseUrl} to become ready.\n${getLogs()}`);
}

async function killProcessTree(child) {
  if (!child || child.pid == null) return;

  const exited = new Promise((resolve) => {
    if (child.exitCode !== null || child.signalCode !== null) {
      resolve();
      return;
    }
    child.once('exit', resolve);
    setTimeout(resolve, 2500).unref();
  });

  if (child.exitCode === null && child.signalCode === null) {
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      try {
        process.kill(-child.pid, 'SIGTERM');
      } catch {
        try {
          child.kill('SIGTERM');
        } catch {
          // Process already exited
        }
      }
    }
  }

  await exited;

  if (process.platform !== 'win32' && child.exitCode === null && child.signalCode === null) {
    try {
      process.kill(-child.pid, 'SIGKILL');
    } catch {
      try {
        child.kill('SIGKILL');
      } catch {
        // Ignore if already exited
      }
    }
  }

  child.stdout?.destroy();
  child.stderr?.destroy();
  child.unref();
}

function assertHealthyHtml(route, res, html) {
  assert.strictEqual(res.status, 200, `Expected 200 for ${route}, got ${res.status}`);
  assert(html.trim().length > 100, `Expected non-empty HTML body for ${route}`);
  assert(/<html[\s>]/i.test(html), `Expected valid HTML document for ${route}`);
  assert(!html.includes('__next_error__'), `Detected __next_error__ marker on ${route}`);
  assert(!html.includes('Application error'), `Detected Application error marker on ${route}`);
}

async function verifyLiveEndpoints(baseUrl) {
  for (const route of CORE_HTML_ROUTES) {
    const res = await fetch(`${baseUrl}${route}`, { signal: AbortSignal.timeout(10000) });
    const html = await res.text();
    assertHealthyHtml(route, res, html);
    console.log(`✔ Live HTML ${baseUrl}${route} -> ${res.status} (${html.length} bytes)`);
  }

  const apiRoute = '/api/drive-posters';
  const apiRes = await fetch(`${baseUrl}${apiRoute}`, { signal: AbortSignal.timeout(10000) });
  assert.strictEqual(apiRes.status, 200, `Expected 200 for ${apiRoute}, got ${apiRes.status}`);
  const apiText = await apiRes.text();
  assert(apiText.trim().length > 0, `Expected non-empty response body for ${apiRoute}`);
  const apiJson = JSON.parse(apiText);
  assert(Array.isArray(apiJson.posters), `Expected posters array in ${apiRoute} JSON`);
  console.log(`✔ Live API ${baseUrl}${apiRoute} -> ${apiRes.status} (${apiJson.posters.length} posters)`);

  for (const sprite of SPRITE_FILES) {
    const spriteRoute = `/sprites/${sprite}`;
    const res = await fetch(`${baseUrl}${spriteRoute}`, { signal: AbortSignal.timeout(5000) });
    assert.strictEqual(res.status, 200, `Expected 200 for ${spriteRoute}, got ${res.status}`);
    console.log(`✔ Live asset ${baseUrl}${spriteRoute} -> ${res.status}`);
  }

  const notFoundRes = await fetch(`${baseUrl}/unknown-test-route-404`, { signal: AbortSignal.timeout(5000) });
  assert.strictEqual(notFoundRes.status, 404, `Expected 404 for /unknown-test-route-404, got ${notFoundRes.status}`);
  console.log(`✔ Live 404 ${baseUrl}/unknown-test-route-404 -> ${notFoundRes.status}`);
}

async function main() {
  runStaticChecks();

  const existingPort3000 = await isBlossomsServerRunning('http://localhost:3000');
  if (existingPort3000) {
    console.log('Live Blossoms SOS server detected on http://localhost:3000, performing endpoint validation...');
    await verifyLiveEndpoints('http://localhost:3000');
  } else if (shouldSpawnServer) {
    const distDir = process.env.NEXT_DIST_DIR || '.next';
    const buildIdPath = path.resolve(process.cwd(), distDir, 'BUILD_ID');
    assert(
      fs.existsSync(buildIdPath),
      `Missing production build (${distDir}/BUILD_ID). Run "npm run build" before "--spawn-server".`,
    );

    const port = await findAvailablePort(3199);
    const baseUrl = `http://127.0.0.1:${port}`;
    console.log(`Spawning temporary Next.js production server on ${baseUrl}...`);
    const { child, getLogs } = spawnNextStart(port);
    try {
      await waitForServer(baseUrl, child, getLogs, 30000);
      console.log(`Server ready on ${baseUrl}, validating all core routes...`);
      await verifyLiveEndpoints(baseUrl);
    } finally {
      await killProcessTree(child);
      console.log('✔ Cleanly terminated temporary Next.js server.');
    }
  } else {
    console.log('No live Blossoms SOS server detected on http://localhost:3000; skipped live endpoint checks.');
  }

  console.log('All route and 404 checks passed successfully!');
}

await main();
