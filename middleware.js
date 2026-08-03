export const config = {
  matcher: '/((?!favicon.ico).*)',
};

export default function middleware(request) {
  const auth = request.headers.get('authorization');

  const expectedUser = process.env.SITE_USER;
  const expectedPass = process.env.SITE_PASSWORD;

  if (auth) {
    const [, encoded] = auth.split(' ');
    const [user, pass] = atob(encoded).split(':');
    if (user === expectedUser && pass === expectedPass) {
      return new Response(null, { status: 200, headers: { 'x-middleware-next': '1' } });
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Graftr"' },
  });
}
