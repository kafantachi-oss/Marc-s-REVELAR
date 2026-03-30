import React, { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion, useSpring, useMotionValue, Variants } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MoonStar,
  Shield,
  Sparkles,
  Waves,
  X,
} from "lucide-react";
import { cn } from "./lib/utils";

const revealLetters = [
  {
    key: "R1",
    letter: "R",
    word: "Reconhecer",
    prompt: "O que em você está pedindo para ser visto, mas vem sendo silenciado?",
    description:
      "O primeiro passo não é mudar. É parar de fugir do que você sente. Reconhecer quebra o transe da repetição e devolve presença ao que estava inconsciente.",
  },
  {
    key: "E1",
    letter: "E",
    word: "Entender",
    prompt: "Que dor antiga continua influenciando as escolhas que você faz hoje?",
    description:
      "Você não sofre apenas pelo que acontece. Sofre pelo significado emocional que seu corpo aprendeu a carregar. Entender revela a origem da dor.",
  },
  {
    key: "V",
    letter: "V",
    word: "Ver a origem",
    prompt: "Qual padrão se repete porque ainda não foi verdadeiramente compreendido?",
    description:
      "Quando a origem é vista, a culpa perde força. Você deixa de se tratar como problema e começa a perceber a lógica emocional por trás da repetição.",
  },
  {
    key: "E2",
    letter: "E",
    word: "Eliminar bloqueios",
    prompt: "O que dentro de você tenta proteger, mas acaba te aprisionando?",
    description:
      "Bloqueios não surgem para destruir você. Eles surgem para defender uma parte ferida. Eliminar bloqueios é transformar defesa em liberdade consciente.",
  },
  {
    key: "L",
    letter: "L",
    word: "Liberar",
    prompt: "O que precisa deixar de ser carregado para que sua vida volte a fluir?",
    description:
      "Liberar não é esquecer. É tirar do corpo o peso de sustentar histórias que já não precisam comandar sua vida.",
  },
  {
    key: "A",
    letter: "A",
    word: "Alinhar",
    prompt: "Como seria viver sem se trair para ser aceito?",
    description:
      "Alinhar é aproximar pensamento, emoção, corpo e verdade. É deixar de se fragmentar para caber no mundo.",
  },
  {
    key: "R2",
    letter: "R",
    word: "Reconstruir",
    prompt: "Quem você se torna quando o padrão deixa de decidir por você?",
    description:
      "A transformação não termina no alívio. Ela amadurece em identidade. Reconstruir é viver a partir de uma nova relação consigo mesmo.",
  },
];

const painPoints = [
  "Você sabe o que precisa fazer, mas trava na hora de agir.",
  "Repete relações, reações e escolhas que já prometeu abandonar.",
  "Se anula para evitar conflitos e depois se sente vazio.",
  "Carrega ansiedade, sobrecarga emocional e uma exaustão difícil de explicar.",
  "Já tentou mudar pela força, mas sempre volta ao mesmo lugar.",
  "Sente que existe algo mais profundo comandando sua vida no silêncio.",
];

const attempts = [
  "Você tentou entender racionalmente o que sente.",
  "Tentou controlar comportamento, rotina e pensamentos.",
  "Tentou ser forte, funcional e seguir em frente.",
  "Tentou se adaptar para não sofrer mais.",
];

const transformation = [
  "Você deixa de viver no automático.",
  "Para de confundir sobrevivência com identidade.",
  "Aprende a se posicionar sem culpa.",
  "Se reconecta com sua verdade interna.",
  "Sente mais leveza, clareza e direção emocional.",
  "Passa a construir a vida com presença, não por reação.",
];

function BackgroundParticles() {
  const particles = useMemo(() => Array.from({ length: 40 }), []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 2 + 1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{ width: size, height: size }}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: -20,
              opacity: Math.random() * 0.4 + 0.1
            }}
            animate={{ 
              y: "110vh",
              opacity: [0, 0.4, 0],
              x: [null, (Math.random() - 0.5) * 100 + "px"] // Slight horizontal drift
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20
            }}
          />
        );
      })}
    </div>
  );
}

function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-md"
      style={{ x, y }}
    />
  );
}

const pillars = [
  {
    icon: MoonStar,
    title: "Profundidade emocional real",
    text: "O método não trabalha apenas no comportamento visível. Ele acessa a raiz emocional que sustenta suas repetições.",
  },
  {
    icon: Shield,
    title: "Segurança para atravessar a dor",
    text: "A transformação acontece com acolhimento, presença e estrutura. Não por confronto vazio nem por promessas superficiais.",
  },
  {
    icon: Waves,
    title: "Integração entre sentir, compreender e viver",
    text: "Não basta entender a dor. É preciso reorganizar a identidade para que sua vida acompanhe a mudança interna.",
  },
];

const faqs = [
  {
    q: "Para quem é a mentoria?",
    a: "Para pessoas que se sentem presas em padrões emocionais repetitivos, sofrem com ansiedade, autossabotagem, bloqueios internos ou relações desgastantes, e sabem que a mudança precisa acontecer na raiz.",
  },
  {
    q: "O método é terapia?",
    a: "A proposta é de mentoria com profundidade emocional. Ela conduz um processo estruturado de reconhecimento, compreensão e transformação de padrões internos, com uma abordagem própria.",
  },
  {
    q: "O que eu posso esperar do processo?",
    a: "Mais clareza sobre o que se repete em sua vida, compreensão da origem emocional desses padrões e uma nova forma de se posicionar, sentir e viver com mais verdade.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

function Container({ children, className = "" }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-10", className)}>{children}</div>;
}

function SectionTitle({ eyebrow, title, text, center = false }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}
    >
      {eyebrow && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-gold backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl font-light leading-[0.98] tracking-[-0.05em] text-white md:text-6xl font-serif">
        {title}
      </h2>
      {text && <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">{text}</p>}
    </motion.div>
  );
}

function SmoothButton({ children, onClick, dark = false }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer",
        dark
          ? "border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.08]"
          : "gold-gradient text-midnight hover:shadow-[0_18px_50px_rgba(215,180,109,0.3)]"
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  );
}

export default function MetodoRevelarPremium() {
  const [openLetter, setOpenLetter] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number>(0);

  const selectedLetter = useMemo(
    () => revealLetters.find((item) => item.key === openLetter) ?? null,
    [openLetter]
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-midnight text-white selection:bg-gold selection:text-midnight font-sans">
      <BackgroundParticles />
      <MouseGlow />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(0,31,84,0.45),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(215,180,109,0.08),transparent_24%),linear-gradient(180deg,var(--color-midnight)_0%,var(--color-deep-blue)_35%,var(--color-midnight)_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:90px_90px]" />
      <div className="fixed left-1/2 top-24 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-royal-blue/25 blur-[120px]" />
      <div className="fixed right-0 top-1/3 -z-10 h-[22rem] w-[22rem] rounded-full bg-gold/10 blur-[120px]" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-midnight/70 backdrop-blur-2xl">
        <Container className="flex items-center justify-between py-4">
            <button
              onClick={() => scrollTo("hero")}
              className="text-sm font-medium uppercase tracking-[0.42em] text-gold transition-opacity hover:opacity-75 cursor-pointer"
            >
              R.E.V.E.L.A.R.
            </button>
            <nav className="hidden items-center gap-7 md:flex">
              <button onClick={() => scrollTo("dor")} className="text-sm text-white/60 transition-colors hover:text-white cursor-pointer">Dor</button>
              <button onClick={() => scrollTo("experiencia")} className="text-sm text-white/60 transition-colors hover:text-white cursor-pointer">Experiência</button>
              <button onClick={() => scrollTo("metodo")} className="text-sm text-white/60 transition-colors hover:text-white cursor-pointer">Método</button>
              <button onClick={() => scrollTo("mentoria")} className="text-sm text-white/60 transition-colors hover:text-white cursor-pointer">Mentoria</button>
            </nav>
          <SmoothButton onClick={() => scrollTo("mentoria")} dark>
            Entrar na mentoria
          </SmoothButton>
        </Container>
      </header>

      <main>
        <section id="hero" className="relative overflow-hidden pt-32 md:pt-40">
          <div className="absolute inset-0 -z-10 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop" 
              alt="Background" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />
          </div>
          <Container>
            <div className="grid items-end gap-14 pb-24 md:grid-cols-[1.12fr_0.88fr] md:pb-32">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl"
              >
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-gold backdrop-blur-xl">
                    <Sparkles className="h-3.5 w-3.5" />
                    método de transformação emocional profunda
                  </div>

                  <div className="mt-7 space-y-5">
                    <p className="text-sm uppercase tracking-[0.42em] text-gold/90">Você não chegou até aqui por acaso</p>
                    <h1 className="max-w-5xl text-5xl font-light leading-[0.92] tracking-[-0.06em] text-white md:text-[7rem] font-serif">
                      Existe algo em você <span className="text-gradient-gold">tentando ser visto.</span>
                    </h1>
                    <p className="max-w-3xl text-lg leading-8 text-white/60 md:text-2xl md:leading-10">
                      E enquanto isso não for revelado, sua vida continua se repetindo em escolhas, reações, relações e dores que parecem sempre voltar ao mesmo lugar.
                    </p>
                  </div>
  
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <SmoothButton onClick={() => scrollTo("experiencia")}>
                      Iniciar minha jornada
                    </SmoothButton>
                    <SmoothButton onClick={() => scrollTo("metodo")} dark>
                      Conhecer o método
                    </SmoothButton>
                  </div>
  
                  <div className="mt-12 grid max-w-3xl gap-4 text-sm text-white/50 md:grid-cols-3">
                    {[
                      "Para quem está cansado de repetir a mesma dor com nomes diferentes.",
                      "Para quem já tentou mudar, mas sente que algo mais profundo assume o controle.",
                      "Para quem quer uma transformação real, e não mais um conteúdo bonito sobre autoconhecimento.",
                    ].map((item) => (
                      <div key={item} className="rounded-3xl border border-white/6 bg-white/[0.03] p-5 backdrop-blur-xl">
                        {item}
                      </div>
                    ))}
                  </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                  <div className="relative overflow-hidden rounded-[2.2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(18,130,162,0.1),rgba(3,64,120,0.05))] p-7 shadow-[0_30px_120px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,180,109,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(15,44,92,0.34),transparent_35%)]" />
                    <div className="relative">
                      <p className="text-xs uppercase tracking-[0.35em] text-gold">Uma nova leitura da sua história</p>
                      <div className="mt-8 space-y-4">
                        {[
                          "Você não está quebrado. Está repetindo o que ainda não foi revelado.",
                          "A dor deixa pistas. O padrão deixa rastros.",
                          "Quando a raiz é vista, a vida para de andar em círculos.",
                        ].map((item, i) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.14, duration: 0.7 }}
                            className="rounded-2xl border border-white/8 bg-deep-blue/40 p-5 backdrop-blur-md"
                          >
                            <p className="text-base leading-8 text-white/90">{item}</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 rounded-[1.6rem] border border-gold/20 bg-midnight/40 p-6">
                        <p className="text-xs uppercase tracking-[0.28em] text-gold">Pergunta central</p>
                        <p className="mt-4 text-2xl font-light leading-[1.3] text-white">
                          O que dentro de você continua comandando sua vida sem ser percebido?
                        </p>
                      </div>
                    </div>
                  </div>
              </motion.div>
            </div>
          </Container>
        </section>

        <section id="dor" className="py-24 md:py-32">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <SectionTitle
                  eyebrow="identificação profunda"
                  title="Talvez você esteja vivendo isso agora"
                  text="O mais difícil é que você tenta mudar. Tenta entender. Tenta seguir em frente. Mas parece que existe uma força silenciosa puxando tudo de volta para o mesmo padrão."
                />

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.14 }}
                  className="mt-12 grid gap-4 md:grid-cols-2"
                >
                  {painPoints.map((item) => (
                    <motion.div
                      key={item}
                      variants={fadeUp}
                      className="rounded-[1.75rem] border border-white/7 bg-white/[0.03] p-6 backdrop-blur-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full gold-gradient text-midnight">
                          <Check className="h-4 w-4" />
                        </div>
                        <p className="text-base leading-8 text-white/80">{item}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1000&auto=format&fit=crop" 
                  alt="Sentimento de dor" 
                  className="h-full w-full object-cover grayscale-[0.3]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
              </motion.div>
            </div>
          </Container>
        </section>

        <section id="experiencia" className="py-24 md:py-32">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="order-2 lg:order-1">
                <SectionTitle
                  eyebrow="quebra de crença"
                  title="O problema não é falta de força"
                  text="Você não está assim porque quer. Existe um padrão emocional inconsciente guiando suas escolhas, sua forma de reagir, o tipo de vínculo que você constrói e até a forma como você se abandona."
                />

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-10 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 backdrop-blur-2xl md:p-10"
                >
                  <p className="text-sm uppercase tracking-[0.28em] text-gold">Você já tentou mudar...</p>
                  <div className="mt-8 space-y-4">
                    {attempts.map((item, idx) => (
                      <div key={item} className="flex items-start gap-5 rounded-2xl border border-white/6 bg-midnight/30 p-4">
                        <div className="text-2xl font-light text-gold">0{idx + 1}</div>
                        <p className="pt-1 text-lg leading-8 text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/10 p-6">
                    <p className="text-xl font-light leading-9 text-white">
                      A mudança não acontece quando você tenta mais. Acontece quando você vê o que nunca viu.
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="order-1 relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/10 lg:order-2"
              >
                <img 
                  src="https://images.unsplash.com/photo-1518196775741-2018596565c9?q=80&w=1000&auto=format&fit=crop" 
                  alt="Reflexão e profundidade" 
                  className="h-full w-full object-cover grayscale-[0.2]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
              </motion.div>
            </div>
          </Container>
        </section>

        <section id="metodo" className="py-24 md:py-32">
          <Container>
            <SectionTitle
              eyebrow="o método como experiência"
              title="R.E.V.E.L.A.R."
              text="Clique em cada letra e entre em uma micro experiência. Em vez de apenas explicar o método, o site convida a pessoa a sentir o que o método faz: revelar o que estava invisível."
              center
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7"
            >
              {revealLetters.map((item) => (
                <motion.button
                  key={item.key}
                  variants={fadeUp}
                  onClick={() => setOpenLetter(item.key)}
                  className="group rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_22px_60px_rgba(0,0,0,0.28)] cursor-pointer"
                >
                  <div className="text-5xl font-light tracking-[-0.05em] text-gold transition-transform duration-300 group-hover:scale-105 font-serif">
                    {item.letter}
                  </div>
                  <div className="mt-6 text-2xl font-light tracking-[-0.03em] text-white md:text-3xl font-serif">
                    {item.word}
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.24em] text-white/50">clique para revelar</div>
                </motion.button>
              ))}
            </motion.div>
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-3xl"
              >
                <p className="text-sm uppercase tracking-[0.32em] text-gold">o que muda quando você entende</p>
                <h3 className="mt-5 text-4xl font-light leading-[1] tracking-[-0.05em] text-white md:text-6xl font-serif">
                  A vida deixa de ser uma repetição inconsciente.
                </h3>
                <p className="mt-7 text-lg leading-8 text-white/70 md:text-xl">
                  Quando a raiz emocional é compreendida, você para de viver apenas reagindo. Começa a escolher, se posicionar e reconstruir a própria história com verdade.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative aspect-square overflow-hidden rounded-[3rem] border border-white/10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop" 
                  alt="Conexão e Mentoria" 
                  className="h-full w-full object-cover grayscale-[0.1]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <SectionTitle
                eyebrow="o que esperar"
                title="A jornada de revelação"
                text="Cada passo do método é desenhado para levar você mais fundo na compreensão de si mesmo, transformando a dor em clareza e a repetição em escolha."
              />
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                className="grid gap-4"
              >
                {transformation.map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    className="rounded-[1.6rem] border border-white/7 bg-white/[0.03] p-5 backdrop-blur-xl"
                  >
                    <p className="text-lg leading-8 text-white/90">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container>
            <SectionTitle
              eyebrow="por que isso se destaca"
              title="Não é mais um método que fala sobre mudança"
              text="É uma experiência guiada de revelação emocional. O site precisa comunicar isso visualmente, narrativamente e sensorialmente."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.14 }}
              className="mt-12 grid gap-5 md:grid-cols-3"
            >
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-7 backdrop-blur-2xl"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mt-6 text-2xl font-light tracking-[-0.03em] text-white font-serif">{item.title}</h4>
                    <p className="mt-4 text-base leading-8 text-white/60">{item.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>

        <section id="criador" className="py-24 md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-6 backdrop-blur-2xl md:p-8"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-gold/15">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                    alt="Marcos Giliberti" 
                    className="h-full w-full object-cover grayscale-[0.2] transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />
                </div>
              </motion.div>

              <div>
                <SectionTitle
                  eyebrow="quem conduz"
                  title="Marcos Giliberti"
                  text="Criador do Método R.E.V.E.L.A.R., conduz pessoas em processos profundos de transformação emocional, ajudando a acessar a raiz dos padrões e construir uma nova forma de viver."
                />
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-8 rounded-[1.8rem] border border-gold/18 bg-gold/6 p-6"
                >
                  <p className="text-2xl font-light leading-10 text-white font-serif">
                    “Você não está quebrado. Apenas sobreviveu com os recursos que tinha. Agora pode escolher viver com mais verdade, presença e direção.”
                  </p>
                </motion.div>
              </div>
            </div>
          </Container>
        </section>

        <section id="mentoria" className="py-24 md:py-32">
          <Container>
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/8 bg-obsidian/40 shadow-[0_40px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
              <div className="absolute inset-0 -z-10 opacity-30">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop" 
                  alt="Mentoria" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
              </div>
              <div className="grid gap-12 p-8 md:p-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold">convite</p>
                  <h3 className="mt-5 max-w-3xl text-4xl font-light leading-[0.98] tracking-[-0.05em] text-white md:text-6xl font-serif">
                    Se você sente que chegou a hora de mudar, esta mentoria foi criada para você.
                  </h3>
                  <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
                    Para quem não quer mais viver em repetição e está pronto para compreender o que se repete dentro de si, transformar a própria história e construir uma nova relação com a vida.
                  </p>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <SmoothButton onClick={() => scrollTo("cta-final")}>
                      Quero participar da mentoria
                    </SmoothButton>
                    <SmoothButton onClick={() => scrollTo("faq")} dark>
                      Tirar dúvidas
                    </SmoothButton>
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    "Processo profundo e estruturado",
                    "Clareza sobre padrões emocionais repetitivos",
                    "Reconstrução de identidade com verdade",
                    "Direção para viver com mais leveza e presença",
                  ].map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-white/8 bg-midnight/40 p-5">
                      <p className="text-lg leading-8 text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="faq" className="py-24 md:py-32">
          <Container>
            <SectionTitle
              eyebrow="dúvidas frequentes"
              title="Perguntas que normalmente surgem antes da decisão"
              text="Quando a conexão emocional acontece, a clareza racional precisa vir logo depois."
            />
            <div className="mt-12 space-y-4">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={item.q}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.03] backdrop-blur-xl"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-7 cursor-pointer"
                    >
                      <span className="text-xl font-light tracking-[-0.02em] text-white font-serif">{item.q}</span>
                      <ChevronDown className={cn("h-5 w-5 shrink-0 text-gold transition-transform", isOpen ? "rotate-180" : "")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-6 pb-6 text-base leading-8 text-white/60 md:px-7">{item.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        <section id="cta-final" className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 metallic-gradient opacity-90" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/12 blur-[140px]" />
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-5xl text-center"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-gold">última chamada</p>
              <h2 className="mt-6 text-5xl font-light leading-[0.95] tracking-[-0.06em] text-white md:text-7xl font-serif">
                O problema não é o que você vive.
              </h2>
              <p className="mt-5 text-2xl font-light leading-10 text-white/90 md:text-3xl font-serif">
                É o que dentro de você continua se repetindo.
              </p>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">
                Quando isso é revelado, a mudança deixa de ser tentativa. Vira direção.
              </p>
              <div className="mt-10 flex justify-center">
                <SmoothButton onClick={() => scrollTo("hero")}>
                  Começar minha transformação
                </SmoothButton>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-midnight">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm font-medium uppercase tracking-[0.42em] text-gold">
            R.E.V.E.L.A.R.
          </div>
          <div className="text-xs text-white/40 tracking-widest">
            © 2026 MÉTODO REVELAR. TODOS OS DIREITOS RESERVADOS.
          </div>
        </Container>
      </footer>

      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-midnight/85 backdrop-blur-xl"
          >
            <div className="flex min-h-full items-center justify-center p-5 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,17,40,0.98),rgba(0,31,84,0.98))] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)] md:p-12"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,180,109,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(15,44,92,0.35),transparent_35%)]" />
                <button
                  onClick={() => setOpenLetter(null)}
                  className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative">
                  <div className="flex items-center gap-5">
                    <div className="text-7xl font-light tracking-[-0.08em] text-gold md:text-8xl font-serif">{selectedLetter.letter}</div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-gold">etapa do método</p>
                      <h3 className="mt-2 text-4xl font-light tracking-[-0.04em] text-white md:text-5xl font-serif">{selectedLetter.word}</h3>
                    </div>
                  </div>

                  <div className="mt-10 grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-[1.7rem] border border-gold/18 bg-gold/6 p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.28em] text-gold">pergunta para sentir</p>
                      <p className="mt-5 text-3xl font-light leading-[1.35] text-white font-serif">{selectedLetter.prompt}</p>
                    </div>
                    <div className="rounded-[1.7rem] border border-white/8 bg-white/[0.03] p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.28em] text-gold">o que isso revela</p>
                      <p className="mt-5 text-lg leading-8 text-white/80">{selectedLetter.description}</p>
                      <button
                        onClick={() => {
                          setOpenLetter(null);
                          setTimeout(() => scrollTo("mentoria"), 100);
                        }}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-gold transition-opacity hover:opacity-75 cursor-pointer"
                      >
                        continuar para a mentoria
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
