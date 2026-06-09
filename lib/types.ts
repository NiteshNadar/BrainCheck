export interface AnswerOption {
  label: string;
  value: number;
}

export interface Question {
  id: number;
  pillar: "stress" | "focus" | "energy" | "emotional_balance" | "self_confidence";
  text: string;
  options: AnswerOption[];
}

export interface AnswerSelection {
  question_id: number;
  question_text: string;
  selected_answer: string;
  pillar: string;
}
