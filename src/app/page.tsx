import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconKey } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Marquee } from "@/components/sections/Marquee";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyProjects } from "@/components/projects/EmptyProjects";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { principles, services } from "@/content/services";
import { focusPages } from "@/content/focus-pages";
import { featuredProjects, projects } from "@/content/projects";
import { blogPosts } from "@/content/blog";
import { buildMetadata, serviceListJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

const homeTitle = `${siteConfig.name} | Digital Marketing & Shopify Agency in India`;

export const metadata: Metadata = {
  ...buildMetadata({
    title: homeTitle,
    description: siteConfig.description,
    path: "/",
    keywords: ["digital marketing agency", "Shopify agency India", "Meta Ads management"],
  }),
  // `absolute` skips the "| DOCS MEDIA" suffix from the root title template.
  title: { absolute: homeTitle },
};

/** One icon per principle, in the same order as `principles`. */
const principleIcons: IconKey[] = ["ads", "search", "web", "check"];

export default function HomePage() {
  const featured = featuredProjects(3);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <>
      <JsonLd data={serviceListJsonLd(services)} />

      {/* ------------------------------- Hero ------------------------------- */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-brand-700 text-white"
      >
        {/* Studio photo: full-bleed (dimmed, cropped away from its own logo) on mobile; on
            desktop it fills the right side and fades into the brand purple on the left. */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[70%]">
          <Image
            src="/hero-studio.jpg"
            alt="DOCS MEDIA studio wall with the illuminated logo on a purple backdrop"
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover object-[88%_center] lg:object-[20%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 max-lg:bg-brand-950/85 lg:bg-gradient-to-r lg:from-brand-700 lg:via-brand-700/50 lg:via-25% lg:to-transparent lg:to-50%"
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] animate-aurora rounded-full bg-brand-500/60 blur-[110px]" />
          <div className="absolute -bottom-52 -left-32 h-[30rem] w-[30rem] animate-aurora rounded-full bg-fuchsia-600/35 blur-[120px] [animation-delay:-6s]" />
          <div className="absolute left-1/3 top-1/4 h-72 w-72 animate-aurora rounded-full bg-brand-400/25 blur-[100px] [animation-delay:-11s]" />
          <div className="bg-dots absolute inset-0" />
          <div className="absolute -bottom-20 -left-10 hidden h-[34rem] w-[23rem] -rotate-12 bg-[url('/logo-mark.png')] bg-contain bg-no-repeat opacity-[0.07] lg:block" />
        </div>

        <Container className="relative grid items-center py-16 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-fuchsia-300" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-300" />
              </span>
              {siteConfig.tagline}
            </p>
            <h1
              id="hero-title"
              className="rise rise-1 mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              Digital marketing that gets your brand{" "}
              <span className="text-gradient">noticed and remembered.</span>
            </h1>
            <p className="rise rise-2 mt-7 max-w-xl text-lg leading-relaxed text-brand-100 sm:text-xl">
              DOCS MEDIA helps Indian businesses grow online with Meta Ads, social
              media marketing, SEO, creative content, website development and
              Shopify stores built to turn visitors into enquiries and orders.
            </p>
            <div className="rise rise-3 mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={whatsappLink(
                  "Hi DOCS MEDIA, I'd like to discuss digital marketing for my business.",
                )}
                external
                variant="light"
                size="lg"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                Start on WhatsApp
              </ButtonLink>
              <ButtonLink href="/services" variant="outline-light" size="lg">
                Explore our services
                <Icon name="arrow-right" className="h-4 w-4" />
              </ButtonLink>
            </div>
            <ul className="rise rise-4 mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-200">
              {["Clear goals", "Honest expectations", "Regular reporting"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-fuchsia-300" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-900/40 to-transparent"
        />
      </section>

      <Marquee items={services.map((s) => s.title)} />

      {/* ----------------------------- Services ----------------------------- */}
      <Section labelledBy="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Digital marketing, website and Shopify services for Indian brands"
          description="From Meta Ads and SEO to website development and Shopify stores, work with us on a single service or combine several into one joined-up plan. Looking for personal branding or our creative studio? Scroll on."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((service) => !service.href)
            .map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------- Personal branding & creative studio ------------------- */}
      <Section tone="lavender" id="brand-and-studio" labelledBy="spotlight-title">
        <SectionHeading
          id="spotlight-title"
          eyebrow="Personal branding & creative studio"
          title="Build a brand people remember, and the content to show it"
          description="Two specialist services for founders, creators and growing brands: a personal branding plan and an in-house creative studio for reels, photography, ads and design."
        />
        <ul className="grid auto-rows-fr gap-6 lg:grid-cols-2">
          {focusPages.map((page) => (
            <li key={page.slug}>
              <article className="reveal relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 p-8 text-white shadow-glow sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/30 blur-3xl"
                />
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                  <Icon name={page.icon} className="h-7 w-7" />
                </span>
                <h3 className="relative mt-6 font-display text-2xl font-extrabold sm:text-3xl">
                  {page.name}
                </h3>
                <p className="relative mt-3 min-h-[6.5rem] text-lg leading-relaxed text-brand-100">
                  {page.blurb}
                </p>
                <ul className="relative mt-6 grid flex-1 content-start gap-x-6 gap-y-3 sm:grid-cols-2">
                  {page.offerings.slice(0, 4).map((o) => (
                    <li key={o.title} className="flex items-start gap-2.5 text-brand-100">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-fuchsia-300" />
                      {o.title}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={page.path} variant="light">
                    Explore {page.name.toLowerCase()}
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href={whatsappLink(page.whatsappMessage)} external variant="outline-light">
                    <Icon name="whatsapp" className="h-4 w-4" />
                    Ask on WhatsApp
                  </ButtonLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {/* ----------------------------- Principles ---------------------------- */}
      <Section labelledBy="why-title">
        <SectionHeading
          id="why-title"
          eyebrow="How we work"
          title="A practical, no-fluff approach"
          description="Clear goals, honest expectations and regular reporting, so you always know where your marketing stands."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="reveal group rounded-3xl border border-brand-200 bg-surface p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-fuchsia-500 text-white shadow-lift">
                <Icon name={principleIcons[i % principleIcons.length]} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------ Process ------------------------------ */}
      <Section tone="dark" labelledBy="process-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-brand-600/30 blur-[110px]" />
        <SectionHeading
          id="process-title"
          invert
          eyebrow="Our process"
          title="From first chat to measurable progress"
          description="Four simple stages keep every project focused and transparent."
        />
        <ProcessSteps invert />
      </Section>

      {/* ------------------------------- Work -------------------------------- */}
      <Section labelledBy="work-title">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="work-title"
            eyebrow="Projects"
            title="Selected work"
            description={
              projects.length
                ? "A look at recent projects and the thinking behind them."
                : undefined
            }
          />
          {projects.length > 0 && (
            <ButtonLink href="/projects" variant="secondary" className="mb-10 self-start sm:mb-14">
              All projects
              <Icon name="arrow-right" className="h-4 w-4" />
            </ButtonLink>
          )}
        </div>
        {featured.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <li key={project.slug} className="relative">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyProjects compact />
        )}
      </Section>

      {/* -------------------------------- Blog ------------------------------- */}
      <Section tone="lavender" labelledBy="blog-title">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="blog-title"
            eyebrow="Insights"
            title="Latest from the blog"
            description="Practical marketing guidance you can put to work."
          />
          <ButtonLink href="/blog" variant="secondary" className="mb-10 self-start sm:mb-14">
            All articles
            <Icon name="arrow-right" className="h-4 w-4" />
          </ButtonLink>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner whatsappMessage="Hi DOCS MEDIA, I visited your website and I'd like to discuss my project." />
    </>
  );
}
