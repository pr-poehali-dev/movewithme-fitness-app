import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onBack: () => void;
  onFinish: () => void;
}

const EXERCISES = [
  {
    id: 1,
    title: "Прыжки Джека",
    duration: 45,
    rest: 15,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/9489d53b-e990-47e1-ba33-a198dac0d584.jpg",
    tip: "Держите спину прямо, приземляйтесь мягко",
    color: "#4A90E2",
  },
  {
    id: 2,
    title: "Вращение руками",
    duration: 30,
    rest: 10,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/a3fc9cd9-5bb8-415e-a823-449a5183c0f5.jpg",
    tip: "Руки прямые, движение плавное",
    color: "#F5A623",
  },
  {
    id: 3,
    title: "Высокие колени",
    duration: 40,
    rest: 20,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/c8d7aa09-3d94-48a2-8c33-002cdf9a2f89.jpg",
    tip: "Поднимайте колени до уровня пояса",
    color: "#50C878",
  },
  {
    id: 4,
    title: "Приседания",
    duration: 45,
    rest: 15,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/e8866576-1801-4d4d-a2a4-2c732a70d7a6.jpg",
    tip: "Колени над стопами, спина прямая",
    color: "#9B8EFF",
  },
  {
    id: 5,
    title: "Прыжки Джека",
    duration: 45,
    rest: 15,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/9489d53b-e990-47e1-ba33-a198dac0d584.jpg",
    tip: "Держите темп до конца подхода",
    color: "#4A90E2",
  },
  {
    id: 6,
    title: "Высокие колени",
    duration: 40,
    rest: 20,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/c8d7aa09-3d94-48a2-8c33-002cdf9a2f89.jpg",
    tip: "Финальный раунд — выложитесь на 100%",
    color: "#50C878",
  },
  {
    id: 7,
    title: "Приседания",
    duration: 45,
    rest: 15,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/e8866576-1801-4d4d-a2a4-2c732a70d7a6.jpg",
    tip: "Последний подход — держите технику",
    color: "#9B8EFF",
  },
  {
    id: 8,
    title: "Вращение руками",
    duration: 30,
    rest: 0,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/a3fc9cd9-5bb8-415e-a823-449a5183c0f5.jpg",
    tip: "Заминка — медленно и плавно, дышите глубоко",
    color: "#F5A623",
  },
];

type Phase = "exercise" | "rest" | "countdown";

export default function ActiveWorkoutScreen({ onBack, onFinish }: Props) {
  const [exIdx, setExIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("countdown");
  const [timeLeft, setTimeLeft] = useState(3);
  const [paused, setPaused] = useState(false);
  const [showQuit, setShowQuit] = useState(false);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ex = EXERCISES[exIdx];
  const isLast = exIdx === EXERCISES.length - 1;

  const phaseDuration =
    phase === "countdown" ? 3 : phase === "exercise" ? ex.duration : ex.rest;

  const progressPct = ((phaseDuration - timeLeft) / phaseDuration) * 100;

  const goNextPhase = useCallback(() => {
    if (phase === "countdown") {
      setPhase("exercise");
      setTimeLeft(ex.duration);
    } else if (phase === "exercise") {
      if (ex.rest > 0) {
        setPhase("rest");
        setTimeLeft(ex.rest);
      } else {
        if (isLast) {
          onFinish();
        } else {
          setExIdx((i) => i + 1);
          setPhase("countdown");
          setTimeLeft(3);
        }
      }
    } else {
      if (isLast) {
        onFinish();
      } else {
        setExIdx((i) => i + 1);
        setPhase("countdown");
        setTimeLeft(3);
      }
    }
  }, [phase, ex, isLast, onFinish]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          return 0;
        }
        return t - 1;
      });
      if (phase !== "rest") {
        setTotalElapsed((e) => e + 1);
      }
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, phase, exIdx]);

  useEffect(() => {
    if (timeLeft === 0) {
      goNextPhase();
    }
  }, [timeLeft, goNextPhase]);

  const skipExercise = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goNextPhase();
  };

  const nextExImage =
    exIdx + 1 < EXERCISES.length ? EXERCISES[exIdx + 1].image : null;
  const nextExTitle =
    exIdx + 1 < EXERCISES.length ? EXERCISES[exIdx + 1].title : "Финиш!";

  const phaseLabel =
    phase === "countdown" ? "Приготовься!" : phase === "exercise" ? "Выполняй" : "Отдых";
  const phaseColor =
    phase === "countdown" ? "#F5A623" : phase === "exercise" ? ex.color : "#50C878";

  const totalWorkoutTime = EXERCISES.reduce((s, e) => s + e.duration + e.rest, 0) + EXERCISES.length * 3;
  const overallPct = Math.min((totalElapsed / totalWorkoutTime) * 100, 100);

  return (
    <div className="flex flex-col h-full bg-[#0e1525] relative overflow-hidden">
      {/* Quit modal */}
      {showQuit && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-8">
          <div className="bg-white rounded-3xl p-6 w-full">
            <h3 className="text-base font-bold text-[#1a1e2e] font-montserrat text-center mb-1">
              Завершить тренировку?
            </h3>
            <p className="text-xs text-gray-400 font-golos text-center mb-5">
              Прогресс этой сессии не сохранится
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowQuit(false)}
                className="flex-1 py-3 rounded-2xl bg-[#f0f4ff] text-[#4A90E2] text-sm font-bold font-montserrat"
              >
                Продолжить
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-sm font-bold font-montserrat"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
        <button
          onClick={() => { setPaused(true); setShowQuit(true); }}
          className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center"
        >
          <Icon name="X" size={16} className="text-white" />
        </button>
        <div className="text-center">
          <p className="text-white/40 text-[10px] font-golos">
            {exIdx + 1} из {EXERCISES.length}
          </p>
          <p className="text-white text-sm font-bold font-montserrat">Утренний старт</p>
        </div>
        <button
          onClick={() => setPaused((v) => !v)}
          className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center"
        >
          <Icon name={paused ? "Play" : "Pause"} size={16} className="text-white" />
        </button>
      </div>

      {/* Overall progress bar */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${overallPct}%`, background: "linear-gradient(90deg, #4A90E2, #7ab8f0)" }}
          />
        </div>
      </div>

      {/* Exercise image */}
      <div className="px-5 mb-5 flex-shrink-0">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ height: "200px" }}
        >
          <img
            key={ex.id}
            src={ex.image}
            alt={ex.title}
            className="w-full h-full object-cover"
            style={{ animation: "fadeIn 0.4s ease" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(14,21,37,0.9) 100%)" }}
          />

          {/* Phase badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-bold font-montserrat"
            style={{ background: phaseColor, color: "white" }}
          >
            {phaseLabel}
          </div>

          {/* Exercise title on image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white font-montserrat leading-tight">
              {phase === "rest" ? "Отдых" : ex.title}
            </h3>
            <p className="text-white/50 text-xs font-golos mt-0.5">{ex.tip}</p>
          </div>
        </div>
      </div>

      {/* Timer ring */}
      <div className="flex flex-col items-center mb-6 flex-shrink-0">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke={phaseColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - progressPct / 100)}`}
              style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-4xl font-bold font-montserrat"
              style={{ color: timeLeft <= 5 && phase !== "countdown" ? "#FF7E7E" : "white" }}
            >
              {timeLeft}
            </span>
            <span className="text-white/40 text-[10px] font-golos mt-0.5">секунд</span>
          </div>
        </div>

        {paused && (
          <div className="mt-3 bg-white/10 px-4 py-1.5 rounded-xl">
            <span className="text-white/60 text-xs font-golos">Пауза</span>
          </div>
        )}
      </div>

      {/* Next exercise preview */}
      <div className="px-5 mb-5 flex-shrink-0">
        <div className="bg-white/8 rounded-2xl p-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
            {nextExImage ? (
              <img src={nextExImage} alt={nextExTitle} className="w-full h-full object-cover opacity-70" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-lg">🏁</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-golos">Следующее</p>
            <p className="text-white text-xs font-semibold font-montserrat">{nextExTitle}</p>
          </div>
          <button
            onClick={skipExercise}
            className="ml-auto flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl text-white/60 text-xs font-golos"
          >
            Пропустить
            <Icon name="ChevronRight" size={12} className="text-white/40" />
          </button>
        </div>
      </div>

      {/* Exercise dots */}
      <div className="px-5 flex-shrink-0">
        <div className="flex justify-center gap-1.5">
          {EXERCISES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === exIdx ? "20px" : "6px",
                height: "6px",
                background: i < exIdx ? "#4A90E2" : i === exIdx ? phaseColor : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
