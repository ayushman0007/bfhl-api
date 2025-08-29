
# BFHL API – Express (Render/Railway)

## What this does
Implements a POST **/bfhl** endpoint that:
- Returns `is_success`, `user_id`, `email`, `roll_number`
- Splits numbers (as strings) into `odd_numbers` and `even_numbers`
- Collects `alphabets` (tokens that are only letters, uppercased)
- Collects `special_characters` (tokens that are only non-alphanumeric)
- Returns `sum` of all numbers as a string
- Returns `concat_string`: all alphabetic characters found in the input, reversed, in alternating caps (start Upper)

## Edit your details (IMPORTANT)
Open `server.js` and update these (or set env vars on the platform):
```
FULL_NAME       // lowercase full name, e.g. "ayushman singh"
DOB_DDMMYYYY    // e.g. "22072004"
EMAIL
ROLL_NUMBER
```

## Run locally
```bash
npm install
npm start
# POST http://localhost:3000/bfhl
```

## Quick test (Example A)
```bash
curl -X POST http://localhost:3000/bfhl   -H "Content-Type: application/json"   -d '{"data":["a","1","334","4","R","$"]}'
```

Expected core fields in response:
- `even_numbers: ["334","4"]`
- `odd_numbers: ["1"]`
- `alphabets: ["A","R"]`
- `special_characters: ["$"]`
- `sum: "339"`
- `concat_string: "Ra"`

## Deploy to Render
1. Push this folder to a public GitHub repo.
2. In Render: `New +` → `Web Service` → connect the repo.
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. After deploy, test `POST https://<your-service>.onrender.com/bfhl`

## Deploy to Railway
1. Push to GitHub.
2. In Railway: `New Project` → `Deploy from GitHub repo`.
3. Service will detect Node.js automatically.
4. Add ENV (optional): `FULL_NAME`, `DOB_DDMMYYYY`, `EMAIL`, `ROLL_NUMBER`.
5. On successful deploy, test `POST https://<domain>.up.railway.app/bfhl`
