/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { QuizContent } from "./quiz-content";
import { InlineVideoSection } from "./video-player";
import { MATCHES, getCurrentState, formatCountdown } from "./match-ticker";
import { EXTERNAL_LINKS, SECTION_IDS } from "./campaign-links";
import { ScrollLink } from "./scroll-link";

/**
 * Version mobile de la landing Hisense Coupe du Monde.
 * Même contenu, même copy, mêmes images, même branding que la version 1920px
 * — réorganisé en single-column mobile-first avec scroll vertical naturel.
 *
 * Sections : Header → Hero → Cards (Atelier, offres Hisense, Quiz, MPP)
 * → Match ticker → Newsletter → TV banner → Produits (TV, Frigo, Projecteur)
 * → Quiz interactif → Stadium aerial → Video
 */
export function MobileLanding() {
  return (
    <div className="w-full bg-[#faf9f5] overflow-x-hidden">
      <MobileHeader />
      <MobileHero />
      <MobileCardsSection />
      <MobileNewsletter />
      <MobileTvBanner />
      <MobileProducts />
      <MobileInteractiveQuiz />
      <InlineVideoSection videoId="U6xmkiknDJM" />
      <MobileFooter />
    </div>
  );
}

// =================================================================
// 1. Header
// =================================================================

function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-5 py-4 border-b border-[#e8e6dc]">
      <span className="font-inter font-semibold text-[#00b3ac] text-[20px] tracking-tight">
        Hisense
      </span>
      <button aria-label="Menu" className="flex flex-col gap-[5px] p-2 -mr-2">
        <span className="block w-5 h-[2px] bg-[#0e1a1f]" />
        <span className="block w-5 h-[2px] bg-[#0e1a1f]" />
        <span className="block w-5 h-[2px] bg-[#0e1a1f]" />
      </button>
    </header>
  );
}

// =================================================================
// 2. Hero
// =================================================================

function MobileHero() {
  return (
    <section className="relative bg-[#0e1a1f] overflow-hidden">
      {/* Key visual en haut, format mobile */}
      <div className="relative w-full h-[280px]">
        <img
          src="/images/hero-kv.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e1a1f]" />
      </div>

      {/* Contenu texte */}
      <div className="relative px-6 pb-12 -mt-6">
        {/* Sponsor badge */}
        <div className="flex items-center gap-2 mb-4">
          <img src="/svg/sponsor-icon.svg" alt="" className="w-4 h-4" />
          <span className="font-inter text-[11px] text-[#00b3ac] tracking-[1.65px] uppercase">
            Sponsor officiel · FIFA World Cup 2026
          </span>
        </div>

        {/* Subtitle Hisense Stadium Experience */}
        <p className="font-inter text-[15px] text-[#faf9f5] tracking-[0.2px] mb-3">
          <span className="uppercase">H</span>isense{" "}
          <span className="uppercase">S</span>tadium{" "}
          <span className="uppercase">E</span>xperience
        </p>

        {/* Big title */}
        <h1 className="font-inter font-medium text-[34px] leading-[1] text-white/85 uppercase mb-5">
          Vivez la véritable Expérience Coupe du Monde avec Hisense
        </h1>

        {/* Body copy */}
        <p className="font-inter text-[15px] text-white/85 leading-[1.5] mb-7">
          Chez vous, chez des amis, à l&apos;Atelier des Lumières et même au
          stade... vivez une expérience unique grâce à Hisense
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4">
          <ScrollLink
            targetId={SECTION_IDS.products}
            offset={64}
            className="bg-[#00b3ac] text-[#0e1a1f] font-inter text-[15px] tracking-[0.075px] rounded-full px-6 py-3.5 w-full text-center"
          >
            Découvrir la gamme officielle
          </ScrollLink>
          <ScrollLink
            targetId={SECTION_IDS.video}
            offset={64}
            className="flex items-center justify-center gap-2 text-[#faf9f5] text-[15px] underline-offset-4 underline decoration-white/50"
          >
            Voir le teaser
            <img src="/svg/arrow-1.svg" alt="" className="w-3.5 h-3.5" />
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}

// =================================================================
// 3. Cards section (Atelier, offres Hisense, Quiz, MPP) + Ticker
// =================================================================

function MobileCardsSection() {
  return (
    <section className="bg-[#e8e6dc] px-5 py-12 flex flex-col gap-5">
      {/* Featured : Atelier des Lumières */}
      <CardAtelier />

      {/* 2x2 grid : offres Hisense + MPP + Quiz */}
      <Card300Euros />
      <Card2Places />
      <CardMPP />
      <CardQuiz />

      {/* Match ticker compact mobile */}
      <MobileMatchTicker />
    </section>
  );
}

function CardAtelier() {
  return (
    <div className="relative bg-[#fefdf9] border border-[rgba(0,179,172,0.2)] rounded-2xl overflow-hidden">
      <div className="relative h-[260px] w-full">
        <img
          src="/images/stadium-experience.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <img
          src="/images/stadium-title-overlay.png"
          alt=""
          className="absolute inset-x-4 top-4 max-w-[80%]"
        />
      </div>
      <div className="p-6">
        <h3 className="font-inter font-medium text-[#16201f] text-[18px] uppercase leading-tight mb-4 tracking-tight">
          Une expérience unique au monde à ne pas manquer
        </h3>
        <div className="flex items-center gap-2 text-[#16201f]/80 text-[14px] mb-4">
          <span>16 juin · 21h00</span>
          <span className="opacity-50">·</span>
          <span>France 🇫🇷 vs Sénégal 🇸🇳</span>
        </div>
        <button className="bg-[#00b3ac] text-white font-inter text-[15px] rounded-full px-6 py-3 w-full">
          Réserver ma place
        </button>
      </div>
    </div>
  );
}

function Card300Euros() {
  return (
    <div className="bg-[#fefdf9] border border-[#e8e6dc] rounded-2xl p-6">
      <p className="font-inter font-medium text-[#00b3ac] text-[16px] leading-none tracking-[1.2px] uppercase">
        Jusqu&apos;à
      </p>
      <p className="font-inter font-medium text-[#00b3ac] text-[72px] leading-none tracking-tight">
        500€
      </p>
      <p className="font-inter text-[#16201f] text-[12px] tracking-[1.2px] uppercase mt-2">
        Remboursés
      </p>
      <p className="font-inter text-[#2d3534] text-[16px] leading-snug mt-4">
        Sur la gamme officielle du 28/04/2026 au 23/06/2026.
      </p>
      <a
        href={EXTERNAL_LINKS.cashbackOffer}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-[#00b3ac] text-[15px] mt-4"
      >
        Voir l&apos;offre
        <img src="/svg/arrow-link-1.svg" alt="" className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function Card2Places() {
  return (
    <div className="bg-[#fefdf9] border border-[#e8e6dc] rounded-2xl p-6">
      <h3 className="font-inter font-medium text-[#00b3ac] text-[32px] leading-tight uppercase tracking-tight">
        Jeu 100%
        <br />
        remboursé
      </h3>
      <p className="font-inter text-[#2d3534] text-[16px] leading-snug mt-4">
        Tentez de gagner le remboursement de votre produit du 28/04/2026 au
        23/06/2026.
      </p>
      <a
        href={EXTERNAL_LINKS.fullRefundGame}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-[#00b3ac] text-[15px] mt-4"
      >
        Tenter ma chance
        <img src="/svg/arrow-link-2.svg" alt="" className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function CardMPP() {
  return (
    <div className="relative bg-[#0e1a1f] rounded-2xl overflow-hidden">
      <img
        src="/images/mpp-card.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
      <div className="relative p-6 pt-4 min-h-[260px] flex flex-col justify-between">
        <img
          src="/images/logo-mpp-blanc.png"
          alt="Mon Petit Prono"
          className="h-12 w-auto"
        />
        <div>
          <h3 className="font-inter font-medium text-white text-[20px] leading-[1.2] mb-4">
            JEU CONCOURS
            <br />
            MON PETIT PRONO
            <br />
            Tentez de gagner une TV
          </h3>
          <a
            href={EXTERNAL_LINKS.mppChallenge}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-white text-[15px]"
          >
            Découvrir
            <img src="/svg/arrow-link-4.svg" alt="" className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function CardQuiz() {
  return (
    <div className="relative bg-[#0e1a1f] rounded-2xl overflow-hidden">
      <img
        src="/images/quiz-card-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      <div className="relative p-6 min-h-[260px] flex flex-col justify-end">
        <h3 className="font-inter font-medium text-white text-[20px] leading-[1.2] mb-4 uppercase">
          Testez notre quizz
          <br />
          spécial Coupe du Monde
        </h3>
        <ScrollLink
          targetId={SECTION_IDS.quiz}
          offset={64}
          className="inline-flex items-center gap-1.5 text-white text-[15px]"
        >
          Découvrir
          <img src="/svg/arrow-link-3.svg" alt="" className="w-3.5 h-3.5" />
        </ScrollLink>
      </div>
    </div>
  );
}

// =================================================================
// Mobile Match Ticker — compact version, même data que desktop
// =================================================================

function MobileMatchTicker() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <MobileMatchBanner
        label="Match d'ouverture"
        match={MATCHES[0]}
        dateLabel="11 juin · 21:00"
        sub=""
        accent="opening"
      />
    );
  }

  const { match, isLive, isOpening, isPostGroupStage } = getCurrentState(now);

  if (isPostGroupStage || !match) {
    return (
      <MobileMatchBanner
        label="Phase à élimination directe"
        custom="🏆 1/8 de finale dès le 29 juin"
        dateLabel="Suivez sur fifa.com"
        sub=""
        accent="finals"
      />
    );
  }

  const matchDate = new Date(match.utc);
  const dateFmt = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = dateFmt.format(matchDate);
  const [dateStr, timeStr] = formattedDate.split(" à ");
  const dateLabel = dateStr.toUpperCase() + (timeStr ? ` · ${timeStr}` : "");

  if (isLive) {
    const elapsedMin = Math.floor(
      (now.getTime() - matchDate.getTime()) / (1000 * 60),
    );
    return (
      <MobileMatchBanner
        label="En direct"
        match={match}
        dateLabel="Match en cours"
        sub={`${elapsedMin}ᵉ minute · ${match.venue}`}
        accent="live"
      />
    );
  }

  const cd = formatCountdown(matchDate.getTime(), now.getTime());
  const countdownStr =
    cd.days > 0
      ? `${cd.days}j ${String(cd.hours).padStart(2, "0")}h ${String(cd.minutes).padStart(2, "0")}m`
      : `${String(cd.hours).padStart(2, "0")}h ${String(cd.minutes).padStart(2, "0")}m ${String(cd.seconds).padStart(2, "0")}s`;

  return (
    <MobileMatchBanner
      label={
        isOpening ? "Match d'ouverture" : "Prochain match à vivre ensemble"
      }
      match={match}
      dateLabel={dateLabel}
      sub={`Dans ${countdownStr}`}
      accent={isOpening ? "opening" : "default"}
    />
  );
}

function MobileMatchBanner({
  label,
  match,
  custom,
  dateLabel,
  sub,
  accent,
}: {
  label: string;
  match?: {
    home: { name: string; flag: string };
    away: { name: string; flag: string };
  };
  custom?: string;
  dateLabel: string;
  sub: string;
  accent: "default" | "opening" | "live" | "finals";
}) {
  const labelColor =
    accent === "live"
      ? "text-[#ff4d4d]"
      : accent === "opening"
        ? "text-[#43e5dc]"
        : accent === "finals"
          ? "text-[#ffd76b]"
          : "text-[#b0aea5]";

  return (
    <div className="bg-[#0e1a1f] border border-[rgba(0,179,172,0.2)] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        {accent === "live" && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d4d] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4d4d]" />
          </span>
        )}
        <span
          className={`font-inter font-semibold text-[10px] tracking-[1.8px] uppercase ${labelColor}`}
        >
          {label}
        </span>
      </div>

      {custom ? (
        <p className="text-[#faf9f5] text-[18px] uppercase mb-3">{custom}</p>
      ) : match ? (
        <div className="flex items-center justify-center gap-3 my-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[22px] leading-none">{match.home.flag}</span>
            <span className="font-inter font-medium text-[#faf9f5] text-[16px] uppercase">
              {match.home.name}
            </span>
          </div>
          <span className="text-[#00b3ac] text-[16px]">—</span>
          <div className="flex items-center gap-2">
            <span className="font-inter font-medium text-[#faf9f5] text-[16px] uppercase">
              {match.away.name}
            </span>
            <span className="text-[22px] leading-none">{match.away.flag}</span>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-center gap-0.5 mt-3 pt-3 border-t border-white/10">
        <span className="font-inter text-[#00b3ac] text-[13px]">
          {dateLabel}
        </span>
        {sub && (
          <span className="font-inter text-white/55 text-[12px] tabular-nums">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

// =================================================================
// 4. Newsletter
// =================================================================

function MobileNewsletter() {
  return (
    <section className="bg-[#00b3ac] px-6 py-14">
      <span className="font-inter text-[11px] text-black tracking-[1.65px] uppercase block mb-4">
        Newsletter
      </span>
      <h2 className="font-inter font-medium text-black text-[28px] leading-tight uppercase tracking-tight mb-4">
        Ne manquez rien de l&apos;expérience avec la newsletter Hisense
      </h2>
      <p className="font-inter text-black/80 text-[15px] leading-relaxed mb-6">
        Offres exclusives, places à gagner, dates des projections — directement
        dans votre boîte.
      </p>
      <form className="flex flex-col gap-3 mb-3">
        <input
          type="email"
          placeholder="vous@domaine.fr"
          className="bg-transparent border-b border-black/40 py-3 px-1 font-inter text-[16px] text-black placeholder:text-black/40 focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          className="bg-white text-[#0e1a1f] font-inter text-[15px] rounded-full px-6 py-3.5 mt-2"
        >
          S&apos;abonner
        </button>
      </form>
      <p className="font-inter text-black/60 text-[12px] tracking-wide">
        Pas de spam, désabonnement en 1 clic.
      </p>
    </section>
  );
}

// =================================================================
// 5. TV Banner
// =================================================================

function MobileTvBanner() {
  return (
    <section className="relative bg-[#0e1a1f] overflow-hidden">
      <div className="relative h-[420px] w-full">
        <img
          src="/images/banniere-tv-salon.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>
      <div className="absolute inset-x-0 top-0 px-6 pt-8">
        <p className="font-inter text-white text-[14px] mb-3">
          Hisense Stadium Experience
        </p>
        <h2 className="font-inter font-medium text-white text-[28px] leading-tight uppercase tracking-tight">
          Le stade comme si vous y étiez avec la gamme officielle Hisense
        </h2>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
        <p className="font-inter text-white text-[16px] mb-4">
          TV RGB MiniLED 4K | 180Hz VRR 75&quot; SÉRIE UR9
        </p>
        <div className="flex items-center gap-4">
          <a
            href={EXTERNAL_LINKS.stadiumExperienceProduct}
            target="_blank"
            rel="noreferrer"
            className="bg-transparent border border-[#17d1ba] text-white rounded-full px-6 py-2 text-[14px]"
          >
            Plus
          </a>
        </div>
      </div>
    </section>
  );
}

// =================================================================
// 6. Produits
// =================================================================

function MobileProducts() {
  return (
    <section
      id={SECTION_IDS.products}
      className="bg-[#e8e6dc] px-5 py-14 flex flex-col gap-5"
    >
      <ProductCard
        image="/images/produit-tv.png"
        imageHeight={260}
        title="TV RGB MiniLED · 116″"
        desc="100% BT.2020. Le stade dans votre salon."
        priceBefore="3 799€"
        price="3 499€"
      />
      <ProductCard
        image="/images/produit-frigo.png"
        imageHeight={260}
        title="Réfrigérateur combiné · 550L"
        desc="PureFlat. NoFrost. FreshFit."
        priceBefore="1 599€"
        price="1 299€"
      />
      <ProductCard
        image="/images/produit-projecteur.png"
        imageHeight={260}
        title="Laser TV 4K L9Q · 100″"
        desc="Cinéma maison. Vrai noir. Lumière laser."
        priceBefore="5 299€"
        price="4 999€"
      />
    </section>
  );
}

function ProductCard({
  image,
  imageHeight,
  title,
  desc,
  priceBefore,
  price,
}: {
  image: string;
  imageHeight: number;
  title: string;
  desc: string;
  priceBefore: string;
  price: string;
}) {
  return (
    <div className="bg-[#00b3ac] border border-[#e8e6dc] rounded-2xl p-5">
      <div
        className="relative rounded-xl overflow-hidden mb-5"
        style={{ height: `${imageHeight}px` }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgb(232,230,220) 0%, rgb(232,230,220) 3.33%, rgb(220,217,205) 3.33%, rgb(220,217,205) 6.67%)",
          }}
        />
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
      </div>
      <h3 className="font-inter text-white text-[20px] leading-snug mb-2">
        {title}
      </h3>
      <p className="font-inter text-white text-[15px] leading-snug mb-3">
        {desc}
      </p>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-inter text-white text-[15px] line-through">
          {priceBefore}
        </span>
        <span className="font-inter text-white text-[22px]">{price}</span>
        <span className="font-inter text-white text-[11px] tracking-[1.1px] uppercase">
          après ODR
        </span>
      </div>
      <a
        href="#"
        className="inline-flex items-center gap-1.5 text-white text-[13px]"
      >
        Découvrir
        <img src="/svg/arrow-product.svg" alt="" className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

// =================================================================
// 7. Quiz interactif
// =================================================================

const QUIZ_DESIGN_WIDTH = 780;
const QUIZ_DESIGN_HEIGHT = 820;

function MobileInteractiveQuiz() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [quizScale, setQuizScale] = useState(0.5);

  useEffect(() => {
    function recalc() {
      const node = wrapperRef.current;
      if (!node) return;
      // Largeur dispo pour le quiz = largeur du conteneur (section padding x-5 = 20px chaque côté)
      const available = node.offsetWidth;
      const s = Math.min(available / QUIZ_DESIGN_WIDTH, 1);
      setQuizScale(s);
    }
    recalc();
    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);
    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
    };
  }, []);

  return (
    <section
      id={SECTION_IDS.quiz}
      className="relative bg-[#0e1a1f] px-5 py-14 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('/images/quiz-card-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative" ref={wrapperRef}>
        {/* Glass card scalée dynamiquement à la largeur du conteneur mobile. */}
        <div
          className="relative bg-[rgba(14,29,34,0.7)] backdrop-blur-md border border-[#00b3ac] rounded-3xl overflow-hidden mx-auto"
          style={{
            width: QUIZ_DESIGN_WIDTH * quizScale,
            height: QUIZ_DESIGN_HEIGHT * quizScale,
          }}
        >
          <div
            style={{
              width: QUIZ_DESIGN_WIDTH,
              height: QUIZ_DESIGN_HEIGHT,
              transformOrigin: "top left",
              transform: `scale(${quizScale})`,
            }}
          >
            <QuizContent />
          </div>
        </div>
        <p className="text-center text-white/60 text-[11px] tracking-[1.5px] uppercase mt-6">
          Sponsor officiel · FIFA World Cup 2026™
        </p>
      </div>
    </section>
  );
}

// =================================================================
// 8. Footer (responsive HTML, remplace l'image stadium-aerial.png)
// =================================================================

function MobileFooter() {
  return (
    <footer className="bg-white border-t border-[#e8e6dc]">
      {/* Logo + social */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-[#e8e6dc]">
        <span className="font-inter font-semibold text-[#00b3ac] text-[24px] tracking-tight">
          Hisense
        </span>
        <div className="flex items-center gap-3">
          <SocialIcon label="Facebook">f</SocialIcon>
          <SocialIcon label="X">𝕏</SocialIcon>
          <SocialIcon label="Instagram">◎</SocialIcon>
          <SocialIcon label="YouTube">▶</SocialIcon>
        </div>
      </div>

      {/* Menu columns stackées */}
      <div className="px-6 py-8 flex flex-col gap-7">
        <FooterColumn
          title="Téléviseurs & Audio"
          items={["Téléviseurs", "Barres de son", "Enceinte de soirée"]}
        />
        <FooterColumn
          title="Laser Home Cinema"
          items={["Laser TV", "Laser Mini Projecteur", "Laser Cinema"]}
        />
        <FooterColumn
          title="Electroménager"
          items={[
            "Froid",
            "Soin du linge",
            "Cuisson",
            "Lave-vaisselle",
            "Aspirateurs",
          ]}
        />
        <FooterColumn title="Hisense" items={["A propos"]} />
        <FooterColumn
          title="Assistance"
          items={[
            "Contactez-nous",
            "Conditions de garantie",
            "Garantie 10 ans sur le moteur Inverter",
            "Garantie sur les téléviseurs Hisense",
          ]}
        />
      </div>

      {/* Bottom links */}
      <div className="bg-[#f4f3ee] px-6 py-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#16201f] text-[13px]">
          <span className="w-5 h-5 rounded-full bg-[#00b3ac]/15 inline-flex items-center justify-center text-[10px]">
            🌐
          </span>
          <span className="font-medium">International, English</span>
        </div>
        <div className="flex flex-col gap-2 text-[13px] text-[#16201f]/80 mt-2">
          <a href="#">Politique de confidentialité</a>
          <a href="#">Mentions légales</a>
          <a href="#">Notification de conformité — EU Data Act</a>
          <a href="#">Règles de publication des avis et commentaires</a>
          <a href="#">Liste des réparateurs agréés</a>
          <a href="#">Se désabonner de la newsletter</a>
          <a href="#">Gestion du consentement</a>
        </div>
        <p className="text-[12px] text-[#16201f]/60 mt-3">
          © Hisense Europe 2025
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-inter font-semibold text-[#16201f] text-[14px] mb-3">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="font-inter text-[#16201f]/75 text-[14px] leading-snug"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-[#16201f] text-white flex items-center justify-center text-[13px]"
    >
      {children}
    </a>
  );
}
