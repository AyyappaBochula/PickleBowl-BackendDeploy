# Free deployment

This app is deployed as one Django web service. Django serves both the React
site and its `/api/` endpoints, so no CORS or separate frontend host is needed.

## 1. Create the free database

1. Create a free project at [Neon](https://neon.com).
2. Copy its PostgreSQL connection string (the value beginning with
   `postgresql://`). Keep it private.

Neon's free database avoids Render Free Postgres's 30-day expiry. Its free tier
still has usage and storage limits, so it is appropriate for a small demo or
portfolio site.

## 2. Deploy to Render

1. Commit and push this repository to GitHub.
2. In [Render](https://dashboard.render.com/), choose **New > Blueprint** and
   select the repository.
3. Render reads `render.yaml`; enter these values when asked:
   - `DATABASE_URL`: your Neon connection string
   - `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: Razorpay test keys (omit only
     if you will not use payments)
4. Create the Blueprint and wait for the build to finish.
5. Open `https://picklebowl.onrender.com` (or the URL Render assigns if that
   name is unavailable).

The deployment runs migrations and builds the React bundle automatically.

## Django admin

The default Django admin is available at:

`https://<your-render-host>/superadmin/`

In Render, open the service's **Environment** settings and add these secret
variables before deploying:

- `DJANGO_SUPERUSER_USERNAME`
- `DJANGO_SUPERUSER_EMAIL`
- `DJANGO_SUPERUSER_PASSWORD`
- `ADMIN_NAME`
- `ADMIN_MOBILE`
- `ADMIN_PASSWORD`

The deploy automatically runs migrations and creates or updates both accounts.
Use the first three variables to sign in to Django admin. Use `ADMIN_MOBILE`
and `ADMIN_PASSWORD` to sign in to the separate PickleBowl custom admin panel
at `/admin/`.

## Product images

The API returns image URLs under `/media/`, and the Django service now serves
those URLs in production as well as development. Images already checked into
`Backend/media` are included in the deploy. Render's free filesystem is
ephemeral, so images uploaded through an admin panel can disappear after a
redeploy or service restart; use persistent object storage for production
uploads.

## Important free-tier limits

- Render Free web services sleep after 15 minutes of inactivity. The first
  request after sleep can take about a minute.
- Uploaded product images are not durable on a free Render service. Use the
  checked-in images for the demo, or later move uploads to object storage.
- Email notifications are disabled: Render Free blocks outbound SMTP on the
  usual ports. Checkout and tracking still work.
