import { useState, useEffect, useRef } from "react";
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
    tip: "Держите спину прямо, приземляйтесь мягко на носки",
    muscles: "Ноги · Плечи",
    color: "#4A90E2",
    sets: 2,
  },
  {
    id: 2,
    title: "Вращение руками",
    duration: 30,
    rest: 10,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/a3fc9cd9-5bb8-415e-a823-449a5183c0f5.jpg",
    tip: "Руки прямые, круговые движения вперёд и назад",
    muscles: "Плечи · Разминка",
    color: "#F5A623",
    sets: 1,
  },
  {
    id: 3,
    title: "Высокие колени",
    duration: 40,
    rest: 20,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/c8d7aa09-3d94-48a2-8c33-002cdf9a2f89.jpg",
    tip: "Поднимайте колени до уровня пояса, руки активно работают",
    muscles: "Ноги · Пресс",
    color: "#50C878",
    sets: 2,
  },
  {
    id: 4,
    title: "Приседания",
    duration: 45,
    rest: 15,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/e8866576-1801-4d4d-a2a4-2c732a70d7a6.jpg",
    tip: "Колени над стопами, спина прямая, садитесь до параллели",
    muscles: "Ноги · Ягодицы",
    color: "#9B8EFF",
    sets: 2,
  },
  {
    id: 5,
    title: "Вращение руками",
    duration: 30,
    rest: 0,
    image: "https://cdn.poehali.dev/projects/d5cc102d-4ae7-4efd-aa96-14c3b55399cc/files/a3fc9cd9-5bb8-415e-a823-449a5183c0f5.jpg",
    tip: "Заминка — медленно и плавно, дышите глубоко",
    muscles: "Плечи · Заминка",
    color: "#F5A623",
    sets: 1,
  },
];

// Разворачиваем подходы в отдельные шаги
const STEPS = EXERCISES.flatMap((ex) =>
  Array.from({ length: ex.sets }, (_, i) => ({
    ...ex,
    stepId: `${ex.id}-${i}`,
    setNum: i + 1,
    totalSets: ex.sets,
    isLastSet: i === ex.sets - 1,
  }))
);

type Phase = "ready" | "exercise" | "rest";

export default function ActiveWorkoutScreen({ onBack, onFinish }: Props) {
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [showQuit, setShowQuit] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = STEPS[stepIdx];
  const isLastStep = stepIdx === STEPS.length - 1;
  const completedSteps = stepIdx;
  const overallPct = (completedSteps / STEPS.length) * 100;

  // Таймер
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  // Когда таймер дошёл до 0
  useEffect(() => {
    if (running || timeLeft !== 0) return;
    if (phase === "exercise") {
      if (step.rest > 0) {
        setPhase("rest");
        setTimeLeft(step.rest);
        // Отдых запускается автоматически
        setRunning(true);
      } else {
        // Нет отдыха — переходим к следующему сразу
        advanceStep();
      }
    }
    // rest заканчивается — просто ждём нажатия «Готов» (running=false, timeLeft=0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, running]);

  const startExercise = () => {
    setPhase("exercise");
    setTimeLeft(step.duration);
    setRunning(true);
  };

  const advanceStep = () => {
    if (isLastStep) {
      onFinish();
    } else {
      setStepIdx((i) => i + 1);
      setPhase("ready");
      setTimeLeft(0);
      setRunning(false);
    }
  };

  const skipCurrent = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    if (phase === "exercise" && step.rest > 0) {
      setPhase("rest");
      setTimeLeft(step.rest);
      setRunning(true);
    } else {
      advanceStep();
    }
  };

  const phaseDuration = phase === "exercise" ? step.duration : step.rest;
  const progressPct = phaseDuration > 0 ? ((phaseDuration - timeLeft) / phaseDuration) * 100 : 0;

  const nextStep = stepIdx + 1 < STEPS.length ? STEPS[stepIdx + 1] : null;

  const phaseColor =
    phase === "rest" ? "#50C878" : step.color;

  const circumference = 2 * Math.PI * 52;

  return (
    <div className="flex flex-col h-full bg-[#0e1525] overflow-hidden">

      {/* Quit modal */}
      {showQuit && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-8">
          <div className="bg-[#1a2235] rounded-3xl p-6 w-full border border-white/10">
            <h3 className="text-base font-bold text-white font-montserrat text-center mb-1">
              Завершить тренировку?
            </h3>
            <p className="text-xs text-white/40 font-golos text-center mb-5">
              Прогресс этой сессии не сохранится
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowQuit(false)}
                className="flex-1 py-3 rounded-2xl text-sm font-bold font-montserrat"
                style={{ background: "rgba(74,144,226,0.15)", color: "#4A90E2" }}
              >
                Продолжить
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-2xl bg-red-500/90 text-white text-sm font-bold font-montserrat"
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
          onClick={() => { setRunning(false); setShowQuit(true); }}
          className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center"
        >
          <Icon name="X" size={16} className="text-white" />
        </button>
        <div className="text-center">
          <p className="text-white/40 text-[10px] font-golos">{stepIdx + 1} из {STEPS.length}</p>
          <p className="text-white text-sm font-bold font-montserrat">Утренний старт</p>
        </div>
        <button
          onClick={() => setRunning((v) => !v)}
          className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center"
          disabled={phase === "ready"}
        >
          <Icon name={running ? "Pause" : "Play"} size={16} className={phase === "ready" ? "text-white/20" : "text-white"} />
        </button>
      </div>

      {/* Overall progress bar */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%`, background: "linear-gradient(90deg, #4A90E2, #7ab8f0)" }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          {STEPS.map((s, i) => (
            <div
              key={s.stepId}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                flex: 1,
                marginRight: i < STEPS.length - 1 ? "3px" : 0,
                background:
                  i < stepIdx
                    ? "#4A90E2"
                    : i === stepIdx
                    ? phaseColor
                    : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Exercise image */}
      <div className="px-5 mb-4 flex-shrink-0">
        <div className="relative rounded-3xl overflow-hidden" style={{ height: "175px" }}>
          <img
            key={step.stepId}
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
            style={{ filter: phase === "rest" ? "grayscale(0.4) brightness(0.7)" : "none", transition: "filter 0.3s" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(14,21,37,0.92) 100%)" }}
          />

          {/* Phase badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-bold font-montserrat"
            style={{ background: phaseColor, color: "white" }}
          >
            {phase === "ready" ? "Готовься" : phase === "exercise" ? "Выполняй" : "Отдых"}
          </div>

          {/* Sets badge */}
          {step.totalSets > 1 && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-xl text-xs font-bold font-montserrat bg-white/15 text-white">
              Подход {step.setNum}/{step.totalSets}
            </div>
          )}

          {/* Title */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-lg font-bold text-white font-montserrat leading-tight">
              {phase === "rest" ? "Отдыхай" : step.title}
            </h3>
            <p className="text-white/50 text-[11px] font-golos mt-0.5">
              {phase === "rest" ? "Следующий подход начнётся по твоей команде" : step.muscles}
            </p>
          </div>
        </div>
      </div>

      {/* Timer + CTA zone */}
      <div className="flex items-center px-5 gap-5 mb-4 flex-shrink-0">

        {/* Timer ring */}
        <div className="relative flex-shrink-0" style={{ width: 100, height: 100 }}>
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
            {phase !== "ready" && (
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke={phaseColor}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progressPct / 100)}
                style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }}
              />
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {phase === "ready" ? (
              <Icon name="Dumbbell" size={26} className="text-white/30" />
            ) : (
              <>
                <span
                  className="text-3xl font-bold font-montserrat leading-none"
                  style={{ color: timeLeft <= 5 ? "#FF7E7E" : "white" }}
                >
                  {timeLeft}
                </span>
                <span className="text-white/30 text-[9px] font-golos mt-0.5">сек</span>
              </>
            )}
          </div>
        </div>

        {/* Info + CTA */}
        <div className="flex-1 flex flex-col gap-2.5">
          {phase === "ready" && (
            <>
              <p className="text-white/50 text-xs font-golos leading-relaxed">{step.tip}</p>
              <div className="flex gap-2 items-center text-white/30 text-xs font-golos">
                <Icon name="Clock" size={12} className="text-white/25" />
                {step.duration} секунд
              </div>
              <button
                onClick={startExercise}
                className="w-full py-3 rounded-2xl text-sm font-bold text-white font-montserrat flex items-center justify-center gap-2 active:scale-95 transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}bb)`,
                  boxShadow: `0 6px 20px ${step.color}50`,
                }}
              >
                <Icon name="Play" size={15} className="text-white" />
                Старт
              </button>
            </>
          )}

          {phase === "exercise" && (
            <>
              <p className="text-white/50 text-xs font-golos leading-relaxed">{step.tip}</p>
              <button
                onClick={skipCurrent}
                className="w-full py-3 rounded-2xl text-sm font-semibold font-montserrat flex items-center justify-center gap-2"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
              >
                <Icon name="ChevronRight" size={15} className="text-white/40" />
                Пропустить
              </button>
            </>
          )}

          {phase === "rest" && (
            <>
              <p className="text-white/40 text-xs font-golos">
                {timeLeft > 0 ? "Отдыхай, следующий подход скоро" : "Можешь начинать!"}
              </p>
              <button
                onClick={advanceStep}
                className="w-full py-3 rounded-2xl text-sm font-bold text-white font-montserrat flex items-center justify-center gap-2 active:scale-95 transition-transform"
                style={{
                  background: timeLeft > 0
                    ? "rgba(255,255,255,0.08)"
                    : "linear-gradient(135deg, #50C878, #3aaf60)",
                  boxShadow: timeLeft > 0 ? "none" : "0 6px 20px rgba(80,200,120,0.4)",
                  color: timeLeft > 0 ? "rgba(255,255,255,0.4)" : "white",
                }}
              >
                <Icon name="CheckCheck" size={15} className={timeLeft > 0 ? "text-white/30" : "text-white"} />
                {isLastStep ? "Завершить" : "Готов, дальше"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tip card – only in exercise phase */}
      {phase === "exercise" && (
        <div className="px-5 mb-4 flex-shrink-0">
          <div
            className="rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
          >
            <Icon name="Lightbulb" size={15} style={{ color: step.color, flexShrink: 0 }} />
            <p className="text-xs font-golos" style={{ color: `${step.color}dd` }}>{step.tip}</p>
          </div>
        </div>
      )}

      {/* Next up */}
      <div className="px-5 flex-shrink-0">
        <div
          className="rounded-2xl p-3 flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
            {nextStep ? (
              <img src={nextStep.image} alt={nextStep.title} className="w-full h-full object-cover opacity-60" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg">🏁</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/30 text-[10px] font-golos">Следующее</p>
            <p className="text-white/80 text-xs font-semibold font-montserrat truncate">
              {nextStep ? nextStep.title : "Финиш!"}
            </p>
            {nextStep && nextStep.totalSets > 1 && (
              <p className="text-white/25 text-[10px] font-golos">
                Подход {nextStep.setNum}/{nextStep.totalSets}
              </p>
            )}
          </div>
          {nextStep && (
            <div
              className="px-2 py-1 rounded-lg text-[10px] font-golos"
              style={{ background: `${nextStep.color}20`, color: `${nextStep.color}cc` }}
            >
              {nextStep.duration} сек
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
