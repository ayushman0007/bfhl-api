/**
 * BFHL API - Node.js + Express
 * Route: POST /bfhl
 * Expected 200 status on success
 * Edit FULL_NAME, DOB_DDMMYYYY, EMAIL, ROLL_NUMBER below before deployment.
 */
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ====== YOUR DETAILS (EDIT THESE) ======
const FULL_NAME = (process.env.FULL_NAME || "ayushman singh").toLowerCase(); // lowercase as per spec
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "22072004"; // ddmmyyyy
const EMAIL = process.env.EMAIL || "ayushman220704@gmail.com";
const ROLL_NUMBER = process.env.ROLL_NUMBER || "22BIT0473"; // <-- put your roll no.
// =======================================

const userId = `${FULL_NAME.replace(/\s+/g, "_")}_${DOB_DDMMYYYY}`;

function isDigitsOnly(str) { return /^[0-9]+$/.test(str); }
function isLettersOnly(str) { return /^[A-Za-z]+$/.test(str); }
function isNonAlnumOnly(str) { return /^[^A-Za-z0-9]+$/.test(str); }

function alternatingCapsFromReversed(allLetters) {
  const reversed = allLetters.split("").reverse();
  return reversed.map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())).join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body && Array.isArray(req.body.data) ? req.body.data : null;
    if (!data) {
      // As per spec, keep 200 but mark is_success false
      return res.status(200).json({
        is_success: false,
        user_id: userId,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sumNum = 0;
    const alphaChars = [];

    for (const item of data) {
      let s = "";
      if (typeof item === "number") s = String(item);
      else if (typeof item === "string") s = item;
      else s = "";

      if (s && isDigitsOnly(s)) {
        const n = parseInt(s, 10);
        (n % 2 === 0 ? even_numbers : odd_numbers).push(s); // keep as string
        sumNum += n;
      } else if (s && isLettersOnly(s)) {
        alphabets.push(s.toUpperCase());               // full token uppercased
        alphaChars.push(...s.split(""));               // letters for concat
      } else if (s && isNonAlnumOnly(s)) {
        special_characters.push(s);                    // keep as-is
      } else if (s) {
        // mixed strings: don't classify as number/alpha/special,
        // but DO extract alphabetic characters for concat_string requirement
        const lettersOnly = s.match(/[A-Za-z]/g);
        if (lettersOnly) alphaChars.push(...lettersOnly);
      }
    }

    const concat_string = alphaChars.length
      ? alternatingCapsFromReversed(alphaChars.join(""))
      : "";

    return res.status(200).json({
      is_success: true,
      user_id: userId,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sumNum),           // sum returned as string
      concat_string
    });
  } catch (e) {
    return res.status(200).json({
      is_success: false,
      user_id: userId,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("✅ BFHL API is live. Please use POST /bfhl with JSON body to test.");
});
app.listen(PORT, () => console.log(`BFHL API running on :${PORT}`));
