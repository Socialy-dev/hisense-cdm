"use client";

import { useState } from "react";

/**
 * Inline video player section :
 * - Affiche le thumbnail YouTube comme background + bouton play
 * - Au clic, swap pour une iframe YouTube en autoplay qui occupe toute la section
 */
export function InlineVideoSection({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  // Thumbnail haute résolution de la vidéo (première frame officielle)
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className="content-stretch flex h-[872px] items-center justify-center min-h-[560px] overflow-clip relative shrink-0 w-full"
      data-node-id="1:253"
      data-name="Section"
    >
      {!playing && (
        <>
          {/* Container avec thumbnail + overlays Figma */}
          <div
            className="absolute inset-[0_-46.5px_-52px_-67.5px]"
            data-node-id="1:254"
          >
            {/* Background gradient + STADE pill */}
            <div
              className="absolute grid grid-cols-[1920px] grid-rows-[960px] h-[960px] left-0 overflow-clip rounded-[12px] top-0 w-[1920px]"
              data-node-id="1:255"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgb(14, 26, 31) 0%, rgb(14, 26, 31) 0.68746%, rgb(11, 53, 48) 0.68746%, rgb(11, 53, 48) 1.3749%)",
              }}
            >
              <div
                className="backdrop-blur-[3px] bg-[rgba(255,255,255,0.6)] col-start-1 content-stretch flex gap-[9.99px] items-center justify-self-center px-[14px] py-[8px] relative rounded-[999px] row-start-1 self-center shrink-0 z-10"
                data-node-id="1:256"
              >
                <div className="h-[17.59px] relative shrink-0 w-[10.13px]">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-inter font-normal h-[18px] justify-center leading-[0] left-0 not-italic text-[11px] text-[rgba(250,249,245,0.55)] top-[8px] tracking-[1.32px] uppercase w-[10.444px]">
                    <p className="leading-[17.6px]">◷</p>
                  </div>
                </div>
                <div className="h-[17.59px] relative shrink-0 w-[150.48px]">
                  <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-inter font-normal h-[18px] justify-center leading-[0] left-0 not-italic text-[11px] text-[rgba(250,249,245,0.55)] top-[8px] tracking-[1.32px] uppercase w-[150.797px]">
                    <p className="leading-[17.6px]">STADE · PLAN AÉRIEN</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Dark gradient overlay */}
            <div className="absolute bg-gradient-to-b from-[rgba(5,11,14,0.3)] inset-0 to-[rgba(5,11,14,0.78)] z-[2]" />
            {/* YouTube thumbnail (replaces former stadium photo) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Aperçu vidéo Hisense Stadium Experience"
                className="absolute h-full left-0 max-w-none top-0 w-full object-cover"
                src={thumbnail}
              />
            </div>
          </div>

          {/* Play button centré */}
          <div className="content-stretch flex flex-col items-center pb-[0.59px] px-[32px] relative shrink-0 z-[3]">
            <div className="content-stretch flex flex-col h-[325px] items-center justify-center pb-[12px] relative shrink-0 w-[493px]">
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Lire la vidéo Hisense Stadium Experience"
                className="appearance-none border-0 bg-[#faf9f5] grid grid-cols-[84px] grid-rows-[94px] px-[6px] py-px relative rounded-[48px] shrink-0 size-[96px] cursor-pointer hover:scale-110 transition-transform shadow-2xl"
              >
                <div className="col-start-1 justify-self-center relative row-start-1 self-center shrink-0 size-[22px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src="/svg/play-icon.svg"
                  />
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {playing && (
        <div className="absolute inset-0 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Hisense Stadium Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      )}
    </div>
  );
}
