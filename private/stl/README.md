# Private STL Files

Place your STL files here. This directory is intentionally **outside** of `/public/`
so files cannot be accessed directly via a URL — they are only served through the
`/api/download` route after Stripe payment is verified.

## Expected filenames (must match `stlFile` in lib/products.ts)

- `tacoma-front-skid-plate.stl`
- `tacoma-roof-rack-system.stl`
- `tacoma-raptor-light-brackets.stl`
- `raptor_light_clip.stl`
- `tacoma-rock-sliders.stl`

## Deployment note

On Vercel or any serverless platform, static files in this directory are bundled
with your deployment and readable via `fs.readFile`. They are never web-accessible.
