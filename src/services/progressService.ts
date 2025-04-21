
type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const achievements: Achievement[] = [
  {
    id: "streak-5",
    name: "Bintang Pemula",
    description: "Berhasil menjawab 5 kali berturut-turut!",
    icon: "⭐"
  },
  {
    id: "streak-10",
    name: "Bintang Cerdas",
    description: "Berhasil menjawab 10 kali berturut-turut!",
    icon: "🌟"
  }
];

export const checkAchievement = (streak: number): Achievement | null => {
  if (streak === 5) return achievements[0];
  if (streak === 10) return achievements[1];
  return null;
};
