const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Grades a PET Writing task using Gemini AI.
 * @param {Object} part - The exam part data (instruction, email, prompt, etc.)
 * @param {string} userAnswer - The text written by the user.
 * @returns {Promise<Object>} - The AI's grading result.
 */
export const gradeWritingWithGemini = async (part, userAnswer) => {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    return { 
      error: "API Key Missing", 
      message: "Vui lòng thêm Gemini API Key vào file .env để kích hoạt tính năng chấm bài AI." 
    };
  }

  const prompt = `
    You are an expert Cambridge B1 Preliminary (PET) examiner. 
    Grade the following writing task based on the B1 PET criteria:
    1. Content (Did the student answer all parts of the question?)
    2. Communicative Achievement (Is the tone and format appropriate?)
    3. Organisation (Is it well-structured and connected?)
    4. Language (Vocabulary and Grammar usage).

    TASK DETAILS:
    - Type: ${part.type}
    - Instruction: ${part.instruction}
    ${part.email ? `- Context: ${JSON.stringify(part.email)}` : ""}
    ${part.promptSentence ? `- Required Start: ${part.promptSentence}` : ""}

    STUDENT'S ANSWER:
    "${userAnswer}"

    RESPONSE FORMAT (MANDATORY JSON):
    {
      "overallScore": 0-5,
      "criteria": {
        "content": { "score": 0-5, "feedback": "vietnamese feedback" },
        "communicativeAchievement": { "score": 0-5, "feedback": "vietnamese feedback" },
        "organisation": { "score": 0-5, "feedback": "vietnamese feedback" },
        "language": { "score": 0-5, "feedback": "vietnamese feedback" }
      },
      "generalComment": "A professional and encouraging summary in Vietnamese",
      "improvedVersion": "Re-written version of the student's answer at a high B1/B2 level"
    }

    Return ONLY the JSON object. No extra text.
  `;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API Status Error:", data);
      return { 
        error: "API Error", 
        message: data.error?.message || "Lỗi từ phía Google API. Vui lòng kiểm tra lại Key hoặc model." 
      };
    }

    if (!data.candidates || !data.candidates[0]) {
      console.error("Gemini API Empty Response:", data);
      return { 
        error: "Empty Response", 
        message: "Gemini không trả về kết quả. Có thể nội dung bị từ chối do chính sách an toàn." 
      };
    }

    const resultText = data.candidates[0].content.parts[0].text;
    
    // Clean JSON if the model returns it with markdown blocks
    const cleanJsonText = resultText.replace(/```json|```/g, "").trim();
    try {
      return JSON.parse(cleanJsonText);
    } catch (parseError) {
      console.error("JSON Parse Error:", cleanJsonText);
      return { error: "Parse Error", message: "AI trả về định dạng không đúng. Vui lòng thử lại." };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { error: "API Error", message: "Có lỗi xảy ra khi kết nối với Gemini AI. Vui lòng thử lại." };
  }
};
