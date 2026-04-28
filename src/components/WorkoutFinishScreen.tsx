import Icon from "@/components/ui/icon";

interface Props {
  onDone: () => void;
}

const RESULTS = [
  { icon: "Clock", value: "14:32", label: "Время", color: "#4A90E2" },
  { icon: "Flame", value: "118", label: "Калорий", color: "#FF7E7E" },
  { icon: "Zap", value: "8", label: "Упражнений", color: "#F5A623" },
];

export default function WorkoutFinishScreen({ onDone }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#0e1525] overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #4A90E2 0%, transparent 70%)", marginTop: "-40px" }}
      />

      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center relative z-10">
        {/* Trophy */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: "linear-gradient(135deg, #F5A623, #ffce74)",
            boxShadow: "0 16px 48px rgba(245,166,35,0.4)",
          }}
        >
          <span className="text-5xl">🏆</span>
        </div>

        <h2 className="text-2xl font-bold text-white font-montserrat mb-2">
          Тренировка завершена!
        </h2>
        <p className="text-white/50 text-sm font-golos mb-8 leading-relaxed">
          Отличная работа! Ты прошёл «Утренний старт»
          <br />и сделал день продуктивным.
        </p>

        {/* Stats */}
        <div className="flex gap-4 mb-8 w-full">
          {RESULTS.map((r) => (
            <div
              key={r.label}
              className="flex-1 rounded-2xl py-4 px-2 flex flex-col items-center gap-2"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${r.color}25` }}
              >
                <Icon name={r.icon} size={17} style={{ color: r.color }} />
              </div>
              <span className="text-xl font-bold text-white font-montserrat">{r.value}</span>
              <span className="text-white/40 text-[10px] font-golos">{r.label}</span>
            </div>
          ))}
        </div>

        {/* XP gained */}
        <div
          className="w-full rounded-2xl p-4 mb-8 flex items-center gap-4"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(245,166,35,0.2)" }}
          >
            <span className="text-xl">⭐</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold font-montserrat">+50 XP получено</p>
            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: "73%", background: "linear-gradient(90deg, #F5A623, #ffce74)" }}
              />
            </div>
            <p className="text-white/30 text-[10px] font-golos mt-1">730 / 1000 XP до уровня 8</p>
          </div>
        </div>

        {/* New achievement */}
        <div
          className="w-full rounded-2xl p-3.5 mb-6 flex items-center gap-3"
          style={{ background: "rgba(74,144,226,0.12)", border: "1px solid rgba(74,144,226,0.2)" }}
        >
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-[#4A90E2] text-xs font-bold font-montserrat">Новое достижение!</p>
            <p className="text-white/70 text-xs font-golos">4 дня подряд — продолжай в том же духе</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-6 pb-8 flex flex-col gap-3">
        <button
          onClick={onDone}
          className="w-full py-4 rounded-2xl text-base font-bold text-white font-montserrat flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #4A90E2 0%, #2d5be3 100%)",
            boxShadow: "0 8px 24px rgba(74,144,226,0.35)",
          }}
        >
          На главную
        </button>
        <button
          onClick={onDone}
          className="w-full py-3 rounded-2xl text-sm font-semibold text-white/50 font-montserrat"
        >
          Ещё одна тренировка
        </button>
      </div>
    </div>
  );
}
