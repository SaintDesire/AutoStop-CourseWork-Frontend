"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export default function NotFound () {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !handleRef.current) return;

    const chars = Array.from(containerRef.current.querySelector("p")?.textContent || "");
    const pElement = containerRef.current.querySelector("p");
    if (!pElement) return;

    // Очистка текста и разделение на символы
    pElement.innerHTML = "";
    pElement.style.visibility = "visible"
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      pElement.appendChild(span);
    });

    const charSpans = pElement.querySelectorAll("span");
    const copyWidth = pElement.getBoundingClientRect().width;

    // Создание анимаций
    const splitTextTimeline = gsap.timeline();
    const handleTimeline = gsap.timeline();

    function animateCopy() {
      splitTextTimeline.staggerFrom(
        charSpans,
        0.05,
        { autoAlpha: 0, ease: "back.inOut(1.7)" },
        0.05
      );
    }

    function blinkHandle() {
      handleTimeline.fromTo(
        handleRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, repeat: -1, yoyo: true }
      );
    }

    function animateHandle() {
      handleTimeline.to(handleRef.current, {
        x: copyWidth,
        duration: chars.length * 0.05, // Синхронизация с длительностью анимации текста
        ease: "steps(12)",
        onComplete: blinkHandle,
      });
    }

    // Инициализация анимаций
    const timeline = gsap.timeline();
    timeline.add(animateCopy, 0).add(animateHandle, 0); // Одновременный запуск текста и ручки

    // Перезапуск анимации
    const replayIcon = document.getElementById("cb-replay");
    if (replayIcon) {
      replayIcon.addEventListener("click", () => {
        splitTextTimeline.restart();
        handleTimeline.restart();
      });
    }

    return () => {
      splitTextTimeline.kill();
      handleTimeline.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black font-mono z-50 flex items-center justify-center">
      <div className="flex flex-col">
        <div ref={containerRef} className="copy-container text-center relative">
          <p className="text-white text-2xl md:text-4xl" style={{visibility: "hidden"}}>404, page not found.</p>
          <span
            ref={handleRef}
            className="handle absolute bg-yellow-400 w-3.5 h-7 top-0 left-0 mt-1"
          ></span>
        </div>
        <Link
          href={DASHBOARD_PAGES.HOME}
          className="flex justify-center items-center mt-6"
        >
          <button className="bg-black text-white font-bold py-3 px-6 rounded-xl border-2 border-yellow-400 shadow-lg shadow-yellow-400 hover:bg-gray-900 hover:shadow-yellow-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transform hover:scale-105">
            На главную
          </button>
        </Link>
      </div>



      <svg
        id="cb-replay"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 279.9 297.3"
        className="absolute bottom-4 right-4 w-8 h-8 fill-gray-500 hover:fill-gray-300 cursor-pointer"
      >
        <g>
          <path d="M269.4,162.6c-2.7,66.5-55.6,120.1-121.8,123.9c-77,4.4-141.3-60-136.8-136.9C14.7,81.7,71,27.8,140,27.8c1.8,0,3.5,0,5.3,0.1c0.3,0,0.5,0.2,0.5,0.5v15c0,1.5,1.6,2.4,2.9,1.7l35.9-20.7c1.3-0.7,1.3-2.6,0-3.3L148.6,0.3c-1.3-0.7-2.9,0.2-2.9,1.7v15c0,0.3-0.2,0.5-0.5,0.5c-1.7-0.1-3.5-0.1-5.2-0.1C63.3,17.3,1,78.9,0,155.4C-1,233.8,63.4,298.3,141.9,297.3c74.6-1,135.1-60.2,138-134.3c0.1-3-2.3-5.4-5.3-5.4l0,0C271.8,157.6,269.5,159.8,269.4,162.6z" />
        </g>
      </svg>
    </div>
  );
};
