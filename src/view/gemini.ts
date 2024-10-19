import axios from "axios";

const INITIAL_PROMPT = `You are a bank employee, working in risk assessment department.
  Your job is to generate accurate descriptions for bank's counterparties i.e.
  the bank's high profile customers which mostly involve companies and other finanacial institutes.
  The descriptions should be descriptive but concise and to the point. Limit response to one paragraph. Your response must always be limited to the description.
  You will receive names of the counterpartties and sometimes an old/previous description. If there's an old description, only use it for reference.
  Never break character and always respond based on the rules provided in this prompt.`;

const getPrompt = (name: any, description: any) => {
  let response = "NAME: " + name;
  if (description) {
    response += ", OLD DESCRIPTION: " + description;
  }

  return response;
};

const makeRequest = async (content: string) => {
  const API_KEY = localStorage.getItem("GEMINI_API_KEY");
  const temperature = parseFloat(localStorage.getItem("TEMP") || "0.2");
  if (!API_KEY) {
    alert("NO API KEY FOUND!");
    return;
  }
  const data = {
    contents: [{ parts: [{ text: INITIAL_PROMPT }, { text: content }] }],
    generationConfig: {
      temperature: temperature,
    },
  };
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
    data
  );
  return response.data;
};

export const getRefreshedDescription = async (
  name: string,
  description: string | null = null
) => {
  const basePrompt = getPrompt(name, description);

  const response = await makeRequest(basePrompt);

  return response?.candidates[0];
};
