import { colors } from "@/constants/liveChatColor";

export function getRandomChatColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];

  return randomColor;
}