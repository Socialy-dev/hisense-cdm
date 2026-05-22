"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { EXTERNAL_LINKS } from "./campaign-links";

type Scores = { P: number; C: number; T: number };
type Option = {
  id: string;
  emoji: string;
  label: string;
  sub: string;
  scores: Scores;
};
type Question = {
  id: number;
  question: string;
  options: Option[];
};
type Profile = {
  emoji: string;
  label: string;
  tagline: string;
  desc: string;
  product: string;
  productDesc: string;
  productEmoji: string;
  productUrl: string;
  productImage: string;
  productImageAlt: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Le match idéal, c'est où ?",
    options: [
      {
        id: "a",
        emoji: "🏟️",
        label: "Dans le stade",
        sub: "je veux sentir l'énergie, le bruit, les frissons",
        scores: { P: 3, C: 1, T: 0 },
      },
      {
        id: "b",
        emoji: "🛋️",
        label: "Dans mon salon",
        sub: "seul ou presque, plongé dans chaque détail du jeu",
        scores: { P: 1, C: 0, T: 3 },
      },
      {
        id: "c",
        emoji: "🥂",
        label: "Chez moi, avec du monde",
        sub: "j'invite, je reçois, je fais du match un vrai événement",
        scores: { P: 0, C: 3, T: 0 },
      },
      {
        id: "d",
        emoji: "🍺",
        label: "Dans un bar",
        sub: "l'ambiance collective, les inconnus qui deviennent amis",
        scores: { P: 1, C: 2, T: 0 },
      },
    ],
  },
  {
    id: 2,
    question: "Votre équipe marque. Votre réaction ?",
    options: [
      {
        id: "a",
        emoji: "🙌",
        label: "Je me lève et je crie",
        sub: "viscéral, total — comme si j'étais dans les tribunes",
        scores: { P: 3, C: 1, T: 0 },
      },
      {
        id: "b",
        emoji: "🔁",
        label: "Je lance le replay",
        sub: "pour analyser le geste, la trajectoire, le timing parfait",
        scores: { P: 0, C: 0, T: 3 },
      },
      {
        id: "c",
        emoji: "🥳",
        label: "On trinque tous ensemble",
        sub: "le meilleur but c'est celui qu'on célèbre à plusieurs",
        scores: { P: 0, C: 3, T: 0 },
      },
      {
        id: "d",
        emoji: "📱",
        label: "J'envoie un voice note",
        sub: "mes amis absents méritent de vivre ça aussi",
        scores: { P: 1, C: 2, T: 0 },
      },
    ],
  },
  {
    id: 3,
    question: "Pendant un match, vous êtes plutôt…",
    options: [
      {
        id: "a",
        emoji: "🗣️",
        label: "Celui qui commente tout",
        sub: "chaque action, chaque faute, chaque décision de l'arbitre",
        scores: { P: 3, C: 1, T: 0 },
      },
      {
        id: "b",
        emoji: "👁️",
        label: "Celui qui regarde en silence",
        sub: "concentré, il voit ce que les autres ne remarquent pas",
        scores: { P: 0, C: 0, T: 3 },
      },
      {
        id: "c",
        emoji: "🍾",
        label: "Celui qui s'occupe de tout le monde",
        sub: "les verres pleins, l'ambiance au top, personne n'est oublié",
        scores: { P: 0, C: 3, T: 0 },
      },
      {
        id: "d",
        emoji: "📲",
        label: "Celui qui gère le groupe",
        sub: "live, stats, les absents sont tenus informés en temps réel",
        scores: { P: 1, C: 1, T: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "Votre rituel avant un grand match ?",
    options: [
      {
        id: "a",
        emoji: "🔊",
        label: "Je règle le son et l'image",
        sub: "tout doit être parfait pour être au cœur de l'action",
        scores: { P: 3, C: 0, T: 1 },
      },
      {
        id: "b",
        emoji: "📊",
        label: "Je lis les stats et compos",
        sub: "pour ne rien laisser au hasard pendant le match",
        scores: { P: 0, C: 0, T: 3 },
      },
      {
        id: "c",
        emoji: "🛒",
        label: "Je prépare le frigo et la table",
        sub: "les invités arrivent, tout doit être prêt pour les recevoir",
        scores: { P: 0, C: 3, T: 0 },
      },
      {
        id: "d",
        emoji: "📞",
        label: "J'appelle les potes",
        sub: "pour qu'on soit tous là, ensemble, peu importe où",
        scores: { P: 1, C: 2, T: 1 },
      },
    ],
  },
];

const PROFILES: Record<"P" | "C" | "T", Profile> = {
  P: {
    emoji: "🏟️",
    label: "Le Passionné",
    tagline: "Vous voulez être au cœur du match, pas juste le regarder.",
    desc: "Pour vous, un match c'est une expérience totale — l'image, le son, les sensations. Vous ne regardez pas le foot : vous le vivez. La distance entre votre salon et le stade ? Elle devrait être nulle.",
    product: "Laser TV 4K · L9Q",
    productDesc:
      "Une projection XXL jusqu'à 120\", une image 4K lumineuse et des noirs profonds. Le stade chez vous, en grand.",
    productEmoji: "✨",
    productUrl: EXTERNAL_LINKS.laserTvL9q,
    productImage: "/images/quiz-product-laser.png",
    productImageAlt: "Laser TV Hisense L9Q",
  },
  C: {
    emoji: "🥂",
    label: "Le Convivial",
    tagline: "Pour vous, un match sans partage n'a aucun intérêt.",
    desc: "Vous transformez chaque rencontre en véritable événement. Les invités, l'ambiance, le frigo bien garni — c'est autant votre domaine que le terrain. Le foot est un prétexte à créer des souvenirs.",
    product: "Réfrigérateur FreshFit",
    productDesc:
      "Conçu pour ceux qui reçoivent. Grande capacité, organisation intelligente, froid optimal pour que rien ne manque quand ça compte.",
    productEmoji: "🧊",
    productUrl: EXTERNAL_LINKS.fridgeFreshFit,
    productImage: "/images/quiz-product-fridge.png",
    productImageAlt: "Réfrigérateur Hisense FreshFit",
  },
  T: {
    emoji: "🔍",
    label: "Le Tacticien",
    tagline: "Rien ne vous échappe. Absolument rien.",
    desc: "Vous lisez le jeu là où les autres voient juste un match. La position des défenseurs, la trajectoire du ballon, le mouvement avant le but — vous les voyez tous. Encore faut-il avoir l'image qui suit.",
    product: 'TV RGB MiniLED 4K · 116"',
    productDesc:
      "Technologie MiniLED, 144 Hz, couleurs ultra-précises. Chaque détail du jeu s'affiche avec une netteté irréprochable.",
    productEmoji: "📺",
    productUrl: EXTERNAL_LINKS.tvRgbMiniLed,
    productImage: "/images/quiz-product-tv.png",
    productImageAlt: "TV Hisense RGB MiniLED",
  },
};

type Step = "intro" | "quiz" | "result";

export function QuizContent() {
  const [step, setStep] = useState<Step>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fading, setFading] = useState(false);

  const transition = (fn: () => void) => {
    setFading(true);
    setTimeout(() => {
      fn();
      setFading(false);
    }, 280);
  };

  const getProfile = (): Profile => {
    const scores: Scores = { P: 0, C: 0, T: 0 };
    QUESTIONS.forEach((q, i) => {
      const answerId = answers[i];
      if (!answerId) return;
      const opt = q.options.find((o) => o.id === answerId);
      if (!opt) return;
      scores.P += opt.scores.P;
      scores.C += opt.scores.C;
      scores.T += opt.scores.T;
    });
    if (scores.P >= scores.C && scores.P >= scores.T) return PROFILES.P;
    if (scores.C >= scores.P && scores.C >= scores.T) return PROFILES.C;
    return PROFILES.T;
  };

  const startQuiz = () =>
    transition(() => {
      setStep("quiz");
      setCurrent(0);
      setSelected(answers[0] || null);
    });

  const selectOption = (id: string) => setSelected(id);

  const goNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [current]: selected };
    setAnswers(newAnswers);
    transition(() => {
      if (current < QUESTIONS.length - 1) {
        const next = current + 1;
        setCurrent(next);
        setSelected(newAnswers[next] || null);
      } else {
        setStep("result");
      }
    });
  };

  const goPrev = () => {
    if (current === 0) {
      transition(() => setStep("intro"));
      return;
    }
    transition(() => {
      const prev = current - 1;
      setCurrent(prev);
      setSelected(answers[prev] || null);
    });
  };

  const submitEmail = () => {
    if (!email) return;
    setSubmitted(true);
  };

  const resetQuiz = () =>
    transition(() => {
      setStep("intro");
      setCurrent(0);
      setAnswers({});
      setSelected(null);
      setEmail("");
      setSubmitted(false);
    });

  const fadeClass = fading
    ? "opacity-0 translate-y-3"
    : "opacity-100 translate-y-0";

  return (
    <div className="w-full h-full flex items-center justify-center px-6 py-8">
      <div
        className={`w-full max-w-[680px] bg-white/[0.025] border border-[#00b3ac]/[0.18] rounded-[20px] p-10 relative z-[1] transition-all duration-300 ease-out ${fadeClass}`}
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        {step === "intro" && <IntroView onStart={startQuiz} />}
        {step === "quiz" && (
          <QuizView
            q={QUESTIONS[current]}
            current={current}
            total={QUESTIONS.length}
            selected={selected}
            onSelect={selectOption}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
        {step === "result" && !submitted && (
          <ResultView
            profile={getProfile()}
            email={email}
            onEmailChange={setEmail}
            onSubmit={submitEmail}
          />
        )}
        {step === "result" && submitted && (
          <ConfirmationView profile={getProfile()} onReset={resetQuiz} />
        )}
      </div>
    </div>
  );
}

// ---------- INTRO ----------
function IntroView({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center">
      <div className="text-[48px] mb-4">⚽</div>
      <div className="text-[11px] tracking-[2px] uppercase text-[#00b3ac] font-semibold mb-3">
        Hisense · FIFA World Cup 2026™
      </div>
      <h1
        className="text-white text-[32px] font-black uppercase mb-4 leading-[1.1] tracking-[-0.5px]"
        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
      >
        Quel type de fan
        <br />
        êtes-vous ?
      </h1>
      <p className="text-[16px] text-[#faf9f5]/[0.65] leading-[1.6] mb-8">
        4 questions pour découvrir votre profil de supporter — et le produit
        Hisense fait pour vous.
      </p>
      <div className="flex gap-2 justify-center mb-8 flex-wrap">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full border-[1.5px] border-[#00b3ac]/40 flex items-center justify-center text-[11px] text-[#00b3ac] font-bold"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <button
        onClick={onStart}
        className="bg-[#00b3ac] text-[#0a1519] rounded-full px-8 py-3.5 text-[15px] font-bold tracking-[0.3px] hover:opacity-85 transition-opacity"
      >
        Découvrir mon profil →
      </button>
      <p className="mt-4 text-[11px] text-[#faf9f5]/30 tracking-[0.3px]">
        SPONSOR OFFICIEL · FIFA WORLD CUP 2026™
      </p>
    </div>
  );
}

// ---------- QUIZ ----------
function QuizView({
  q,
  current,
  total,
  selected,
  onSelect,
  onPrev,
  onNext,
}: {
  q: Question;
  current: number;
  total: number;
  selected: string | null;
  onSelect: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const progress = ((current + (selected ? 1 : 0)) / total) * 100;
  return (
    <>
      <div className="w-full h-[3px] bg-white/[0.08] rounded-full mb-8 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00b3ac] to-[#43e5dc] transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-[12px] text-[#faf9f5]/40 tracking-[1px]">
          QUESTION {current + 1} / {total}
        </div>
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-5 bg-[#00b3ac]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="text-[11px] tracking-[2px] uppercase text-[#00b3ac] font-semibold mb-3">
        Stadium Experience
      </div>
      <h2
        className="text-white text-[26px] font-extrabold leading-[1.25] uppercase tracking-[-0.3px] mb-7"
        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
      >
        {q.question}
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {q.options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`text-left bg-white/[0.04] border-[1.5px] rounded-[14px] p-4 cursor-pointer flex flex-col gap-1.5 transition-all active:scale-[0.98] ${
                isSelected
                  ? "border-[#00b3ac] bg-[#00b3ac]/10"
                  : "border-white/[0.08] hover:border-[#00b3ac]/40"
              }`}
            >
              <div className="text-[24px] mb-1">{opt.emoji}</div>
              <div
                className={`text-[17px] font-bold leading-[1.25] transition-colors ${
                  isSelected ? "text-[#43e5dc]" : "text-[#faf9f5]/75"
                }`}
              >
                {opt.label}
              </div>
              <div className="text-[13px] text-[#faf9f5]/45 leading-[1.35]">
                {opt.sub}
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="bg-transparent text-[#faf9f5]/60 border border-white/20 rounded-full px-6 py-3 text-[14px] font-medium hover:border-white/40 hover:text-[#faf9f5] transition-all"
        >
          ← Retour
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="bg-[#00b3ac] text-[#0a1519] rounded-full px-8 py-3.5 text-[15px] font-bold tracking-[0.3px] hover:opacity-85 disabled:opacity-35 disabled:cursor-not-allowed transition-opacity"
        >
          {current < total - 1
            ? "Question suivante →"
            : "Voir mes résultats 🏆"}
        </button>
      </div>
    </>
  );
}

// ---------- RESULT ----------
function ResultView({
  profile,
  email,
  onEmailChange,
  onSubmit,
}: {
  profile: Profile;
  email: string;
  onEmailChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <>
      <div className="text-center mb-4">
        <div className="text-[34px] mb-2">{profile.emoji}</div>
        <div className="text-[11px] tracking-[2px] uppercase text-[#00b3ac] font-semibold mb-3">
          Votre profil
        </div>
        <h2
          className="text-white text-[24px] font-extrabold uppercase leading-[1.2] tracking-[-0.3px] mb-1.5"
          style={{ fontFamily: "var(--font-barlow), sans-serif" }}
        >
          {profile.label}
        </h2>
        <p className="text-[14px] text-[#00b3ac] font-semibold mb-2 italic">
          "{profile.tagline}"
        </p>
        <p className="text-[13px] text-[#faf9f5]/65 leading-[1.5] text-left overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
          {profile.desc}
        </p>
      </div>
      <div className="h-px bg-white/[0.08] my-4" />
      <div className="mb-4">
        <div className="text-[12px] text-[#faf9f5]/50 tracking-[1px] uppercase mb-3">
          Le produit fait pour vous
        </div>
        <a
          href={profile.productUrl}
          target="_blank"
          rel="noreferrer"
          className="group block rounded-[18px] overflow-hidden bg-[#00b3ac]/10 border border-[#00b3ac]/30 hover:border-[#43e5dc]/80 transition-colors"
        >
          <div className="relative h-[150px] overflow-hidden">
            <img
              src={profile.productImage}
              alt={profile.productImageAlt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061215] via-[#061215]/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] tracking-[1.6px] uppercase text-[#43e5dc] font-semibold mb-1">
                    {profile.productEmoji} Recommandation Hisense
                  </div>
                  <div className="text-white text-[17px] font-bold leading-tight">
                    {profile.product}
                  </div>
                </div>
                <div className="shrink-0 rounded-full bg-[#00b3ac] px-4 py-2 text-[12px] font-bold text-[#071316]">
                  Voir le produit →
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2.5 text-[12px] text-[#faf9f5]/55 leading-[1.45]">
            {profile.productDesc}
          </div>
        </a>
      </div>
      <div className="h-px bg-white/[0.08] my-4" />
      <div className="mb-4">
        <div className="text-[13px] text-[#faf9f5]/65 mb-3 leading-[1.45]">
          Laissez votre e-mail pour recevoir plus d'infos sur ce produit.
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="vous@domaine.fr"
          className="w-full bg-white/5 border-[1.5px] border-white/15 rounded-[10px] px-4 py-3 text-[15px] text-[#faf9f5] placeholder:text-[#faf9f5]/30 focus:outline-none focus:border-[#00b3ac] transition-colors mb-3"
        />
        <button
          onClick={onSubmit}
          disabled={!email}
          className="w-full bg-[#00b3ac] text-[#0a1519] rounded-full px-8 py-3.5 text-[15px] font-bold tracking-[0.3px] hover:opacity-85 disabled:opacity-35 disabled:cursor-not-allowed transition-opacity"
        >
          Je veux en savoir plus →
        </button>
      </div>
      <p className="text-[11px] text-[#faf9f5]/30 text-center">
        Pas de spam. Désabonnement en 1 clic.
      </p>
    </>
  );
}

// ---------- CONFIRMATION ----------
function ConfirmationView({
  profile,
  onReset,
}: {
  profile: Profile;
  onReset: () => void;
}) {
  return (
    <div className="text-center py-5">
      <div className="text-[56px] mb-4">🎉</div>
      <div className="text-[11px] tracking-[2px] uppercase text-[#00b3ac] font-semibold mb-3">
        C'est noté !
      </div>
      <h2
        className="text-white text-[26px] font-extrabold uppercase leading-[1.25] tracking-[-0.3px] mb-4"
        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
      >
        À très vite.
      </h2>
      <p className="text-[15px] text-[#faf9f5]/65 mb-8 leading-[1.65]">
        Nous vous enverrons tout ce qu'il faut savoir sur le{" "}
        <strong className="text-[#faf9f5]">{profile.product}</strong> — et les
        infos pour tenter de le remporter.
      </p>
      <div className="bg-[#00b3ac]/10 border-[1.5px] border-[#00b3ac]/30 rounded-xl p-4 mb-7 text-left">
        <div className="text-[11px] tracking-[2px] uppercase text-[#00b3ac] font-semibold mb-1.5">
          Votre profil · {profile.emoji}
        </div>
        <div className="text-white text-[16px] font-bold mb-1">
          {profile.label}
        </div>
        <div className="text-[13px] text-[#faf9f5]/50 leading-[1.5]">
          {profile.tagline}
        </div>
      </div>
      <button
        onClick={onReset}
        className="bg-transparent text-[#faf9f5]/60 border border-white/20 rounded-full px-6 py-3 text-[14px] font-medium hover:border-white/40 hover:text-[#faf9f5] transition-all"
      >
        Recommencer le quiz
      </button>
    </div>
  );
}
