"use client";

import { useEffect, useRef, useState } from "react";
import type { Cocktail } from "@/lib/types";
import { UNIT_LABELS } from "@/lib/types";
import { INGREDIENT_BY_ID } from "@/data/ingredients";
import { addEntry } from "@/lib/history";

interface Props {
  cocktail: Cocktail;
  onClose: () => void;
}

function formatAmount(amount: number | null, unit: string): string {
  if (amount === null) return "a gosto";
  return `${amount} ${unit}`;
}

export function BartenderMode({ cocktail, onClose }: Props) {
  // Build steps: [ingredients, ...method, garnish?]
  const steps = buildSteps(cocktail);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Wake lock — prevent screen sleep while bartender mode is active
  useEffect(() => {
    if ("wakeLock" in navigator) {
      navigator.wakeLock.request("screen").then((lock) => {
        wakeLockRef.current = lock;
      }).catch(() => {/* silently ignore unsupported */});
    }
    return () => {
      wakeLockRef.current?.release().catch(() => {});
    };
  }, []);

  function prev() {
    setStep((s) => Math.max(0, s - 1));
  }

  function next() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  // Tap zones: left half = prev, right half = next (behind buttons)
  function handleTapZone(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX - rect.left < rect.width / 2) {
      prev();
    } else {
      next();
    }
  }

  function handleComplete() {
    const note = window.prompt("Nota opcional (deixe em branco para pular):", "") ?? undefined;
    addEntry(cocktail.id, note === "" ? undefined : note);
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        maxWidth: 430,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 16px 12px",
        borderBottom: "1px solid var(--border)",
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{cocktail.name}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
            Passo {step + 1} de {steps.length}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Sair do modo preparo"
          style={{
            fontSize: 20,
            color: "var(--text-muted)",
            minWidth: 44,
            minHeight: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
      </div>

      {/* Step indicator dots */}
      <div style={{ display: "flex", gap: 4, padding: "12px 16px 0", flexShrink: 0 }}>
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i <= step ? "var(--accent)" : "var(--border)",
              transition: "background 0.2s",
            }}
          />
        ))}
      </div>

      {/* Tap zone (behind content but above nothing — pointer events none on content) */}
      <div
        style={{ flex: 1, position: "relative", overflow: "hidden" }}
        onClick={handleTapZone}
      >
        {/* Step content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 24px",
            pointerEvents: "none",
          }}
        >
          {done ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🍸</div>
              <div style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>Pronto!</div>
              <div style={{ fontSize: 15, color: "var(--text-muted)" }}>
                {cocktail.name} preparado com sucesso.
              </div>
            </div>
          ) : (
            <StepContent step={steps[step]} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        flexShrink: 0,
        padding: "12px 16px max(16px, env(safe-area-inset-bottom))",
        borderTop: "1px solid var(--border)",
        display: "flex",
        gap: 12,
      }}>
        {done ? (
          <button
            type="button"
            onClick={handleComplete}
            style={{
              flex: 1,
              height: 64,
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: 14,
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            ✓ Concluído — registrar
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              style={{
                flex: 1,
                height: 64,
                background: "var(--bg-elev)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                fontSize: 17,
                color: step === 0 ? "var(--text-dim)" : "var(--text)",
              }}
            >
              ← Anterior
            </button>
            <button
              type="button"
              onClick={next}
              style={{
                flex: 2,
                height: 64,
                background: "var(--accent)",
                color: "var(--bg)",
                borderRadius: 14,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              {step === steps.length - 1 ? "Finalizar ✓" : "Próximo →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ---- Step types ----

type StepData =
  | { type: "ingredients"; cocktail: Cocktail }
  | { type: "method"; text: string; index: number; total: number }
  | { type: "garnish"; text: string };

function buildSteps(cocktail: Cocktail): StepData[] {
  const result: StepData[] = [{ type: "ingredients", cocktail }];
  cocktail.method.forEach((text, i) => {
    result.push({ type: "method", text, index: i + 1, total: cocktail.method.length });
  });
  if (cocktail.garnish) {
    result.push({ type: "garnish", text: cocktail.garnish });
  }
  return result;
}

function StepContent({ step }: { step: StepData }) {
  if (step.type === "ingredients") {
    return (
      <div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 16, fontWeight: 600 }}>
          Ingredientes
        </div>
        {step.cocktail.ingredients.map((ri, i) => {
          const ing = INGREDIENT_BY_ID[ri.ingredientId];
          const name = ing?.displayName ?? ri.ingredientId;
          return (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "10px 0",
              borderBottom: "1px solid var(--border)",
              fontSize: 18,
              gap: 12,
            }}>
              <span>
                {ri.modifier && <span style={{ color: "var(--text-muted)" }}>{ri.modifier} </span>}
                {name}
              </span>
              <span style={{ color: "var(--accent)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                {formatAmount(ri.amount, UNIT_LABELS[ri.unit])}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  if (step.type === "method") {
    return (
      <div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 20, fontWeight: 600 }}>
          Passo {step.index} de {step.total}
        </div>
        <div style={{ fontSize: 26, lineHeight: 1.4, fontWeight: 500 }}>
          {step.text}
        </div>
      </div>
    );
  }

  // garnish
  return (
    <div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 20, fontWeight: 600 }}>
        Guarnição
      </div>
      <div style={{ fontSize: 26, lineHeight: 1.4, fontWeight: 500 }}>
        {step.text}
      </div>
    </div>
  );
}
