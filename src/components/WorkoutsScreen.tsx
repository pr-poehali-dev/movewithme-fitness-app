import { useState } from "react";
import Icon from "@/components/ui/icon";
import WorkoutDetailScreen from "@/components/WorkoutDetailScreen";

const CATEGORIES = ["Все", "Кардио", "Силовая", "HIIT", "Растяжка", "Йога"];

const ALL_WORKOUTS = [
  {
    id: 1,
    title: "Утренний старт",
    duration: "15 мин",
    calories: 120,
    level: "Новичок",
    category: "Кардио",
    color: "#4A90E2",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/72d96943-3590-43b8-933a-5c12da07f872.jpg",
    exercises: 8,
  },
  {
    id: 2,
    title: "Сила тела",
    duration: "25 мин",
    calories: 210,
    level: "Средний",
    category: "Силовая",
    color: "#F5A623",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/83426f29-926b-463c-b6b5-abc4642b25e0.jpg",
    exercises: 12,
  },
  {
    id: 3,
    title: "Кардио-взрыв",
    duration: "20 мин",
    calories: 180,
    level: "Средний",
    category: "HIIT",
    color: "#50C878",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/ee16eecd-99db-4d24-a1f5-ca35a242816a.jpg",
    exercises: 10,
  },
  {
    id: 4,
    title: "Полный заряд",
    duration: "30 мин",
    calories: 260,
    level: "Продвинутый",
    category: "HIIT",
    color: "#FF7E7E",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/ee16eecd-99db-4d24-a1f5-ca35a242816a.jpg",
    exercises: 15,
  },
  {
    id: 5,
    title: "Растяжка после дня",
    duration: "10 мин",
    calories: 60,
    level: "Новичок",
    category: "Растяжка",
    color: "#9B8EFF",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/72d96943-3590-43b8-933a-5c12da07f872.jpg",
    exercises: 6,
  },
  {
    id: 6,
    title: "Утренняя йога",
    duration: "20 мин",
    calories: 90,
    level: "Новичок",
    category: "Йога",
    color: "#50C8C8",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/72d96943-3590-43b8-933a-5c12da07f872.jpg",
    exercises: 9,
  },
];

const LEVEL_COLOR: Record<string, string> = {
  Новичок: "#50C878",
  Средний: "#F5A623",
  Продвинутый: "#FF7E7E",
};

export default function WorkoutsScreen() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [favorites, setFavorites] = useState<number[]>([1]);
  const [openWorkoutId, setOpenWorkoutId] = useState<number | null>(null);

  if (openWorkoutId === 1) {
    return <WorkoutDetailScreen onBack={() => setOpenWorkoutId(null)} />;
  }

  const filtered =
    activeCategory === "Все"
      ? ALL_WORKOUTS
      : ALL_WORKOUTS.filter((w) => w.category === activeCategory);

  const toggleFav = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-2 pb-3 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#1a1e2e] font-montserrat">Тренировки</h2>
        <button className="w-9 h-9 rounded-2xl bg-[#f0f4ff] flex items-center justify-center">
          <Icon name="Search" size={16} style={{ color: "#4A90E2" }} />
        </button>
      </div>

      {/* Featured banner */}
      <div className="px-6 mb-4 opacity-0-init animate-fade-in">
        <div
          className="relative rounded-3xl overflow-hidden p-5 flex items-end"
          style={{
            height: "130px",
            background: "linear-gradient(135deg, #1a2a4a 0%, #2d5be3 100%)",
          }}
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 bg-white" />
          <div className="absolute right-8 bottom-0 w-16 h-16 rounded-full opacity-15 bg-[#F5A623]" />
          <div className="relative z-10">
            <p className="text-white/60 text-[11px] font-golos mb-1">Программа недели</p>
            <h3 className="text-base font-bold text-white font-montserrat leading-tight">
              7 дней — новый уровень силы
            </h3>
          </div>
          <button
            className="relative z-10 ml-auto flex-shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-2 rounded-xl font-montserrat flex items-center gap-1.5"
          >
            <Icon name="Play" size={12} className="text-white" />
            Старт
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-4 opacity-0-init animate-fade-in delay-100">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold font-montserrat transition-all"
              style={{
                background: activeCategory === cat ? "#4A90E2" : "#f0f0f0",
                color: activeCategory === cat ? "white" : "#888",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Workouts list */}
      <div className="px-6 pb-6 flex flex-col gap-3 opacity-0-init animate-fade-in delay-200">
        <p className="text-xs text-gray-400 font-golos">
          {filtered.length} тренировок
        </p>
        {filtered.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-2xl overflow-hidden card-hover"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-stretch">
              {/* Image */}
              <div className="relative w-24 flex-shrink-0">
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, transparent 60%, rgba(255,255,255,0))`,
                  }}
                />
                <span
                  className="absolute bottom-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-lg font-montserrat text-white"
                  style={{ background: w.color }}
                >
                  {w.category}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat leading-tight pr-2">
                    {w.title}
                  </h4>
                  <button
                    onClick={() => toggleFav(w.id)}
                    className="flex-shrink-0 w-7 h-7 rounded-xl bg-gray-50 flex items-center justify-center"
                  >
                    <Icon
                      name="Heart"
                      size={13}
                      style={{
                        color: favorites.includes(w.id) ? "#FF7E7E" : "#ccc",
                        fill: favorites.includes(w.id) ? "#FF7E7E" : "none",
                      }}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[10px] text-gray-400 font-golos">
                    <Icon name="Clock" size={10} className="text-gray-400" />
                    {w.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400 font-golos">
                    <Icon name="Zap" size={10} className="text-gray-400" />
                    {w.calories} ккал
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400 font-golos">
                    <Icon name="Layers" size={10} className="text-gray-400" />
                    {w.exercises} упр.
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span
                    className="text-[10px] font-semibold font-montserrat px-2 py-0.5 rounded-lg"
                    style={{
                      color: LEVEL_COLOR[w.level],
                      background: `${LEVEL_COLOR[w.level]}18`,
                    }}
                  >
                    {w.level}
                  </span>
                  <button
                    onClick={() => setOpenWorkoutId(w.id)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#4A90E2] font-montserrat"
                  >
                    Начать
                    <Icon name="ChevronRight" size={12} style={{ color: "#4A90E2" }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}