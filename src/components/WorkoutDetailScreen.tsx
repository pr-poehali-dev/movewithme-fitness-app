import { useState } from "react";
import Icon from "@/components/ui/icon";
import ActiveWorkoutScreen from "@/components/ActiveWorkoutScreen";
import WorkoutFinishScreen from "@/components/WorkoutFinishScreen";

interface Props {
  onBack: () => void;
}

const EXERCISES = [
  {
    id: 1,
    title: "Прыжки Джека",
    duration: "45 сек",
    rest: "15 сек",
    reps: null,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/9489d53b-e990-47e1-ba33-a198dac0d584.jpg",
    description: "Прыгайте, широко разводя руки и ноги. Держите спину прямо.",
    muscles: ["Ноги", "Плечи"],
    color: "#4A90E2",
  },
  {
    id: 2,
    title: "Вращение руками",
    duration: "30 сек",
    rest: "10 сек",
    reps: null,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/a3fc9cd9-5bb8-415e-a823-449a5183c0f5.jpg",
    description: "Круговые движения прямыми руками вперёд и назад.",
    muscles: ["Плечи"],
    color: "#F5A623",
  },
  {
    id: 3,
    title: "Высокие колени",
    duration: "40 сек",
    rest: "20 сек",
    reps: null,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/c8d7aa09-3d94-48a2-8c33-002cdf9a2f89.jpg",
    description: "Бег на месте, поднимая колени до уровня пояса.",
    muscles: ["Ноги", "Пресс"],
    color: "#50C878",
  },
  {
    id: 4,
    title: "Приседания",
    duration: "45 сек",
    rest: "15 сек",
    reps: null,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/e8866576-1801-4d4d-a2a4-2c732a70d7a6.jpg",
    description: "Ноги на ширине плеч, опускайтесь до параллели с полом.",
    muscles: ["Ноги", "Ягодицы"],
    color: "#9B8EFF",
  },
  {
    id: 5,
    title: "Прыжки Джека",
    duration: "45 сек",
    rest: "15 сек",
    reps: null,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/9489d53b-e990-47e1-ba33-a198dac0d584.jpg",
    description: "Повтор — держите темп до конца.",
    muscles: ["Ноги", "Плечи"],
    color: "#4A90E2",
  },
  {
    id: 6,
    title: "Высокие колени",
    duration: "40 сек",
    rest: "20 сек",
    reps: null,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/c8d7aa09-3d94-48a2-8c33-002cdf9a2f89.jpg",
    description: "Финальный раунд. Выкладывайтесь на 100%.",
    muscles: ["Ноги", "Пресс"],
    color: "#50C878",
  },
  {
    id: 7,
    title: "Приседания",
    duration: "45 сек",
    rest: "15 сек",
    reps: null,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/e8866576-1801-4d4d-a2a4-2c732a70d7a6.jpg",
    description: "Последний подход. Держите технику.",
    muscles: ["Ноги", "Ягодицы"],
    color: "#9B8EFF",
  },
  {
    id: 8,
    title: "Вращение руками",
    duration: "30 сек",
    rest: "—",
    reps: null,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/a3fc9cd9-5bb8-415e-a823-449a5183c0f5.jpg",
    description: "Заминка. Медленно и плавно, дышите глубоко.",
    muscles: ["Плечи"],
    color: "#F5A623",
  },
];

const HERO_IMG =
  "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/72d96943-3590-43b8-933a-5c12da07f872.jpg";

export default function WorkoutDetailScreen({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "exercises">("overview");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [screen, setScreen] = useState<"detail" | "active" | "finish">("detail");

  if (screen === "active") {
    return (
      <ActiveWorkoutScreen
        onBack={() => setScreen("detail")}
        onFinish={() => setScreen("finish")}
      />
    );
  }

  if (screen === "finish") {
    return <WorkoutFinishScreen onDone={onBack} />;
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Hero */}
      <div className="relative flex-shrink-0" style={{ height: "220px" }}>
        <img
          src={HERO_IMG}
          alt="Утренний старт"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,30,46,0.55) 0%, transparent 40%, rgba(26,30,46,0.85) 100%)",
          }}
        />

        {/* Back + like */}
        <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-5">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Icon name="ChevronLeft" size={18} className="text-white" />
          </button>
          <button
            onClick={() => setLiked((v) => !v)}
            className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Icon
              name="Heart"
              size={16}
              style={{ color: liked ? "#FF7E7E" : "white", fill: liked ? "#FF7E7E" : "none" }}
            />
          </button>
        </div>

        {/* Title on hero */}
        <div className="absolute bottom-4 left-5 right-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#4A90E2] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg font-montserrat">
              Кардио
            </span>
            <span className="bg-[#50C878]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg font-montserrat">
              Новичок
            </span>
          </div>
          <h2 className="text-xl font-bold text-white font-montserrat">Утренний старт</h2>
        </div>
      </div>

      {/* Meta pills */}
      <div className="bg-white px-5 py-3.5 flex gap-4 border-b border-gray-100 flex-shrink-0">
        {[
          { icon: "Clock", value: "15 мин", label: "Длительность" },
          { icon: "Flame", value: "120 ккал", label: "Сожжёт" },
          { icon: "Layers", value: "8 упр.", label: "Упражнений" },
        ].map((m) => (
          <div key={m.label} className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-1 mb-0.5">
              <Icon name={m.icon} size={13} style={{ color: "#4A90E2" }} />
              <span className="text-sm font-bold text-[#1a1e2e] font-montserrat">{m.value}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-golos">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100 px-5 gap-6 flex-shrink-0">
        {(["overview", "exercises"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="py-3 text-sm font-semibold font-montserrat relative transition-colors"
            style={{ color: activeTab === tab ? "#4A90E2" : "#bbb" }}
          >
            {tab === "overview" ? "Обзор" : "Упражнения"}
            {activeTab === tab && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: "#4A90E2" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#f8f9ff]">
        {activeTab === "overview" ? (
          <div className="p-5 flex flex-col gap-4">
            {/* Description */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat mb-2">О тренировке</h4>
              <p className="text-xs text-gray-500 font-golos leading-relaxed">
                Идеальное начало дня — разгони обмен веществ, активируй тело и зарядись энергией за 15 минут. Никакого оборудования, только ты и желание двигаться.
              </p>
            </div>

            {/* What you need */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat mb-3">Что понадобится</h4>
              <div className="flex gap-3">
                {[
                  { emoji: "🧘", label: "Коврик" },
                  { emoji: "👟", label: "Кроссовки" },
                  { emoji: "💧", label: "Вода" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex-1 flex flex-col items-center gap-1.5 bg-[#f8f9ff] rounded-xl py-3"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[10px] text-gray-500 font-golos">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Muscle groups */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat mb-3">Группы мышц</h4>
              <div className="flex flex-wrap gap-2">
                {["Ноги", "Ягодицы", "Плечи", "Пресс", "Сердце"].map((m) => (
                  <span
                    key={m}
                    className="text-xs font-semibold font-montserrat px-3 py-1.5 rounded-xl"
                    style={{ background: "#4A90E218", color: "#4A90E2" }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Structure */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <h4 className="text-sm font-bold text-[#1a1e2e] font-montserrat mb-3">Структура</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Разминка", duration: "2 мин", color: "#F5A623" },
                  { label: "Основная часть", duration: "11 мин", color: "#4A90E2" },
                  { label: "Заминка", duration: "2 мин", color: "#50C878" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="flex-1 text-xs text-gray-600 font-golos">{s.label}</span>
                    <span className="text-xs font-semibold text-[#1a1e2e] font-montserrat">{s.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 flex flex-col gap-3">
            {EXERCISES.map((ex, i) => (
              <button
                key={ex.id}
                onClick={() => setExpanded(expanded === ex.id ? null : ex.id)}
                className="w-full text-left"
              >
                <div
                  className="bg-white rounded-2xl overflow-hidden transition-all"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                >
                  <div className="flex items-center gap-3 p-3">
                    {/* Number */}
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold font-montserrat"
                      style={{ background: `${ex.color}18`, color: ex.color }}
                    >
                      {i + 1}
                    </div>

                    {/* Image */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <img src={ex.image} alt={ex.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1a1e2e] font-montserrat leading-tight">
                        {ex.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-0.5 text-[10px] text-gray-400 font-golos">
                          <Icon name="Clock" size={9} className="text-gray-300" />
                          {ex.duration}
                        </span>
                        {ex.rest !== "—" && (
                          <span className="flex items-center gap-0.5 text-[10px] text-gray-400 font-golos">
                            <Icon name="Pause" size={9} className="text-gray-300" />
                            отдых {ex.rest}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Chevron */}
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className="text-gray-300 flex-shrink-0 transition-transform"
                      style={{ transform: expanded === ex.id ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>

                  {/* Expanded detail */}
                  {expanded === ex.id && (
                    <div
                      className="px-4 pb-4 pt-1 border-t border-gray-50"
                    >
                      <p className="text-xs text-gray-500 font-golos leading-relaxed mb-3">
                        {ex.description}
                      </p>
                      <div className="flex gap-1.5">
                        {ex.muscles.map((m) => (
                          <span
                            key={m}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-lg font-montserrat"
                            style={{ background: `${ex.color}18`, color: ex.color }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 bg-white px-5 pt-3 pb-6 border-t border-gray-100">
        <button
          onClick={() => setScreen("active")}
          className="w-full py-4 rounded-2xl text-base font-bold text-white font-montserrat flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #4A90E2 0%, #2d5be3 100%)",
            boxShadow: "0 8px 24px rgba(74,144,226,0.35)",
          }}
        >
          <Icon name="Play" size={18} className="text-white" />
          Начать тренировку
        </button>
      </div>
    </div>
  );
}