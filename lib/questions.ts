import { Question } from "./types";

export const questions: Question[] = [
  {
    id: 1,
    pillar: "stress",
    text: "How often do you feel overwhelmed by your daily responsibilities?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Almost always", value: 0 }
    ]
  },
  {
    id: 2,
    pillar: "stress",
    text: "How well do you sleep on most nights?",
    options: [
      { label: "Very well", value: 3 },
      { label: "Fairly well", value: 2 },
      { label: "Poorly", value: 1 },
      { label: "Very poorly", value: 0 }
    ]
  },
  {
    id: 3,
    pillar: "focus",
    text: "How easy is it for you to concentrate on one task without getting distracted?",
    options: [
      { label: "Very easy", value: 3 },
      { label: "Somewhat easy", value: 2 },
      { label: "Difficult", value: 1 },
      { label: "Very difficult", value: 0 }
    ]
  },
  {
    id: 4,
    pillar: "focus",
    text: "How often does your mind wander when you are trying to work or study?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Very often", value: 0 }
    ]
  },
  {
    id: 5,
    pillar: "energy",
    text: "How would you describe your energy levels during the day?",
    options: [
      { label: "High and consistent", value: 3 },
      { label: "Moderate", value: 2 },
      { label: "Low by afternoon", value: 1 },
      { label: "Consistently low", value: 0 }
    ]
  },
  {
    id: 6,
    pillar: "energy",
    text: "How often do you feel physically or mentally drained without a clear reason?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Almost always", value: 0 }
    ]
  },
  {
    id: 7,
    pillar: "emotional_balance",
    text: "How well do you manage your emotions when things go wrong?",
    options: [
      { label: "Very well", value: 3 },
      { label: "Fairly well", value: 2 },
      { label: "Struggle sometimes", value: 1 },
      { label: "Struggle often", value: 0 }
    ]
  },
  {
    id: 8,
    pillar: "emotional_balance",
    text: "How often do you experience sudden mood changes throughout the day?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Very often", value: 0 }
    ]
  },
  {
    id: 9,
    pillar: "emotional_balance",
    text: "How often do you feel anxious or worried about things you cannot control?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Almost always", value: 0 }
    ]
  },
  {
    id: 10,
    pillar: "self_confidence",
    text: "How confident do you feel about your decisions in daily life?",
    options: [
      { label: "Very confident", value: 3 },
      { label: "Fairly confident", value: 2 },
      { label: "Unsure often", value: 1 },
      { label: "Rarely confident", value: 0 }
    ]
  },
  {
    id: 11,
    pillar: "self_confidence",
    text: "How often do you compare yourself negatively to others?",
    options: [
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 1 },
      { label: "Almost always", value: 0 }
    ]
  },
  {
    id: 12,
    pillar: "self_confidence",
    text: "How often do you feel proud of what you have accomplished recently?",
    options: [
      { label: "Often", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Rarely", value: 1 },
      { label: "Almost never", value: 0 }
    ]
  }
];
