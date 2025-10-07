APD-HSE-Dashboard
=================

This is the full source project (React + TypeScript + Vite + Tailwind) for APD HSE Dashboard.
Default login: admin / admin123
Default dummy company: PT Dummy Sejahtera

How to run locally:
1. npm install
2. npm run dev
3. Open http://localhost:5173

How to build (generate dist):
1. npm install
2. npm run build
3. The build output will be in the 'dist' folder.

Deploy to Vercel (recommended):
1. Create a Vercel account and login.
2. In Vercel dashboard choose 'New Project' -> 'Import from Git' or 'Import from Local'.
3. If importing from local, select this project folder. Vercel will run 'npm install' and 'npm run build' automatically.
4. Ensure build command: npm run build and output directory: dist
5. Deploy. The site will be available at https://<your-project>.vercel.app

Notes:
- This archive includes the full source. I couldn't run 'npm run build' in this environment, so 'dist' is not pre-generated here. Vercel will build on deploy automatically, or you can run 'npm run build' locally to generate 'dist' before uploading.
- If you prefer a pre-built 'dist' zip, run 'npm install' then 'npm run build' locally and I can help with packaging the built output.
