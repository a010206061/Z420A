// api/analyze.js
const rateLimitMap = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Control básico anti-saturación (máx. 6 auditorías por minuto por IP)
  const ip = req.headers['x-forwarded-for'] || 'anon';
  const now = Date.now();
  const userHits = (rateLimitMap.get(ip) || []).filter(t => now - t < 60000);
  if (userHits.length >= 6) {
    return res.status(429).json({ error: 'Demasiadas peticiones. Espera un minuto.' });
  }
  userHits.push(now);
  rateLimitMap.set(ip, userHits);

  // Validar clave secreta configurada en Vercel
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY en el servidor' });
  }

  try {
    const { imageBase64, mimeType, note } = req.body;

    const visionPrompt = `Actúa como auditor de accesibilidad universal e inclusión urbana (ODS 10 y ODS 11) en Ciudad de México. Analiza la fotografía (si existe) y la referencia: "${note || ''}".
    Devuelve ÚNICAMENTE un JSON válido (sin bloques markdown) con:
    {
      "title": "Título corto y claro del punto urbano",
      "level": "safe|low|med|high",
      "cats": ["safe|alert|mobility|guidedog|sensory|c5|420"],
      "desc": "Diagnóstico claro de accesibilidad en máximo 30 palabras",
      "proposal": "Propuesta concreta de mejora urbana en máximo 25 palabras"
    }`;

    const parts = [{ text: visionPrompt }];
    if (imageBase64) {
      parts.push({
        inline_data: {
          mime_type: mimeType || 'image/jpeg',
          data: imageBase64
        }
      });
    }

    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );

    if (!geminiResp.ok) {
      throw new Error(`Error de Gemini: ${geminiResp.status}`);
    }

    const data = await geminiResp.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedResult = JSON.parse(rawText);

    return res.status(200).json(parsedResult);
  } catch (error) {
    return res.status(500).json({ error: 'Error al auditar con Gemini', details: error.message });
  }
}
