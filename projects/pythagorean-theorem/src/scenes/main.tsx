import { makeScene2D, Rect, Line, Txt, Circle, Node, Layout } from "@motion-canvas/2d";
import {
  all,
  sequence,
  waitFor,
  createRef,
  createSignal,
  easeInOutCubic,
  easeOutCubic,
  easeOutBack,
  easeInBack,
  easeOutBounce,
} from "@motion-canvas/core";
import {
  COLORS,
  FONT,
  UNIT,
  LEG_A,
  LEG_B,
  HYP,
  P1,
  P2,
  P3,
  MID_A,
  MID_B,
  MID_C,
  SQA_CENTER,
  SQB_CENTER,
  SQC_CENTER,
  ROT_A,
  ROT_B,
  ROT_C,
  EQ_Y,
  EQ_X_A,
  EQ_X_PLUS,
  EQ_X_B,
  EQ_X_EQ,
  EQ_X_Q,
  EQ_DOCK_Y,
  TITLE_POS,
} from "../data/beats-kids";

// =============================================================================
// Pythagorean Theorem — Kids variant — all 7 beats in one scene
// (target ~60s @ 30fps)
// =============================================================================

export default makeScene2D(function* (view) {
  // ---------------------------------------------------------------------------
  // Background
  // ---------------------------------------------------------------------------
  view.add(new Rect({ width: 1920, height: 1080, fill: COLORS.bg }));

  // =========================================================================
  // RightTriangle component (inlined)
  // Three Line nodes for the sides + a small filled square for the right angle.
  // The whole triangle group is scaled from 0 for the entrance bounce.
  // =========================================================================
  const triGroup = createRef<Node>();
  const triScale = createSignal(0);

  const legALine = createRef<Line>();
  const legBLine = createRef<Line>();
  const hypLine  = createRef<Line>();
  const rightAngle = createRef<Rect>();

  view.add(
    <Node ref={triGroup} scale={() => triScale()}>
      {/* Right-angle marker — small filled square at P1, opening into the triangle */}
      <Rect
        ref={rightAngle}
        width={26}
        height={26}
        fill={COLORS.marker}
        opacity={0}
        // anchored so the marker sits inside the triangle at the corner
        position={[P1[0] + 13, P1[1] - 13]}
        radius={3}
      />
      {/* Leg A — vertical, red */}
      <Line
        ref={legALine}
        points={[P1, P1]}              // start collapsed; animate end-point
        stroke={COLORS.legA}
        lineWidth={10}
        lineCap="round"
      />
      {/* Leg B — horizontal, blue */}
      <Line
        ref={legBLine}
        points={[P1, P1]}
        stroke={COLORS.legB}
        lineWidth={10}
        lineCap="round"
      />
      {/* Hypotenuse — green */}
      <Line
        ref={hypLine}
        points={[P3, P3]}
        stroke={COLORS.hyp}
        lineWidth={10}
        lineCap="round"
      />
    </Node>
  );

  // =========================================================================
  // LegLabel component (inlined) — number stickers on each side
  // Note: the hypotenuse label starts as "C" (the unknown) and is revealed
  // as "5" at the very end after the C² = 25 → C = 5 derivation.
  // =========================================================================
  const label3 = createRef<Txt>();
  const label4 = createRef<Txt>();
  const label5 = createRef<Txt>();
  const label5Five = createRef<Txt>();

  // 3 — placed to the left of leg A
  view.add(
    <Txt
      ref={label3}
      text="3"
      fontSize={72}
      fontFamily={FONT}
      fontWeight={800}
      fill={COLORS.legA}
      position={[P1[0] - 50, (P1[1] + P3[1]) / 2]}
      opacity={0}
      scale={0}
    />
  );
  // 4 — placed below leg B
  view.add(
    <Txt
      ref={label4}
      text="4"
      fontSize={72}
      fontFamily={FONT}
      fontWeight={800}
      fill={COLORS.legB}
      position={[(P1[0] + P2[0]) / 2, P1[1] + 50]}
      opacity={0}
      scale={0}
    />
  );
  // C — placed above hypotenuse, perpendicular outward. Starts as the
  // unknown "C"; label5Five (text "5") is cross-faded in at the end.
  const hypOutX = MID_C[0] + 0.6 * 45;
  const hypOutY = MID_C[1] - 0.8 * 45;
  view.add(
    <Txt
      ref={label5}
      text="C"
      fontSize={80}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.hyp}
      position={[hypOutX, hypOutY]}
      opacity={0}
      scale={0}
    />
  );
  view.add(
    <Txt
      ref={label5Five}
      text="5"
      fontSize={72}
      fontFamily={FONT}
      fontWeight={800}
      fill={COLORS.hyp}
      position={[hypOutX, hypOutY]}
      opacity={0}
      scale={0}
    />
  );

  // =========================================================================
  // UnfoldingSquare component (inlined) for A, B, C
  // Container rotated so local -y is outward; inner Rect anchored to bottom
  // edge (offset.y = 1) and scaled in y from 0 → 1 to "unfold".
  // =========================================================================
  // --- Square A (red, 3×3) ---
  const sqA = createRef<Rect>();
  view.add(
    <Node position={MID_A} rotation={ROT_A}>
      <Rect
        ref={sqA}
        width={LEG_A}
        height={LEG_A}
        offset={[0, 1]}                // anchor at bottom edge in local coords
        fill={COLORS.legA}
        opacity={0.85}
        radius={12}
        scale={[1, 0]}                  // collapsed along local y
        stroke={COLORS.ink}
        lineWidth={3}
      />
    </Node>
  );

  // --- Square B (blue, 4×4) ---
  const sqB = createRef<Rect>();
  view.add(
    <Node position={MID_B} rotation={ROT_B}>
      <Rect
        ref={sqB}
        width={LEG_B}
        height={LEG_B}
        offset={[0, 1]}
        fill={COLORS.legB}
        opacity={0.85}
        radius={12}
        scale={[1, 0]}
        stroke={COLORS.ink}
        lineWidth={3}
      />
    </Node>
  );

  // --- Square C (green, 5×5, rotated to align with hypotenuse) ---
  const sqC = createRef<Rect>();
  const nodeC = createRef<Node>();
  view.add(
    <Node ref={nodeC} position={MID_C} rotation={ROT_C}>
      <Rect
        ref={sqC}
        width={HYP}
        height={HYP}
        offset={[0, 1]}
        fill={COLORS.hyp}
        opacity={0.85}
        radius={14}
        scale={[1, 0]}
        stroke={COLORS.ink}
        lineWidth={3}
      />
    </Node>
  );

  // =========================================================================
  // DotGrid component (inlined) — N×N dots layered over the unfolded squares
  // Created upfront with opacity 0; animated in sequence during the beat.
  // =========================================================================
  function buildDotGrid(
    center: [number, number],
    nPerSide: number,
    color: string,
    cell: number,
  ): { dotRefs: ReturnType<typeof createRef<Circle>>[]; container: Layout } {
    const dotRefs: ReturnType<typeof createRef<Circle>>[] = [];
    const container: Layout = (<Layout position={center} />) as Layout;
    const half = (nPerSide - 1) / 2;
    for (let r = 0; r < nPerSide; r++) {
      for (let c = 0; c < nPerSide; c++) {
        const ref = createRef<Circle>();
        dotRefs.push(ref);
        container.add(
          <Circle
            ref={ref}
            width={28}
            height={28}
            fill={color}
            position={[(c - half) * cell, (r - half) * cell]}
            opacity={0}
            scale={0}
          />,
        );
      }
    }
    return { dotRefs, container };
  }

  const gridA = buildDotGrid(SQA_CENTER, 3, COLORS.bg, UNIT);
  const gridB = buildDotGrid(SQB_CENTER, 4, COLORS.bg, UNIT);
  // gridC lives inside the rotated nodeC so dots rotate with the green square.
  // Local center of the unfolded rect is [0, -HYP/2] in node-local coords.
  const gridC = buildDotGrid([0, -HYP / 2], 5, COLORS.bg, UNIT);
  view.add(gridA.container);
  view.add(gridB.container);
  nodeC().add(gridC.container);

  // Counters that tick up over each square as dots fill in
  const counterA = createSignal(0);
  const counterB = createSignal(0);
  const counterC = createSignal(0);
  const counterAText = createRef<Txt>();
  const counterBText = createRef<Txt>();
  const counterCText = createRef<Txt>();
  view.add(
    <Txt
      ref={counterAText}
      text={() => `${Math.round(counterA())}`}
      fontSize={140}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.bg}
      stroke={COLORS.ink}
      lineWidth={3}
      position={SQA_CENTER}
      opacity={0}
    />
  );
  view.add(
    <Txt
      ref={counterBText}
      text={() => `${Math.round(counterB())}`}
      fontSize={160}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.bg}
      stroke={COLORS.ink}
      lineWidth={3}
      position={SQB_CENTER}
      opacity={0}
    />
  );
  view.add(
    <Txt
      ref={counterCText}
      text={() => `${Math.round(counterC())}`}
      fontSize={180}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.bg}
      stroke={COLORS.ink}
      lineWidth={4}
      position={SQC_CENTER}
      opacity={0}
    />
  );

  // =========================================================================
  // AnimatedEquation component (inlined) — token slots in the upper right
  // Tokens: A²   +   B²   =   ?     (then ? becomes 25 / equation completes)
  // =========================================================================
  const eqA  = createRef<Txt>();
  const eqP  = createRef<Txt>();
  const eqB  = createRef<Txt>();
  const eqEq = createRef<Txt>();
  const eqQ  = createRef<Txt>();
  const eqCheck = createRef<Txt>();

  view.add(
    <Txt ref={eqA}  text="A²" fontSize={88} fontFamily={FONT} fontWeight={900}
         fill={COLORS.legA}  position={[EQ_X_A,    EQ_Y]} opacity={0} />
  );
  view.add(
    <Txt ref={eqP}  text="+"  fontSize={88} fontFamily={FONT} fontWeight={900}
         fill={COLORS.ink}   position={[EQ_X_PLUS, EQ_Y]} opacity={0} />
  );
  view.add(
    <Txt ref={eqB}  text="B²" fontSize={88} fontFamily={FONT} fontWeight={900}
         fill={COLORS.legB}  position={[EQ_X_B,    EQ_Y]} opacity={0} />
  );
  view.add(
    <Txt ref={eqEq} text="="  fontSize={88} fontFamily={FONT} fontWeight={900}
         fill={COLORS.ink}   position={[EQ_X_EQ,   EQ_Y]} opacity={0} />
  );
  view.add(
    <Txt ref={eqQ}  text="?"  fontSize={88} fontFamily={FONT} fontWeight={900}
         fill={COLORS.ink}   position={[EQ_X_Q,    EQ_Y]} opacity={0} />
  );
  view.add(
    <Txt ref={eqCheck} text="✓" fontSize={72} fontFamily={FONT} fontWeight={900}
         fill={COLORS.hyp}  position={[EQ_X_Q + 95, EQ_Y]} opacity={0} />
  );

  // Derivation chain (revealed in beat 7):  C² = 25  →  C = 5
  // Placed in the open area between the equation row and the hero title.
  const derivCSq = createRef<Txt>();
  const derivC   = createRef<Txt>();
  const DERIV_POS: [number, number] = [620, -50];
  view.add(
    <Txt
      ref={derivCSq}
      text="C² = 25"
      fontSize={72}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.hyp}
      position={DERIV_POS}
      opacity={0}
      scale={0}
    />
  );
  view.add(
    <Txt
      ref={derivC}
      text="C = 5"
      fontSize={84}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.hyp}
      position={DERIV_POS}
      opacity={0}
      scale={0}
    />
  );

  // Dock-row tokens for the result line:
  //   [3²/9]  +  [4²/16]  =  [25]
  // tok3sq / tok4sq are the "squared form" tokens that appear briefly before
  // morphing to the computed value (9 / 16). dockPlus and dockEq are the "+"
  // and "=" signs. tok25Sq is a duplicate of tok25 that flies onto the green
  // square so the result line "9 + 16 = 25" stays visible in place.
  const tok3sq   = createRef<Txt>();
  const tok4sq   = createRef<Txt>();
  const tok9     = createRef<Txt>();
  const tok16    = createRef<Txt>();
  const dockPlus = createRef<Txt>();
  const dockEq   = createRef<Txt>();
  const tok25    = createRef<Txt>();
  const tok25Sq  = createRef<Txt>();
  view.add(
    <Txt
      ref={tok3sq}
      text="3²"
      fontSize={96}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.legA}
      position={SQA_CENTER}
      opacity={0}
    />
  );
  view.add(
    <Txt
      ref={tok9}
      text="9"
      fontSize={80}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.legA}
      position={[EQ_X_A, EQ_DOCK_Y]}
      opacity={0}
      scale={0}
    />
  );
  view.add(
    <Txt
      ref={tok4sq}
      text="4²"
      fontSize={96}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.legB}
      position={SQB_CENTER}
      opacity={0}
    />
  );
  view.add(
    <Txt
      ref={tok16}
      text="16"
      fontSize={80}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.legB}
      position={[EQ_X_B, EQ_DOCK_Y]}
      opacity={0}
      scale={0}
    />
  );
  view.add(
    <Txt
      ref={dockPlus}
      text="+"
      fontSize={80}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.ink}
      position={[EQ_X_PLUS, EQ_DOCK_Y]}
      opacity={0}
      scale={0}
    />
  );
  view.add(
    <Txt
      ref={dockEq}
      text="="
      fontSize={80}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.ink}
      position={[EQ_X_EQ, EQ_DOCK_Y]}
      opacity={0}
      scale={0}
    />
  );
  view.add(
    <Txt
      ref={tok25}
      text="25"
      fontSize={96}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.hyp}
      stroke={COLORS.ink}
      lineWidth={2}
      position={[EQ_X_Q, EQ_DOCK_Y]}
      opacity={0}
      scale={0}
    />
  );
  view.add(
    <Txt
      ref={tok25Sq}
      text="25"
      fontSize={96}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.hyp}
      stroke={COLORS.ink}
      lineWidth={2}
      position={[EQ_X_Q, EQ_DOCK_Y]}
      opacity={0}
      scale={0}
    />
  );

  // =========================================================================
  // SparkleBurst component (inlined) — quick radial gold sparkles
  // =========================================================================
  function* sparkle(at: [number, number], count = 8, radius = 80, dur = 0.7) {
    const sparkles: Circle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const c = new Circle({
        width: 16,
        height: 16,
        fill: COLORS.sparkle,
        position: at,
        opacity: 1,
        scale: 1,
      });
      sparkles.push(c);
      view.add(c);
      // schedule its trajectory
      const targetX = at[0] + Math.cos(angle) * radius;
      const targetY = at[1] + Math.sin(angle) * radius;
      (c as any)._target = [targetX, targetY];
    }
    yield* all(
      ...sparkles.map((s) =>
        all(
          s.position((s as any)._target as [number, number], dur, easeOutCubic),
          s.opacity(0, dur, easeOutCubic),
          s.scale(0.3, dur, easeOutCubic),
        ),
      ),
    );
    sparkles.forEach((s) => s.remove());
  }

  // ===========================================================================
  // BEAT 1 — Intro (~6s)
  // Triangle slides/bounces in. Right-angle marker pops on "square corner".
  // ===========================================================================
  // Triangle group entrance: scale from 0 with bounce
  yield* waitFor(0.3);
  yield* all(
    triScale(1, 1.1, easeOutBack),
    // Draw each leg + hypotenuse simultaneously
    legALine().points([P1, P3], 0.9, easeOutCubic),
    legBLine().points([P1, P2], 0.9, easeOutCubic),
    hypLine().points([P3, P2], 0.9, easeOutCubic),
  );
  // SYNC: triangle-in — right-angle marker pops
  yield* all(
    rightAngle().opacity(1, 0.25, easeOutCubic),
    rightAngle().scale(0, 0),
  );
  yield* rightAngle().scale(1, 0.5, easeOutBack);
  yield* waitFor(3.2); // hold the establishing shot — total ~6s

  // ===========================================================================
  // BEAT 2 — Label sides 3, 4, 5 (~7s)
  // Numbers fly in with a tick (staggered).
  // ===========================================================================
  // Labels and formula appear together: triangle sides and the equation goal
  // are introduced as a single unified beat — no gap between them.
  yield* all(
    sequence(
      0.6,
      all(label3().opacity(1, 0.3), label3().scale(1, 0.55, easeOutBack)),
      all(label4().opacity(1, 0.3), label4().scale(1, 0.55, easeOutBack)),
      all(label5().opacity(1, 0.3), label5().scale(1, 0.55, easeOutBack)),
    ),
    // Formula types in simultaneously — "what are we solving for?"
    sequence(
      0.18,
      eqA().opacity(1, 0.25),
      eqP().opacity(1, 0.25),
      eqB().opacity(1, 0.25),
      eqEq().opacity(1, 0.25),
      eqQ().opacity(1, 0.25),
    ),
  );
  yield* waitFor(1.2); // hold — total beat ~7–8s

  // ===========================================================================
  // BEAT 3 — Square A (red, 3×3, dots count to 9) (~9s)
  // ===========================================================================
  // SYNC: square-a-pop — unfold red square
  yield* sqA().scale([1, 1], 0.85, easeOutBack);
  // Dots fill in over ~4s, counter ticks up in lock-step (one tick per dot)
  const dotsA = gridA.dotRefs;
  const dotInDur = 0.18;
  const gapA = (4.0 - dotInDur) / dotsA.length;
  yield* counterAText().opacity(1, 0.4);
  yield* sequence(
    gapA,
    ...dotsA.map((d, i) =>
      all(
        d().opacity(1, dotInDur),
        d().scale(1, dotInDur, easeOutBack),
        counterA(i + 1, dotInDur),
      ),
    ),
  );
  yield* waitFor(3.0); // hold — beat ~9s (0.85 + 4 + 3 ≈ 7.85s; pad a touch)
  yield* waitFor(1.15);

  // ===========================================================================
  // BEAT 4 — Square B (blue, 4×4, dots count to 16) (~9s)
  // ===========================================================================
  // SYNC: square-b-pop
  yield* sqB().scale([1, 1], 0.85, easeOutBack);
  const dotsB = gridB.dotRefs;
  const gapB = (4.0 - dotInDur) / dotsB.length;
  yield* counterBText().opacity(1, 0.4);
  yield* sequence(
    gapB,
    ...dotsB.map((d, i) =>
      all(
        d().opacity(1, dotInDur),
        d().scale(1, dotInDur, easeOutBack),
        counterB(i + 1, dotInDur),
      ),
    ),
  );
  yield* waitFor(3.0);
  yield* waitFor(1.15);

  // ===========================================================================
  // BEAT 5 — Values dock under A² / B² (~10s)
  // The equation already typed in during beat 2 — here we fill in the squared
  // values: show 3² / 4² briefly to make the "squaring" step explicit, then
  // morph each into its computed value (9 and 16).
  // ===========================================================================
  yield* waitFor(0.4);

  // 3² appears at the red square (mirroring the in-square counter),
  // then docks under A² and morphs into 9.
  yield* all(
    tok3sq().opacity(1, 0.3),
    counterAText().opacity(0, 0.3),
  );
  yield* all(
    tok3sq().position([EQ_X_A, EQ_DOCK_Y], 1.0, easeInOutCubic),
    tok3sq().fontSize(72, 1.0, easeInOutCubic),
  );
  yield* waitFor(0.5); // emphasize "3 squared"
  // Morph 3² → 9 (cross-fade with a small scale flip)
  yield* all(
    tok3sq().opacity(0, 0.35),
    tok3sq().scale(0.5, 0.35, easeInOutCubic),
    tok9().opacity(1, 0.35),
    tok9().scale(1, 0.4, easeOutBack),
  );

  yield* waitFor(0.3);

  // 4² docks under B² and morphs into 16.
  yield* all(
    tok4sq().opacity(1, 0.3),
    counterBText().opacity(0, 0.3),
  );
  yield* all(
    tok4sq().position([EQ_X_B, EQ_DOCK_Y], 1.0, easeInOutCubic),
    tok4sq().fontSize(72, 1.0, easeInOutCubic),
  );
  yield* waitFor(0.5);
  yield* all(
    tok4sq().opacity(0, 0.35),
    tok4sq().scale(0.5, 0.35, easeInOutCubic),
    tok16().opacity(1, 0.35),
    tok16().scale(1, 0.4, easeOutBack),
  );

  yield* waitFor(1.2); // hold — beat ~10s now (was 8s)

  // ===========================================================================
  // BEAT 6 — Build "9 + 16 = 25"; green square unfolds; 25 lands on it (~12s)
  // ===========================================================================
  // SYNC: sum-collide — reveal "+" between 9 and 16, then "= 25"
  // A tiny lean-in from 9 and 16 toward the "+" sells the connection.
  yield* all(
    tok9().position.x(EQ_X_A + 12, 0.25, easeInOutCubic),
    tok16().position.x(EQ_X_B - 12, 0.25, easeInOutCubic),
    dockPlus().opacity(1, 0.25),
    dockPlus().scale(1, 0.4, easeOutBack),
  );
  yield* all(
    tok9().position.x(EQ_X_A, 0.2, easeOutCubic),
    tok16().position.x(EQ_X_B, 0.2, easeOutCubic),
  );

  yield* waitFor(0.35);

  // "=" types in
  yield* all(
    dockEq().opacity(1, 0.25),
    dockEq().scale(1, 0.4, easeOutBack),
  );

  yield* waitFor(0.25);

  // "25" pops in with a sparkle — the answer to the equation.
  yield* all(
    tok25().opacity(1, 0.25),
    tok25().scale(1, 0.5, easeOutBack),
    sparkle([EQ_X_Q, EQ_DOCK_Y], 10, 80, 0.7),
  );
  // Pop the "?" away — it's been answered
  yield* eqQ().opacity(0, 0.25);

  yield* waitFor(0.8);

  // SYNC: hypotenuse-square — green square unfolds along the hypotenuse
  yield* sqC().scale([1, 1], 1.1, easeOutBack);

  // C dots fill in + counter ticks 0 → 25 in lock-step (mirrors A and B)
  const dotsC = gridC.dotRefs;
  const gapC = (3.5 - dotInDur) / dotsC.length;
  yield* counterCText().opacity(1, 0.4);
  yield* sequence(
    gapC,
    ...dotsC.map((d, i) =>
      all(
        d().opacity(1, dotInDur),
        d().scale(1, dotInDur, easeOutBack),
        counterC(i + 1, dotInDur),
      ),
    ),
  );

  // A duplicate "25" spawns on top of the result and flies onto the green
  // square. The original tok25 in the equation stays put so the full result
  // line "9 + 16 = 25" remains visible.
  yield* all(
    tok25Sq().opacity(1, 0.25),
    tok25Sq().scale(1, 0.25, easeOutBack),
  );
  yield* all(
    counterCText().opacity(0, 0.4),
    tok25Sq().position(SQC_CENTER, 1.0, easeInOutCubic),
    tok25Sq().fontSize(180, 1.0, easeInOutCubic),
    tok25Sq().fill(COLORS.bg, 1.0),
    tok25Sq().stroke(COLORS.ink, 1.0),
  );
  // Small bounce on landing
  yield* tok25Sq().scale(1.15, 0.2, easeOutCubic);
  yield* tok25Sq().scale(1.0, 0.25, easeOutBounce);

  yield* waitFor(2.0);

  // ===========================================================================
  // BEAT 7 — Verify: equation completes, hero title settles (~9s)
  // ===========================================================================
  // Bring back a small ghost of the equation completion: put "C²" where "?" was
  const eqC = createRef<Txt>();
  view.add(
    <Txt
      ref={eqC}
      text="C²"
      fontSize={88}
      fontFamily={FONT}
      fontWeight={900}
      fill={COLORS.hyp}
      position={[EQ_X_Q, EQ_Y]}
      opacity={0}
      scale={0}
    />
  );
  yield* all(
    eqC().opacity(1, 0.3),
    eqC().scale(1, 0.4, easeOutBack),
  );
  yield* waitFor(0.4);

  // Derivation: C² = 25  →  C = 5
  // We don't mark the equation as solved until we've shown WHY.
  yield* all(
    derivCSq().opacity(1, 0.3),
    derivCSq().scale(1, 0.45, easeOutBack),
  );
  yield* waitFor(0.9);

  // Cross-fade C² = 25  →  C = 5 with a small scale flip
  yield* all(
    derivCSq().opacity(0, 0.35),
    derivCSq().scale(0.6, 0.35, easeInOutCubic),
    derivC().opacity(1, 0.35),
    derivC().scale(1, 0.45, easeOutBack),
  );
  yield* waitFor(0.5);

  // Morph the hypotenuse label "C" → "5" with a sparkle on reveal.
  yield* all(
    label5().opacity(0, 0.35),
    label5().scale(0.5, 0.35, easeInOutCubic),
    label5Five().opacity(1, 0.35),
    label5Five().scale(1, 0.45, easeOutBack),
    sparkle([hypOutX, hypOutY], 6, 50, 0.6),
  );
  yield* waitFor(0.5);

  // NOW the equation is proven — ✓ pops to celebrate the solved result.
  yield* all(
    eqCheck().opacity(1, 0.3),
    eqCheck().scale(0, 0),
  );
  yield* eqCheck().scale(1.2, 0.35, easeOutBack);
  yield* eqCheck().scale(1.0, 0.2, easeOutCubic);
  yield* sparkle([EQ_X_Q + 95, EQ_Y], 6, 60, 0.6);

  yield* waitFor(0.4);

  // Fade the derivation out so the hero title has room to land
  yield* all(
    derivC().opacity(0, 0.4),
    derivC().scale(0.85, 0.4, easeInOutCubic),
  );

  // Final gentle breathe on the triangle group + celebratory sparkle
  yield* all(
    triScale(1.04, 0.9, easeInOutCubic),
    sparkle([P1[0], P1[1]], 8, 120, 0.9),
  );
  yield* triScale(1.0, 0.9, easeInOutCubic);

  yield* waitFor(0.8);

  // ===========================================================================
  // OUTRO — Squares fold away, leaving the clean triangle (~2.5s)
  // The proof is done; we "put the scaffolding away" to reveal the theorem's
  // elegant core: just the right triangle with its labelled sides.
  // ===========================================================================
  yield* all(
    // Fold square A closed along its y-axis (accordion reverse)
    sqA().scale([1, 0], 0.65, easeInBack),
    // Fold square B closed the same way
    sqB().scale([1, 0], 0.65, easeInBack),
    // nodeC holds the green square + its dots — shrink to a point
    nodeC().scale(0, 0.65, easeInBack),

    // Dot grids for A and B (gridC disappears with nodeC above)
    gridA.container.opacity(0, 0.35),
    gridB.container.opacity(0, 0.35),

    // Counter labels
    counterAText().opacity(0, 0.3),
    counterBText().opacity(0, 0.3),
    counterCText().opacity(0, 0.3),

    // Dock-row numbers (9 + 16 = 25)
    tok9().opacity(0, 0.3),
    tok16().opacity(0, 0.3),
    dockPlus().opacity(0, 0.3),
    dockEq().opacity(0, 0.3),
    tok25().opacity(0, 0.3),
    tok25Sq().opacity(0, 0.3),
  );

  // Hold on the clean triangle — 3, 4, 5 labels + A² + B² = C² ✓ + title
  yield* waitFor(2.0);
});
