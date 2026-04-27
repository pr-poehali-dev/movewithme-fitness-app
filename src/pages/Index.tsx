import { useState } from "react";
import Icon from "@/components/ui/icon";
import ProfileScreen from "@/components/ProfileScreen";

const WORKOUTS = [
  {
    id: 1,
    title: "Утренний старт",
    duration: "15 мин",
    level: "Новичок",
    calories: 120,
    category: "Кардио",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/72d96943-3590-43b8-933a-5c12da07f872.jpg",
    color: "#4A90E2",
  },
  {
    id: 2,
    title: "Сила тела",
    duration: "25 мин",
    level: "Средний",
    calories: 210,
    category: "Силовая",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/83426f29-926b-463c-b6b5-abc4642b25e0.jpg",
    color: "#F5A623",
  },
  {
    id: 3,
    title: "Кардио-взрыв",
    duration: "20 мин",
    level: "Средний",
    calories: 180,
    category: "HIIT",
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/ee16eecd-99db-4d24-a1f5-ca35a242816a.jpg",
    color: "#50C878",
  },
];

const STATS = [
  { label: "Тренировок", value: "12", icon: "Flame", color: "#4A90E2" },
  { label: "Минут", value: "284", icon: "Clock", color: "#F5A623" },
  { label: "Калорий", value: "2 140", icon: "Zap", color: "#50C878" },
];

const ACHIEVEMENTS = [
  { icon: "🔥", label: "3 дня подряд", earned: true },
  { icon: "⚡", label: "Первая тренировка", earned: true },
  { icon: "🏆", label: "Неделя активности", earned: false },
  { icon: "💪", label: "10 тренировок", earned: false },
];

const NAV_ITEMS = [
  { icon: "Home", label: "Главная" },
  { icon: "Dumbbell", label: "Тренировки" },
  { icon: "BarChart2", label: "Прогресс" },
  { icon: "Users", label: "Сообщество" },
  { icon: "User", label: "Профиль" },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState(0);
  const [likedWorkout, setLikedWorkout] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center p-4 py-10">
      {/* Phone frame */}
      <div
        className="relative w-full max-w-[390px] bg-white overflow-hidden"
        style={{
          borderRadius: "40px",
          boxShadow: "0 40px 80px rgba(74, 144, 226, 0.18), 0 8px 24px rgba(0,0,0,0.08)",
          minHeight: "844px",
        }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-8 pt-5 pb-2">
          <span className="text-xs font-semibold text-gray-400 font-montserrat">9:41</span>
          <div className="flex gap-1.5 items-center">
            <Icon name="Signal" size={12} className="text-gray-400" />
            <Icon name="Wifi" size={12} className="text-gray-400" />
            <Icon name="Battery" size={12} className="text-gray-400" />
          </div>
        </div>

        {activeNav === 4 ? (
          <ProfileScreen />
        ) : (
        <>
        {/* Header */}
        <div className="px-6 pt-2 pb-4 flex justify-between items-center opacity-0-init animate-fade-in">
          <div>
            <p className="text-sm text-gray-400 font-golos">Доброе утро 👋</p>
            <h1 className="text-2xl font-bold text-[#1a1e2e] font-montserrat leading-tight">
              Алексей
            </h1>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-[#4A90E2] flex items-center justify-center animate-pulse-ring cursor-pointer">
              <Icon name="Bell" size={18} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F5A623] rounded-full flex items-center justify-center">
              <span className="text-[9px] text-white font-bold font-montserrat">2</span>
            </div>
          </div>
        </div>

        {/* Today's challenge card */}
        <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-100">
          <div
            className="relative rounded-3xl overflow-hidden p-5"
            style={{
              background: "linear-gradient(135deg, #1a2a4a 0%, #2d5be3 100%)",
              minHeight: "140px",
            }}
          >
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-10 bg-white" />
            <div className="absolute right-10 bottom-0 w-24 h-24 rounded-full opacity-10 bg-[#F5A623]" />
            <div className="relative z-10">
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 font-montserrat">
                Тренировка дня
              </span>
              <h2 className="text-xl font-bold text-white font-montserrat mb-1">
                Полный заряд на день
              </h2>
              <p className="text-white/70 text-sm font-golos mb-4">
                20 мин · Кардио + Сила · 160 ккал
              </p>
              <button
                className="flex items-center gap-2 bg-white text-[#2d5be3] text-sm font-bold px-4 py-2 rounded-xl font-montserrat transition-all hover:scale-105 active:scale-95"
                style={{ boxShadow: "0 4px 12px rgba(255,255,255,0.3)" }}
              >
                <Icon name="Play" size={14} />
                Начать
              </button>
            </div>
          </div>
        </div>

        {/* Weekly progress */}
        <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-bold text-[#1a1e2e] font-montserrat">Неделя</h3>
            <span className="text-xs text-[#4A90E2] font-semibold font-golos">3 из 5</span>
          </div>
          <div className="flex gap-2">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-xl transition-all flex items-center justify-center"
                  style={{
                    height: "36px",
                    background:
                      i < 3
                        ? "#4A90E2"
                        : i === 3
                        ? "rgba(74,144,226,0.12)"
                        : "#F0F0F0",
                    border: i === 3 ? "2px dashed #4A90E2" : "2px solid transparent",
                  }}
                >
                  {i < 3 && <Icon name="Check" size={12} className="text-white" />}
                  {i === 3 && (
                    <span className="text-[9px] text-[#4A90E2] font-bold font-montserrat">
                      Сег
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 font-golos">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-300">
          <div className="grid grid-cols-3 gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-3 text-center"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: `${stat.color}18` }}
                >
                  <Icon name={stat.icon} size={16} style={{ color: stat.color }} />
                </div>
                <p className="text-base font-bold text-[#1a1e2e] font-montserrat leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 font-golos">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended workouts */}
        <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-400">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-bold text-[#1a1e2e] font-montserrat">Рекомендуем</h3>
            <button className="text-xs text-[#4A90E2] font-semibold font-golos">Все →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
            {WORKOUTS.map((w) => (
              <div
                key={w.id}
                className="flex-shrink-0 w-44 rounded-2xl overflow-hidden card-hover cursor-pointer"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              >
                <div className="relative h-28">
                  <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => setLikedWorkout(likedWorkout === w.id ? null : w.id)}
                      className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all"
                    >
                      <Icon
                        name="Heart"
                        size={13}
                        className={likedWorkout === w.id ? "text-red-400" : "text-white"}
                      />
                    </button>
                  </div>
                  <span
                    className="absolute bottom-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full font-montserrat text-white"
                    style={{ background: w.color }}
                  >
                    {w.category}
                  </span>
                </div>
                <div className="bg-white p-3">
                  <p className="text-sm font-bold text-[#1a1e2e] font-montserrat leading-tight mb-1">
                    {w.title}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-golos">
                    <span className="flex items-center gap-0.5">
                      <Icon name="Clock" size={10} />
                      {w.duration}
                    </span>
                    <span>·</span>
                    <span>{w.calories} ккал</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="px-6 mb-24 opacity-0-init animate-fade-in delay-500">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-bold text-[#1a1e2e] font-montserrat">Достижения</h3>
            <button className="text-xs text-[#4A90E2] font-semibold font-golos">Все →</button>
          </div>
          <div className="flex gap-3">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.label} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all"
                  style={{
                    background: ach.earned ? "white" : "#f0f0f0",
                    boxShadow: ach.earned ? "0 4px 16px rgba(74,144,226,0.15)" : "none",
                    filter: ach.earned ? "none" : "grayscale(1) opacity(0.35)",
                  }}
                >
                  {ach.icon}
                </div>
                <span className="text-[9px] text-center text-gray-400 font-golos leading-tight">
                  {ach.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        </>
        )}
        {/* Bottom Nav */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pt-3 pb-5"
          style={{ borderRadius: "0 0 40px 40px" }}
        >
          <div className="flex justify-around items-center">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(i)}
                className="flex flex-col items-center gap-1 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all"
                  style={{
                    background: activeNav === i ? "rgba(74,144,226,0.12)" : "transparent",
                  }}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    style={{ color: activeNav === i ? "#4A90E2" : "#bbb" }}
                  />
                </div>
                <span
                  className="text-[9px] font-semibold font-montserrat"
                  style={{ color: activeNav === i ? "#4A90E2" : "#bbb" }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}