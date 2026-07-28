// needyController.js
const NeedyColRefWpic = require("../models/needyModel");
const ProjDonorCollection = require("../models/donorModel")
const MedCollection = require("../models/availMed");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const outputFolder = path.join(__dirname, "../uploads/needy");
if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

const cleanJSONResponse = (text) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in Gemini response");
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("JSON Clean/Parse Error:", err.message);
    return {};
  }
};

const parseGeminiResponse = (rawText) => {
  const data = cleanJSONResponse(rawText);
  return {
    name: data.name || "",
    dob: data.dob ? new Date(data.dob) : "",
    gender: data.gender || "",
    address: data.address || "",
  };
};

const uploadFront = async (req, res) => {
  try {
    const file = req.files.frontadhar;
    const savePath = path.join(outputFolder, "front_" + Date.now() + path.extname(file.name));
    await file.mv(savePath);

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
    const imageBytes = fs.readFileSync(savePath).toString("base64");
    const result = await model.generateContent([
      {
        text: `Extract the following from the Aadhaar image and respond strictly as minified JSON with keys in lowercase only:
{"name": "", "dob": "YYYY-MM-DD", "gender": "", "address": ""}`,
      },
      {
        inlineData: { mimeType: file.mimetype, data: imageBytes },
      },
    ]);
    const text = result.response.text();
    const extracted = parseGeminiResponse(text);

    res.json({ status: true, extracted, imageUrl: savePath });
  } catch (err) {
    console.error(err);
    res.json({ status: false, msg: "Front Aadhaar upload failed" });
  }
};

const uploadBack = async (req, res) => {
  try {
    const file = req.files.backadhar;
    const savePath = path.join(outputFolder, "back_" + Date.now() + path.extname(file.name));
    await file.mv(savePath);

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
    const imageBytes = fs.readFileSync(savePath).toString("base64");
    const result = await model.generateContent([
      {
        text: `Extract ONLY the address from the Aadhaar image and respond strictly as minified JSON:
{"address": ""}`,
      },
      {
        inlineData: { mimeType: file.mimetype, data: imageBytes },
      },
    ]);
    const text = result.response.text();
    const extracted = parseGeminiResponse(text);

    res.json({ status: true, extracted, imageUrl: savePath });
  } catch (err) {
    console.error(err);
    res.json({ status: false, msg: "Back Aadhaar upload failed" });
  }
};

const saveNeedy = async (req, res) => {
  try {
    const doc = await NeedyColRefWpic.create(req.body);
    res.json({ status: true, data: doc });
  } catch (err) {
    console.error(err);
    res.json({ status: false, msg: err.message });
  }
};

const fetchNeedy = async (req, res) => {
  try {
    const doc = await NeedyColRefWpic.findOne({ emailid: req.body.emailid });
    if (!doc) return res.json({ status: false, msg: "No record found" });
    res.json({ status: true, data: doc });
  } catch (err) {
    console.error(err);
    res.json({ status: false, msg: "Fetch failed" });
  }
};

const medfinder = async (req, res) => {
  const city = req.body.city.trim().toLowerCase(); // Trims extra spaces
  const medName = req.body.medName.trim();                   

  console.log("Received:", { city, medName }); // ✅ Debug log

  try {
    const emails = await ProjDonorCollection.distinct("emailid", { curcity: city });
    console.log("Matching emails:", emails); // ✅ Debug log

    if (emails.length === 0) return res.json([]);

    const meds = await MedCollection.find({
      emailid: { $in: emails },
      medicine: { $regex: `^${medName}$`, $options: "i" }
    }).lean();

    console.log("Medicines found:", meds); // ✅ Debug log

    res.json(meds);
  } catch (err) {
    console.error("Error in medfinder:", err); // ✅ Show error
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const getRecentMedicines = async (req, res) => {
  try {
    const recent = await MedCollection.find({})
      .sort({ _id: -1 }) // latest first using ObjectId sorting
      .limit(5); // return only the latest 5
    res.json(recent);
  } catch (err) {
    console.error("Error fetching recent medicines:", err.message);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};


// In needyController.js
const getContactDetails = async (req, res) => {
  try {
    const { emailid } = req.params;
    const doc = await ProjDonorCollection.findOne({ emailid });
    if (!doc) return res.status(404).json({ status: false, msg: "No donor found" });

    res.json({
      name: doc.name,
      email: doc.emailid,
      phone: doc.contact,
      address: doc.curaddress,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};


module.exports = { uploadFront, uploadBack, saveNeedy, fetchNeedy, medfinder, getRecentMedicines,getContactDetails };