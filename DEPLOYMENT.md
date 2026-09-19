# Machinery Shop Manager — Deployment Notes

## What is included

Machinery Shop Manager is a responsive React + Express + tRPC + Drizzle application backed by MySQL. It includes the bilingual English/Bangla workspace shell, inventory and low-stock views, sales records with staff attribution, expense history, staff performance, custom period controls, report export, stock-quantity validation in the sale form, and password-access-ready staff records. The project schema contains the `users`, `staff`, `products`, `sales`, and `expenses` tables.

## Local setup

Install Node.js 20 or newer and pnpm. Copy the hosting provider's environment values into the runtime environment rather than committing a `.env` file. At minimum, configure `DATABASE_URL`, `JWT_SECRET`, and the Manus OAuth variables used by the scaffold. Then run:

```bash
pnpm install
pnpm db:push
pnpm dev
```

The production build is created with `pnpm build` and starts with `pnpm start`.

## Namecheap shared hosting

Namecheap plans differ in whether they expose a Node.js application runner. If the cPanel account exposes **Setup Node.js App**, create an application using Node.js 20+, set the application root to the unpacked project, set the startup file to `dist/index.js`, add the environment variables, and run `pnpm install --prod` after uploading the project. Build the application before uploading or run the build in the hosting shell when the plan allows it.

Create the MySQL database and user in cPanel, then use **phpMyAdmin** to run the SQL in `drizzle/0001_unusual_misty_knight.sql`. Keep the existing `users` table if the host already contains one from the authentication setup. Replace the host, username, password, and database name in `DATABASE_URL` with the values supplied by cPanel. If the plan does not support an always-on Node.js application, use a Node-capable VPS or Namecheap hosting tier rather than trying to serve the Express API from PHP-only shared hosting.

## Security checklist

Use HTTPS, a long random `JWT_SECRET`, separate database credentials, and least-privilege MySQL access. Keep staff passwords hashed server-side; do not store plaintext passwords in the `passwordHash` column. Restrict admin-only product and staff mutations through the existing `adminProcedure`. Before public launch, replace the preview-only seeded UI state with database-backed queries for the screen components and add CSRF/rate-limit controls appropriate for the selected hosting environment.

## Reporting

The UI's export control creates a spreadsheet-compatible CSV file. For a native `.xlsx` export in production, add a server-side Excel library such as `exceljs`, generate the workbook from the selected date range, and stream it from a protected route. The current export is intentionally dependency-light and works directly in the browser.
