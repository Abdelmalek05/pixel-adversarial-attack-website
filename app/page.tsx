import { Sidebar } from "@/components/sidebar";
import { Section, P, Lead, FigureBlock } from "@/components/section";
import { Figure } from "@/components/figure";
import { Stat } from "@/components/stat";
import { ImageSwapper } from "@/components/image-swapper";
import { FgsmAggregateChart } from "@/components/charts/fgsm-aggregate-chart";
import { PatchSweepChart } from "@/components/charts/patch-sweep-chart";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 lg:ml-72">
        <div className="container-doc">
          {/* HERO */}
          <header id="overview" className="pt-24 pb-12 md:pt-32 md:pb-16 scroll-mt-0">
            <div className="small-caps text-xs mb-6" style={{ color: "rgb(var(--accent))" }}>
              ENSIA · Computer and Network Security · May 2026
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-8">
              Adversarial Attacks on a{" "}
              <span className="italic" style={{ color: "rgb(var(--accent))" }}>
                YOLOv8
              </span>{" "}
              Aircraft Detector
            </h1>
            <Lead>
              A study of white-box and black-box attacks on aerial imagery — and a sharp
              threshold that tells defenders exactly what to look for.
            </Lead>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-16">
              <Stat
                value="85.7%"
                label="Suppression rate"
                sublabel="white-box, ε=0.10"
                warm
              />
              <Stat
                value="0.500%"
                label="Image area"
                sublabel="black-box patches"
              />
              <Stat
                value="16×16"
                label="Threshold"
                sublabel="patch-size phase transition"
                warm
              />
              <Stat
                value="10³–10⁴×"
                label="Cost asymmetry"
                sublabel="black-box vs white-box"
              />
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-3xl">
              <a
                href="#fgsm"
                className="group block p-5 border transition-all hover:bg-[rgb(var(--surface-elev))]"
                style={{ borderColor: "rgb(var(--rule))" }}
              >
                <div className="small-caps text-[10px] mb-2" style={{ color: "rgb(var(--fg-muted))" }}>
                  Read first →
                </div>
                <div className="font-display text-lg">The white-box attack</div>
                <div className="text-sm" style={{ color: "rgb(var(--fg-muted))" }}>
                  How invisible noise blinds the detector.
                </div>
              </a>
              <a
                href="#threshold"
                className="group block p-5 border transition-all hover:bg-[rgb(var(--surface-elev))]"
                style={{ borderColor: "rgb(var(--rule))" }}
              >
                <div className="small-caps text-[10px] mb-2" style={{ color: "rgb(var(--accent-warm))" }}>
                  Most original →
                </div>
                <div className="font-display text-lg">The patch-size threshold</div>
                <div className="text-sm" style={{ color: "rgb(var(--fg-muted))" }}>
                  Why the boundary sits sharply at 16 pixels.
                </div>
              </a>
            </div>
          </header>

          {/* BACKGROUND */}
          <Section id="background" number="01" title="Background">
            <Lead>
              An adversarial example is a small, deliberate change to an input that makes a model
              give a different answer.
            </Lead>
            <P>
              Formally, given a clean input <em className="font-display">x</em> and a model{" "}
              <em className="font-display">f</em>, the attacker looks for a perturbation{" "}
              <em className="font-display">δ</em> small enough that{" "}
              <span className="font-mono text-sm">‖δ‖ ≤ ε</span> and yet{" "}
              <span className="font-mono text-sm">f(x + δ) ≠ f(x)</span>. The notion of
              &ldquo;small&rdquo; depends on the distance metric.
            </P>
            <P>
              <strong>L<sub>∞</sub></strong> bounds the largest per-pixel change: every pixel
              moves by a tiny amount, but no pixel moves more. This is the budget used by FGSM,
              our white-box attack.{" "}
              <strong>L<sub>0</sub></strong> bounds the number of pixels changed: only a few
              pixels move, but each can change by anything. This is the budget used by patch
              attacks — our black-box approach. Both can defeat the same model. They look
              completely different.
            </P>
            <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-2xl">
              <div className="p-5 border" style={{ borderColor: "rgb(var(--rule))" }}>
                <div className="small-caps text-[10px] mb-2 accent-text">
                  L<sub>∞</sub> · FGSM
                </div>
                <div className="font-display text-base mb-1">Every pixel, a little</div>
                <div className="text-sm" style={{ color: "rgb(var(--fg-muted))" }}>
                  Single-step gradient ascent. One forward + one backward pass.
                </div>
              </div>
              <div className="p-5 border" style={{ borderColor: "rgb(var(--rule))" }}>
                <div className="small-caps text-[10px] mb-2 warm-text">
                  L<sub>0</sub> · DE patches
                </div>
                <div className="font-display text-base mb-1">A few pixels, a lot</div>
                <div className="text-sm" style={{ color: "rgb(var(--fg-muted))" }}>
                  Population-based search over patch positions and colours.
                </div>
              </div>
            </div>
          </Section>

          {/* SETUP */}
          <Section id="setup" number="02" title="Setup & Baseline">
            <P>
              Our target is a YOLOv8 detector fine-tuned on aerial imagery with twenty
              aircraft classes (<span className="font-mono text-sm">A1–A20</span>; the original
              dataset uses anonymous labels and we keep them). The fine-tuned weights live in{" "}
              <span className="font-mono text-sm">best.pt</span> and are treated as a fixed
              target throughout the experiments.
            </P>
            <P>
              The test set contains seven 640×640 aerial images,{" "}
              <span className="font-mono text-sm">test2</span> through{" "}
              <span className="font-mono text-sm">test8</span>. They span a real range of
              difficulty — from a single clean detection at 0.49 confidence to five strong
              detections at 0.96.
            </P>

            <FigureBlock
              number="1"
              caption="Baseline YOLOv8 detections on the seven test images. Boxes are coloured by predicted class. The number above each panel reports the detection count, the top class, and the top confidence."
            >
              <Figure src="/figures/01_baseline_grid.png" alt="Baseline detections" />
            </FigureBlock>

            <P>
              Three things to note from the baseline. <span className="font-mono text-sm">test2</span> is
              the weakest case — four boxes hovering near the threshold.{" "}
              <span className="font-mono text-sm">test3</span> is the cleanest — a single
              high-confidence detection used as our case study image.{" "}
              <span className="font-mono text-sm">test7</span> is the strongest — five very
              confident detections of the same class. This range matters: it lets us see
              whether attacks behave differently against weak and strong baselines.
            </P>
          </Section>

          {/* FGSM */}
          <Section id="fgsm" number="03" title="White-Box: FGSM">
            <Lead>
              The simplest white-box attack. One step of gradient ascent. Every pixel changes by
              exactly ± <span className="not-italic font-mono">ε</span>. And it works.
            </Lead>
            <P>
              FGSM (Goodfellow et al., 2014) is a one-step attack: the adversarial image is{" "}
              <span className="font-mono text-sm">
                x′ = x + ε · sign(∇<sub>x</sub>L(θ, x, y))
              </span>
              . Because YOLO doesn&apos;t produce a single scalar loss at inference, we use a
              surrogate — the squared L<sub>2</sub> norm of all detection output tensors. Pushing
              this surrogate up disrupts the detection head&apos;s activations.
            </P>
            <P>
              We swept ε across <span className="font-mono">{"{0.0, 0.01, 0.03, 0.05, 0.10}"}</span>{" "}
              on all seven images — 35 attacks. For each one we recorded the surviving
              detections, the maximum and mean confidence, the retention rate, and a flag for
              full suppression.
            </P>

            <FigureBlock
              number="2"
              caption="FGSM aggregate impact across the seven test images. Switch tabs to compare detection count, mean max-confidence, and full-suppression rate."
            >
              <FgsmAggregateChart />
            </FigureBlock>

            <P>
              The headline is on the suppression-rate tab: at{" "}
              <span className="warm-text font-medium">ε = 0.10, 85.7% of images are fully
              blank</span>. Six of seven end with zero detections. The mean max-confidence drops
              from 0.84 on clean inputs to 0.28 at ε = 0.10. Mean retention drops to 0.05. The
              attack works.
            </P>
            <P>
              The detection-count tab hides a subtlety: at ε = 0.01 the count{" "}
              <em>rises</em>. That&apos;s not a bug. The activation-amplification surrogate
              inflates the detection head broadly, which spawns spurious low-confidence boxes.
              At ε = 0.01, <span className="font-mono">test3</span> jumps from 1 to 5 detections,{" "}
              <span className="font-mono">test5</span> from 4 to 7,{" "}
              <span className="font-mono">test8</span> from 3 to 6. By ε = 0.05 everything has
              collapsed. Lesson: count alone is misleading at small ε.
            </P>

            <FigureBlock
              number="3"
              caption="The same image at five ε values — switch between them. Aircraft visibly survive even at ε = 0.05, where the model has already lost confidence."
            >
              <ImageSwapper
                variants={[
                  {
                    label: "test3 — ε sweep",
                    src: "/figures/02_fgsm_perturbation_test3.png",
                    caption:
                      "Top row: clean reference. Middle: adversarial image at five ε values. Bottom: noise amplified ×10.",
                  },
                  {
                    label: "test4 — strip",
                    src: "/figures/02_fgsm_strip_test4.png",
                    caption:
                      "test4 across all five ε values. At ε = 0.01 the count jumps to four — spurious boxes from the surrogate.",
                  },
                  {
                    label: "test2 — strip",
                    src: "/figures/02_fgsm_strip_test2.png",
                  },
                  {
                    label: "test5 — strip",
                    src: "/figures/02_fgsm_strip_test5.png",
                  },
                ]}
              />
            </FigureBlock>

            <P>
              The retention heatmap below tells the per-image story. Two images stand out:{" "}
              <span className="font-mono">test6</span> falls at the smallest ε we tested — its
              baseline confidence (0.71) was the lowest among multi-detection images.{" "}
              <span className="font-mono">test8</span> is the most resistant, holding one
              detection even at ε = 0.10. The pattern is clear:{" "}
              <em>clean-image confidence margin predicts adversarial fragility</em>.
            </P>

            <FigureBlock
              number="4"
              caption="Per-image FGSM retention rate. Green cells: attack succeeded. Red cells (>1.0): attack created extra spurious boxes."
            >
              <Figure src="/figures/02_fgsm_retention_heatmap.png" alt="FGSM retention heatmap" />
            </FigureBlock>
          </Section>

          {/* BLACK-BOX */}
          <Section id="blackbox" number="04" title="Black-Box: DE Patches">
            <Lead>
              The harder problem. No gradients, no weights — only an API. Eight patches, half a
              percent of the image. Fully successful.
            </Lead>
            <P>
              In the black-box setting the attacker has no internal access. They send images,
              they read detections back. Random pixel search is hopeless: 256³ ≈ 1.7×10⁷ colour
              choices per pixel, 10²⁰⁰ configurations for a few dozen pixels, and YOLO&apos;s
              first conv layer smooths single-pixel noise away anyway.
            </P>
            <P>
              We fix this with two moves. First, replace random search with{" "}
              <strong>Differential Evolution</strong> (Storn &amp; Price, 1997) — a
              population-based optimiser that does not need gradients. Second, use{" "}
              <strong>coloured square patches</strong> instead of single pixels: a 16×16 patch
              produces a coherent low-frequency signal that survives YOLO&apos;s pooling.
            </P>
            <P>
              Each patch is 5 numbers: top-left{" "}
              <span className="font-mono text-sm">(x, y)</span> and colour{" "}
              <span className="font-mono text-sm">(r, g, b)</span>. With 8 patches the search
              vector is 40-dimensional. The total perturbation area is 0.500% of the image.
            </P>

            <div className="my-8 overflow-x-auto">
              <table className="w-full text-sm font-mono" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgb(var(--fg))" }}>
                    <th className="text-left py-3 small-caps text-[10px] font-mono">Image</th>
                    <th className="text-left py-3 small-caps text-[10px] font-mono">Attack</th>
                    <th className="text-right py-3 small-caps text-[10px] font-mono">Base n</th>
                    <th className="text-right py-3 small-caps text-[10px] font-mono">Adv n</th>
                    <th className="text-right py-3 small-caps text-[10px] font-mono">Top conf</th>
                    <th className="text-right py-3 small-caps text-[10px] font-mono">Adv conf</th>
                    <th className="text-right py-3 small-caps text-[10px] font-mono">Queries</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["test2", "Conf. reduction", 4, 0, 0.493, 0.0, "2,048"],
                    ["test2", "Suppression", 4, 0, 0.493, 0.0, "4,096"],
                    ["test4", "Conf. reduction", 2, 1, 0.951, 0.251, "1,024"],
                    ["test4", "Suppression", 2, 0, 0.951, 0.0, "3,584"],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: "1px solid rgb(var(--rule))" }}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`py-3 ${j === 0 || j === 1 ? "text-left" : "text-right"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 text-xs" style={{ color: "rgb(var(--fg-muted))" }}>
                <span className="small-caps mr-2 accent-text">Table 1</span>
                Black-box DE patch attack results at 16×16 patches. All four attacks meet their
                strict success criterion.
              </div>
            </div>

            <FigureBlock
              number="5"
              caption="DE was given no information about where the aircraft are — yet it learned to place patches near them. The fitness curve is flat for five generations, then jumps to −100 when a winning configuration is found."
            >
              <Figure src="/figures/03_blackbox_a2_suppression_test2.png" alt="DE attack detail" />
            </FigureBlock>

            <FigureBlock
              number="6"
              caption="Both attacks on both images. Top: clean baseline. Middle: confidence-reduction attack. Bottom: full suppression. Eight patches over 0.500% of the image are enough."
            >
              <Figure src="/figures/03_blackbox_comparison_grid.png" alt="DE attack grid" />
            </FigureBlock>
          </Section>

          {/* PATCH-SIZE THRESHOLD */}
          <Section id="threshold" number="05" title="The Patch-Size Threshold">
            <Lead>
              The most original finding. Below 16 pixels the model is safe. Above, it isn&apos;t.
              The transition is sharp, not gradual.
            </Lead>
            <P>
              Why 16×16 patches in the main experiment? Because we ran a sweep first. Same
              budget, same images, same number of patches — only the side length varied, from
              8 to 24 pixels.
            </P>

            <FigureBlock
              number="7"
              caption="Patch-size sweep. Hover bars for query budgets and exact fitness. The phase transition between fail (red) and success (green) sits sharply at 16."
            >
              <PatchSweepChart />
            </FigureBlock>

            <P>Three observations matter.</P>
            <div className="space-y-5 mt-6">
              <div className="pl-6 border-l-2" style={{ borderColor: "rgb(var(--accent))" }}>
                <div className="small-caps text-[10px] mb-1 accent-text">01 — Sharpness</div>
                <P>
                  At <span className="font-mono">k = 12</span> the optimiser plateaus around 0.27
                  even with the full DE budget. At <span className="font-mono">k = 16</span> both
                  attacks break through within a few generations. Not a slope — a step.
                </P>
              </div>
              <div className="pl-6 border-l-2" style={{ borderColor: "rgb(var(--accent))" }}>
                <div className="small-caps text-[10px] mb-1 accent-text">02 — Same threshold for both attacks</div>
                <P>
                  Confidence reduction and suppression are different objectives. Both fail at
                  <span className="font-mono"> k = 12</span>, both succeed at{" "}
                  <span className="font-mono">k = 16</span>. The threshold is a property of the{" "}
                  <em>model</em>, not the attack.
                </P>
              </div>
              <div className="pl-6 border-l-2" style={{ borderColor: "rgb(var(--accent-warm))" }}>
                <div className="small-caps text-[10px] mb-1 warm-text">03 — Patch size, not query budget</div>
                <P>
                  At <span className="font-mono">k = 8</span>, DE consumed 8,192 queries and
                  failed. At <span className="font-mono">k = 16</span>, DE crossed the threshold
                  in 2,048 queries — one quarter as many — and stopped early.{" "}
                  <em>The bottleneck is in the encoding, not the search.</em>
                </P>
              </div>
            </div>

            <div className="mt-12 p-6 border-l-4" style={{
              borderColor: "rgb(var(--accent-warm))",
              background: "rgb(var(--surface-elev))",
            }}>
              <div className="small-caps text-[10px] mb-2 warm-text">Defender&apos;s takeaway</div>
              <p className="pull-quote">
                Any input filter that flags rectangles bigger than ~0.3% of the image area will
                block this entire family of attacks — regardless of how clever the attacker&apos;s
                optimiser.
              </p>
            </div>
          </Section>

          {/* COMPARISON */}
          <Section id="comparison" number="06" title="Comparison">
            <P>The two attacks defeat the same model in very different ways.</P>

            <div className="my-8 overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgb(var(--fg))" }}>
                    <th></th>
                    <th className="text-left py-3 px-4 small-caps text-[10px] font-mono">
                      FGSM (white-box)
                    </th>
                    <th className="text-left py-3 px-4 small-caps text-[10px] font-mono">
                      DE patches (black-box)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Knowledge", "Full model + gradients", "Query-only"],
                    ["Budget", "Every pixel, ≤ ε", "0.500% pixels, any colour"],
                    ["Visibility", "Almost imperceptible", "Patches clearly visible"],
                    ["Cost / attack", "1 fwd + 1 bwd pass", "~1,000–4,000 queries"],
                    ["Time / attack", "Fraction of a second", "~1 minute on GPU"],
                    ["Success", "85.7% suppression", "4 / 4 tested cases"],
                    ["Defence", "Adversarial training", "Patch detection / filtering"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgb(var(--rule))" }}>
                      <td
                        className="text-left py-3 pr-4 small-caps text-[10px]"
                        style={{ color: "rgb(var(--fg-muted))" }}
                      >
                        {row[0]}
                      </td>
                      <td className="py-3 px-4">{row[1]}</td>
                      <td className="py-3 px-4">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <P>
              The asymmetry that matters most is <strong>cost</strong>. Black-box is roughly
              three orders of magnitude more expensive than white-box in queries, four in
              wall-clock time. <em>That&apos;s the protective value of restricting attacker
              knowledge.</em> A model behind a query-only API is meaningfully harder to attack
              than one whose weights have been distributed.
            </P>
            <P>
              The asymmetry that matters next is <strong>visibility</strong>. FGSM can be
              defended only at the model level — adversarial training, smoothing. Patches can be
              defended at the input level — simple image-statistics filters can flag rectangular
              saturated regions. Different attacks, different countermeasures.
            </P>
          </Section>

          {/* DISCUSSION */}
          <Section id="discussion" number="07" title="Discussion">
            <Lead>
              The model is fragile in both threat models. Imperceptible noise reaches 85.7%
              suppression. Visible patches over 0.500% of the image reach 100% on every tested
              case.
            </Lead>

            <h3 className="font-display text-2xl mt-12 mb-4">The threshold is the most useful number</h3>
            <P>
              If we had to hand a defender a single number, it wouldn&apos;t be the suppression
              rate — they already suspected the attacker wins. It would be the patch-size
              threshold. That tells them <em>exactly</em> what to constrain: anything below
              0.3% of the image is fine, anything bigger is suspicious.
            </P>

            <h3 className="font-display text-2xl mt-12 mb-4">Why count alone is misleading</h3>
            <P>
              At ε = 0.01, FGSM <em>increases</em> the detection count on five of seven test
              images because its surrogate loss inflates the detection head broadly. Anyone
              reporting only count would call small-ε FGSM a failure. It is not. Mean
              max-confidence and full-suppression rate, both monotone in ε, give the honest
              picture. We recommend reporting both.
            </P>

            <h3 className="font-display text-2xl mt-12 mb-4">For deployment</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-5 border-t-2" style={{ borderColor: "rgb(var(--accent))" }}>
                <div className="small-caps text-[10px] mb-2 accent-text">Action 1</div>
                <div className="font-display text-lg mb-2">Don&apos;t share the weights</div>
                <p className="text-sm leading-relaxed">
                  White-box attack cost is essentially zero. Removing this option raises the
                  attacker&apos;s cost by 10³–10⁴×. Highest-impact thing you can do.
                </p>
              </div>
              <div className="p-5 border-t-2" style={{ borderColor: "rgb(var(--accent-warm))" }}>
                <div className="small-caps text-[10px] mb-2 warm-text">Action 2</div>
                <div className="font-display text-lg mb-2">Filter big rectangles</div>
                <p className="text-sm leading-relaxed">
                  Reject any image with large saturated rectangular regions. The patch-size
                  threshold gives a clear specification for &ldquo;large&rdquo;.
                </p>
              </div>
            </div>

            <h3 className="font-display text-2xl mt-12 mb-4">Limitations</h3>
            <ul className="space-y-3 list-none">
              {[
                ["Test-set size", "Seven images. Enough to demonstrate the phenomena, not enough for tight intervals."],
                ["Black-box scope", "Two images in the main experiment. Picked to span the difficulty range, but a full seven-image evaluation would be tighter."],
                ["FGSM is single-step", "PGD and AutoAttack are stronger at higher cost. Our axis was white-box vs black-box, not single-step vs iterative."],
                ["No physical robustness", "Digital domain only. JPEG, lighting, viewpoint changes all degrade adversarial perturbations. EoT-hardened patches are out of scope."],
              ].map(([title, body], i) => (
                <li key={i} className="flex gap-4 leading-relaxed">
                  <span
                    className="flex-shrink-0 small-caps text-[10px] font-mono pt-1"
                    style={{ color: "rgb(var(--fg-muted))" }}
                  >
                    0{i + 1}
                  </span>
                  <span>
                    <strong>{title}.</strong> {body}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* TEAM */}
          <Section id="team" number="08" title="Team & Resources">
            <P>
              This work was completed for the Computer and Network Security course at the
              National School of Artificial Intelligence (ENSIA), Algiers, in May 2026.
            </P>

            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {[
                { label: "Full report", sub: "PDF, 17 pages", href: "https://github.com/Abdelmalek05/pixel-adversarial-attack/blob/main/c2-report.pdf" },
                { label: "Source code", sub: "GitHub repository", href: "https://github.com/Abdelmalek05/pixel-adversarial-attack/" },
                { label: "Video walkthrough", sub: "YouTube, 15 min", href: "https://www.youtube.com/watch?v=T29U-XmXlks" },
              ].map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 border transition-all hover:bg-[rgb(var(--surface-elev))]"
                  style={{ borderColor: "rgb(var(--rule))" }}
                >
                  <div className="font-display text-lg mb-1">{r.label}</div>
                  <div className="text-xs" style={{ color: "rgb(var(--fg-muted))" }}>
                    {r.sub} →
                  </div>
                </a>
              ))}
            </div>

            <h3 className="font-display text-xl mt-16 mb-4">References</h3>
            <ol className="space-y-3 text-sm leading-relaxed list-decimal pl-6" style={{ color: "rgb(var(--fg-muted))" }}>
              <li>
                Szegedy, C., et al. (2013).{" "}
                <em>Intriguing properties of neural networks</em>. arXiv:1312.6199.
              </li>
              <li>
                Goodfellow, I., Shlens, J., &amp; Szegedy, C. (2014).{" "}
                <em>Explaining and harnessing adversarial examples</em>. ICLR 2015.
              </li>
              <li>
                Su, J., Vargas, D. V., &amp; Sakurai, K. (2019).{" "}
                <em>One pixel attack for fooling deep neural networks</em>. IEEE Trans.
                Evolutionary Computation, 23(5), 828–841.
              </li>
              <li>
                Storn, R., &amp; Price, K. (1997).{" "}
                <em>Differential evolution — a simple and efficient heuristic for global
                optimization</em>. J. Global Optimization, 11(4), 341–359.
              </li>
              <li>
                Jocher, G., Chaurasia, A., &amp; Qiu, J. (2023).{" "}
                <em>Ultralytics YOLOv8</em>. github.com/ultralytics/ultralytics.
              </li>
            </ol>
          </Section>

          {/* FOOTER */}
          <footer className="py-16 mt-16 border-t rule-line">
            <div className="flex flex-col md:flex-row justify-between gap-6 text-sm" style={{ color: "rgb(var(--fg-muted))" }}>
              <div>
                <div className="font-display italic mb-1">
                  Adversarial Attacks on a YOLOv8 Aircraft Detector
                </div>
                <div className="text-xs">ENSIA · Computer and Network Security · May 2026</div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
