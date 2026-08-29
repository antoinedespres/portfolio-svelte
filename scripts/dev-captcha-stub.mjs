/**
 * Local stand-in for Friendly Captcha's siteverify API.
 *
 * Point FRIENDLYCAPTCHA_ENDPOINT at this while developing so the contact form
 * can be exercised end to end without a real sitekey or network access.
 *
 *   node scripts/dev-captcha-stub.mjs
 *
 * Any solution is accepted except the literal string "FAIL", which lets you
 * test the rejection path too.
 */
import http from 'node:http';

const PORT = Number(process.env.CAPTCHA_STUB_PORT ?? 4499);

http
	.createServer((req, res) => {
		let body = '';
		req.on('data', (c) => (body += c));
		req.on('end', () => {
			let response = '';
			try {
				response = JSON.parse(body || '{}').response ?? '';
			} catch {
				// Ignore malformed bodies; treated as an empty solution below.
			}
			const success = response.length > 0 && response !== 'FAIL';
			console.log(`[captcha-stub] solution=${JSON.stringify(response)} -> success=${success}`);
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ success }));
		});
	})
	.listen(PORT, () => {
		console.log(`[captcha-stub] listening on http://127.0.0.1:${PORT}`);
		console.log(`[captcha-stub] set FRIENDLYCAPTCHA_ENDPOINT=http://127.0.0.1:${PORT}`);
	});
