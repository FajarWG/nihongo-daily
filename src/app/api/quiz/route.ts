import { NextRequest, NextResponse } from 'next/server';
import { model } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { chapter } = await req.json();

    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter number is required' },
        { status: 400 }
      );
    }

    // Check if we already have a quiz for this chapter (optional optimization)
    // For now, we always generate a new one or fetch from DB if we implemented caching logic.
    // The user requirement says: "Hasil quiz disimpan didatabase agar bisa melakukan quiz ulang tanpa request api."
    // So we should check DB first.

    /* 
    // TODO: Implement DB check
    const existingQuiz = await prisma.quizResult.findFirst({
      where: { chapter: Number(chapter) },
    });
    if (existingQuiz) {
       return NextResponse.json(existingQuiz.questions);
    }
    */

    const prompt = `Buatkan kuis 10 soal pilihan ganda tentang kosakata dan tata bahasa dasar dari buku Minna no Nihongo (Bab ${chapter}). Gunakan Bahasa Indonesia untuk pertanyaan, petunjuk, dan rasional, tetapi gunakan Bahasa Jepang (Hiragana/Katakana/Kanji/Romaji) untuk opsi jawaban. Format output HANYA dalam struktur JSON dibawah ini, tanpa teks pembuka, penutup, atau penjelasan lainnya.

Format:

 {
    "questions": [
      {
        "question": "Isi pertanyaan dalam Bahasa Indonesia.",
        "choices": [
          "Pilihan A (日本語)", 
          "Pilihan B (にほんご)", 
          "Pilihan C (ローマじ)", 
          "Pilihan D (Kanji 日本語)"
        ],
        "correct_answer": "Pilihan yang benar persis seperti di choices",
        "rationale": "Penjelasan jawaban benar dalam Bahasa Indonesia (opsional atau sesuai kebutuhan aplikasi)."
      }
    ]
  }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the text to ensure it's valid JSON
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const quizData = JSON.parse(jsonString);

    // Save to DB (Mocking for now as we might not have DB connection yet)
    // await prisma.quizResult.create({
    //   data: {
    //     chapter: Number(chapter),
    //     score: 0,
    //     total: 10,
    //     questions: quizData,
    //   },
    // });

    return NextResponse.json(quizData);
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
