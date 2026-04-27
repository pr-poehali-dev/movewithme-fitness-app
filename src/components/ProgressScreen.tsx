import Icon from "@/components/ui/icon";

const WEEKS = ["Янв", "Фев", "Мар", "Апр"];

const MONTHLY_DATA = [
  { month: "Янв", workouts: 8, minutes: 180 },
  { month: "Фев", workouts: 11, minutes: 240 },
  { month: "Мар", workouts: 9, minutes: 210 },
  { month: "Апр", workouts: 12, minutes: 284 },
];

const WEEKLY_BARS = [
  { day: "Пн", value: 30, done: true },
  { day: "Вт", value: 45, done: true },
  { day: "Ср", value: 20, done: true },
  { day: "Чт", value: 0, done: false },
  { day: "Пт", value: 0, done: false },
  { day: "Сб", value: 0, done: false },
  { day: "Вс", value: 0, done: false },
];

const RECORDS = [
  { icon: "⚡", label: "Лучшая серия", value: "5 дней", color: "#F5A623" },
  { icon: "🔥", label: "Макс. калорий за день", value: "310 ккал", color: "#FF7E7E" },
  { icon: "⏱️", label: "Самая долгая", value: "35 мин", color: "#4A90E2" },
  { icon: "💪", label: "Тренировок за месяц", value: "12", color: "#50C878" },
];

const GOALS = [
  { label: "Тренировок в неделю", current: 3, target: 5, color: "#4A90E2" },
  { label: "Минут активности", current: 284, target: 400, color: "#F5A623" },
  { label: "Сожжено калорий", current: 2140, target: 3000, color: "#50C878" },
];

const maxWorkouts = Math.max(...MONTHLY_DATA.map((d) => d.workouts));

export default function ProgressScreen() {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      {/* Header */}
      <div className="px-6 pt-2 pb-3">
        <h2 className="text-xl font-bold text-[#1a1e2e] font-montserrat">Прогресс</h2>
        <p className="text-xs text-gray-400 font-golos mt-0.5">Апрель 2026</p>
      </div>

      {/* Summary card */}
      <div className="px-6 mb-5 opacity-0-init animate-fade-in">
        <div
          className="relative rounded-3xl p-5 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a2a4a 0%, #2d5be3 100%)" }}
        >
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-10 bg-white" />
          <p className="text-white/60 text-xs font-golos mb-3 relative z-10">Этот месяц</p>
          <div className="relative z-10 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white font-montserrat">12</p>
              <p className="text-white/50 text-[10px] font-golos mt-0.5">тренировок</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-2xl font-bold text-white font-montserrat">284</p>
              <p className="text-white/50 text-[10px] font-golos mt-0.5">минут</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white font-montserrat">2140</p>
              <p className="text-white/50 text-[10px] font-golos mt-0.5">калорий</p>
            </div>
          </div>
          {/* Trend */}
          <div className="relative z-10 mt-4 flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-2 w-fit">
            <Icon name="TrendingUp" size={13} className="text-[#50C878]" />
            <span className="text-white text-xs font-semibold font-montserrat">
              +33% к прошлому месяцу
            </span>
          </div>
        </div>
      </div>

      {/* This week bar chart */}
      <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-100">
        <div
          className="bg-white rounded-2xl p-4"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat">Эта неделя</h4>
            <span className="text-xs text-[#4A90E2] font-semibold font-golos bg-[#f0f4ff] px-2 py-0.5 rounded-lg">
              95 мин
            </span>
          </div>
          <div className="flex items-end gap-2 h-20">
            {WEEKLY_BARS.map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-xl transition-all"
                    style={{
                      height: bar.done ? `${(bar.value / 45) * 100}%` : "18%",
                      minHeight: "6px",
                      background: bar.done
                        ? "linear-gradient(to top, #4A90E2, #7ab8f0)"
                        : "#f0f0f0",
                    }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-golos">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly comparison */}
      <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-200">
        <div
          className="bg-white rounded-2xl p-4"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat">По месяцам</h4>
            <span className="text-xs text-gray-400 font-golos">тренировок</span>
          </div>
          <div className="flex items-end gap-3 h-24">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span
                  className="text-[10px] font-bold font-montserrat"
                  style={{ color: d.month === "Апр" ? "#4A90E2" : "#bbb" }}
                >
                  {d.workouts}
                </span>
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-xl transition-all"
                    style={{
                      height: `${(d.workouts / maxWorkouts) * 100}%`,
                      minHeight: "8px",
                      background:
                        d.month === "Апр"
                          ? "linear-gradient(to top, #4A90E2, #7ab8f0)"
                          : "#f0f0f0",
                    }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-golos">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="px-6 mb-5 opacity-0-init animate-fade-in delay-300">
        <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat mb-3">Цели месяца</h4>
        <div className="flex flex-col gap-3">
          {GOALS.map((g) => {
            const pct = Math.round((g.current / g.target) * 100);
            return (
              <div
                key={g.label}
                className="bg-white rounded-2xl p-4"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-[#1a1e2e] font-montserrat">
                    {g.label}
                  </span>
                  <span
                    className="text-xs font-bold font-montserrat"
                    style={{ color: g.color }}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${g.color}, ${g.color}99)`,
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400 font-golos">{g.current}</span>
                  <span className="text-[10px] text-gray-400 font-golos">цель: {g.target}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Records */}
      <div className="px-6 opacity-0-init animate-fade-in delay-400">
        <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat mb-3">Личные рекорды</h4>
        <div className="grid grid-cols-2 gap-3">
          {RECORDS.map((r) => (
            <div
              key={r.label}
              className="bg-white rounded-2xl p-3.5 card-hover"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <span className="text-2xl mb-2 block">{r.icon}</span>
              <p
                className="text-base font-bold font-montserrat leading-none mb-1"
                style={{ color: r.color }}
              >
                {r.value}
              </p>
              <p className="text-[10px] text-gray-400 font-golos leading-tight">{r.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
