const PUBLIC_KEYS = ["summary", "threatOverview", "candidates", "answerComparison"];

function isolatePublicAnalysis(source = {}) {
  return Object.fromEntries(PUBLIC_KEYS.filter((key) => source[key] !== undefined).map((key) => [key, source[key]]));
}

export function explanationPayload(question) {
  const detailed = question.detailedExplanation;
  if (detailed) {
    const publicSource = detailed.publicAnalysis ?? detailed;
    return {
      mode: "detailed",
      publicAnalysis: isolatePublicAnalysis(publicSource),
      truthReview: detailed.truthReview ?? null,
    };
  }

  return {
    mode: "legacy",
    publicExplanation: question.publicExplanation ?? question.explanation ?? "",
    publicDecision: question.publicDecision ?? null,
    truthReview: question.truthExplanation ?? null,
  };
}

export function candidateRecords(payload) {
  if (payload.mode === "detailed") return payload.publicAnalysis.candidates ?? [];
  return payload.publicDecision?.candidates ?? [];
}
