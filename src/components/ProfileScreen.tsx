import Icon from "@/components/ui/icon";

const AVATAR =
  "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/44572c8d-d134-4168-946f-f1b0252c8108.jpg";

const BIG_STATS = [
  { value: "12", label: "Тренировок", icon: "Dumbbell", color: "#4A90E2" },
  { value: "284", label: "Минут", icon: "Clock", color: "#F5A623" },
  { value: "2140", label: "Калорий", icon: "Flame", color: "#50C878" },
];

const ACHIEVEMENTS = [
  { icon: "🔥", label: "3 дня подряд", earned: true },
  { icon: "⚡", label: "Первая", earned: true },
  { icon: "🏆", label: "Неделя", earned: false },
  { icon: "💪", label: "10 тренировок", earned: false },
  { icon: "🎯", label: "Цель месяца", earned: false },
];

const SETTINGS = [
  { icon: "Bell", label: "Уведомления", value: "Вкл", color: "#4A90E2" },
  { icon: "Target", label: "Цель", value: "5 тренировок/нед", color: "#F5A623" },
  { icon: "User", label: "Личные данные", value: "", color: "#50C878" },
  { icon: "Shield", label: "Конфиденциальность", value: "", color: "#9B8EFF" },
  { icon: "HelpCircle", label: "Помощь", value: "", color: "#FF7E7E" },
];

const LEVEL_PERCENT = 68;

export default function ProfileScreen() {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-2 pb-1">
        <h2 className="text-xl font-bold text-[#1a1e2e] font-montserrat">Профиль</h2>
        <button className="w-9 h-9 rounded-2xl bg-[#f0f4ff] flex items-center justify-center">
          <Icon name="Settings" size={16} style={{ color: "#4A90E2" }} />
        </button>
      </div>

      {/* Profile hero */}
      <div className="px-6 pt-3 pb-5 opacity-0-init animate-fade-in">
        <div
          className="relative rounded-3xl overflow-hidden p-5"
          style={{
            background: "linear-gradient(145deg, #1a2a4a 0%, #2d5be3 100%)",
          }}
        >
          {/* Deco circles */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 bg-white" />
          <div className="absolute right-4 bottom-0 w-20 h-20 rounded-full opacity-10 bg-[#F5A623]" />

          <div className="relative z-10 flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-20 h-20 rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
              >
                <img src={AVATAR} alt="Алексей" className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-[#F5A623] flex items-center justify-center"
                style={{ boxShadow: "0 2px 8px rgba(245,166,35,0.5)" }}
              >
                <span className="text-[10px]">✏️</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white font-montserrat leading-tight">
                Алексей Смирнов
              </h3>
              <p className="text-white/60 text-xs font-golos mb-2">Средний уровень · с марта 2024</p>
              <div
                className="inline-flex items-center gap-1.5 bg-white/15 rounded-xl px-2.5 py-1"
              >
                <span className="text-sm">⭐</span>
                <span className="text-white text-xs font-semibold font-montserrat">
                  Уровень 7
                </span>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div className="relative z-10 mt-4">
            <div className="flex justify-between mb-1.5">
              <span className="text-white/60 text-[10px] font-golos">Опыт</span>
              <span className="text-white/80 text-[10px] font-semibold font-montserrat">
                680 / 1000 XP
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${LEVEL_PERCENT}%`,
                  background: "linear-gradient(90deg, #F5A623, #ffce74)",
                  transition: "width 1.2s ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Big stats */}
      <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-100">
        <div className="grid grid-cols-3 gap-3">
          {BIG_STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-3.5 text-center card-hover"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: `${s.color}18` }}
              >
                <Icon name={s.icon} size={17} style={{ color: s.color }} />
              </div>
              <p className="text-lg font-bold text-[#1a1e2e] font-montserrat leading-none">
                {s.value}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-golos">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements strip */}
      <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-200">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat">Достижения</h4>
          <button className="text-xs text-[#4A90E2] font-semibold font-golos">Все →</button>
        </div>
        <div className="flex gap-2.5">
          {ACHIEVEMENTS.map((ach) => (
            <div key={ach.label} className="flex-1 flex flex-col items-center gap-1">
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

      {/* This month progress */}
      <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-300">
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat">Апрель 2026</h4>
            <span className="text-xs text-[#4A90E2] font-semibold font-golos bg-[#f0f4ff] px-2 py-0.5 rounded-lg">
              12 из 20 целей
            </span>
          </div>
          <div className="h-2.5 bg-[#f0f0f0] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "60%",
                background: "linear-gradient(90deg, #4A90E2, #7ab8f0)",
                transition: "width 1s ease-out",
              }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-2 font-golos">60% выполнено · осталось 8 тренировок</p>
        </div>
      </div>

      {/* Settings */}
      <div className="px-6 opacity-0-init animate-fade-in delay-400">
        <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat mb-3">Настройки</h4>
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
        >
          {SETTINGS.map((s, i) => (
            <button
              key={s.label}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-gray-50 active:bg-gray-100"
              style={{
                borderBottom: i < SETTINGS.length - 1 ? "1px solid #f5f5f5" : "none",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}18` }}
              >
                <Icon name={s.icon} size={15} style={{ color: s.color }} />
              </div>
              <span className="flex-1 text-sm text-[#1a1e2e] font-golos">{s.label}</span>
              {s.value && (
                <span className="text-xs text-gray-400 font-golos mr-1">{s.value}</span>
              )}
              <Icon name="ChevronRight" size={14} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-6 mt-4 opacity-0-init animate-fade-in delay-500">
        <button
          className="w-full py-3 rounded-2xl text-sm font-semibold font-montserrat text-red-400 bg-red-50 transition-all hover:bg-red-100 active:scale-98"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
