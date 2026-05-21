const makePrompt = (dest1, dest2) =>
  `You are a travel expert. Compare these two destinations: "${dest1}" and "${dest2}".

IMPORTANT: Respond with ONLY a raw JSON object. No markdown, no code fences, no text before or after the JSON. Use only plain ASCII characters inside all string values.

Use exactly this structure:
{
  "dest1": "full name of destination 1",
  "dest2": "full name of destination 2",
  "shared": ["trait","trait","trait","trait","trait"],
  "unique1": ["trait","trait","trait","trait"],
  "unique2": ["trait","trait","trait","trait"],
  "pros1": ["pro","pro","pro","pro"],
  "cons1": ["con","con","con"],
  "pros2": ["pro","pro","pro","pro"],
  "cons2": ["con","con","con"],
  "verdict": "2 to 3 sentences on which destination is better for most travellers and why."
}`;

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let dest1, dest2;
  try {
    ({ dest1, dest2 } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1500,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: makePrompt(dest1, dest2) }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      statusCode: res.status,
      body: JSON.stringify({ error: data?.error?.message || "Groq API error" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: data.choices[0].message.content,
  };
}
