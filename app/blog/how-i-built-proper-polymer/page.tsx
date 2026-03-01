import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Built an E-Commerce Website with Zero Coding Experience — Here's How",
  description:
    "The side business was always the plan. The website was always the excuse. Claude helped me run out of excuses.",
  alternates: {
    canonical: "/blog/how-i-built-proper-polymer",
  },
  openGraph: {
    title:
      "I Built an E-Commerce Website with Zero Coding Experience — Here's How",
    description:
      "The side business was always the plan. The website was always the excuse. Claude helped me run out of excuses.",
    url: "/blog/how-i-built-proper-polymer",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "I Built an E-Commerce Website with Zero Coding Experience — Here's How",
    description:
      "The side business was always the plan. The website was always the excuse. Claude helped me run out of excuses.",
  },
};

export default function HowIBuiltProperPolymer() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            nav.sticky { display: none !important; }
            footer { display: none !important; }
          `,
        }}
      />

      <article className="mx-auto max-w-[680px] px-6 py-16 sm:py-24">
        {/* Logo / Wordmark */}
        <div className="mb-16 flex items-center gap-3 opacity-60">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-mono text-xs font-bold text-white">
            PP
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-foreground">
              Proper Polymer
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-muted">
              Precision Engineered. Trail Tested.
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          I Built an E-Commerce Website with Zero Coding Experience
          &mdash;&nbsp;Here&rsquo;s How
        </h1>

        {/* Subtitle */}
        <p className="mb-14 text-lg text-muted sm:text-xl sm:leading-relaxed">
          The side business was always the plan. The website was always the
          excuse. Claude helped me run out of excuses.
        </p>

        {/* Article body */}
        <div className="space-y-10 text-[15px] leading-[1.8] text-[#b0b0b0] sm:text-base sm:leading-[1.85]">
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
              The Idea
            </h2>
            <p>
              For years I had a version of this idea floating around in my head.
              I design and 3D print custom accessories for my Toyota Tacoma:
              brackets, panels, organizers, things that solve real problems I ran
              into on the trail or in the garage. People would see them and ask
              how to get one. Friends would ask if I could print them a copy. The
              thought of turning it into something real, a store, an actual
              product line, kept coming back.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
              The Barrier
            </h2>
            <p>
              Building a website felt like a different discipline entirely.
              I&rsquo;m an engineer. I understand materials, tolerances, load
              paths. I don&rsquo;t understand JavaScript. The learning curve felt
              steep and the time investment felt impossible to justify alongside
              a full time job and a family. So the idea stayed an idea, for
              years.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
              A Different Kind of Fun
            </h2>
            <p>
              Then I started talking to Claude. What followed was one of the most
              unexpectedly fun projects I&rsquo;ve taken on. Not fun in a
              &ldquo;grinding through tutorials&rdquo; way. Fun in a way that
              felt more like a game. I would think of a feature, describe it in
              plain English, and watch it appear. Slide-out cart drawer? Done.
              Image zoom on product photos? Done. Automatic file delivery after
              purchase? Done. I never once opened a textbook or watched a YouTube
              tutorial. The whole thing came together in about a week.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
              Five Minutes at a Time
            </h2>
            <p className="mb-6">
              The workflow was simple: describe what I wanted in plain English,
              Claude would give me a block of code to paste into Claude Code,
              I&rsquo;d paste it, commit, and push to Vercel. The site would
              update live within seconds. That feedback loop, idea to reality in
              under a minute, made it addictive in the best way. And crucially,
              it made it compatible with my life. I could pop in for five
              minutes, implement a feature, and walk away. The next time I had
              five minutes, I&rsquo;d pick up exactly where I left off.
            </p>
            <p>
              That&rsquo;s not how software development is supposed to work.
              Normally context switching kills you. You need to get back into the
              headspace, remember where you were, load everything back up
              mentally. But because I was just describing things in plain English
              and Claude held all the technical context, I could drop in and out
              without losing momentum. Kid wakes up from nap? Close the laptop.
              Kid goes back down? Open it back up and keep going.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
              Under the Hood
            </h2>
            <p>
              The site runs on Next.js and React, hosted on Vercel, with Stripe
              handling payments and Cloudflare managing the domain. That sentence
              probably means nothing to you if you&rsquo;re not a developer. It
              didn&rsquo;t mean much to me either when we started. What I can
              tell you is that it&rsquo;s a fast, modern, production-grade
              stack, and I didn&rsquo;t have to understand any of it to build on
              top of it. Setting up Stripe payments and automatic STL file
              delivery after purchase felt like it should take weeks. It took an
              afternoon, spread across about three days of five-minute sessions.
              Other things that should have been simple surprised me. Getting the
              mobile menu background to actually be opaque took a few iterations.
              But that&rsquo;s part of it. You describe the problem, you try
              again, and you move on.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
              What I Ended Up With
            </h2>
            <p>
              The site I ended up with, Proper Polymer, has a slide-out menu and
              cart, Google Analytics event tracking, variant selectors for
              products with multiple configurations, a custom confirmation email,
              and a filtered product catalog organized by vehicle. It processes
              real payments and automatically delivers digital files to
              customers. A freelance developer would have charged somewhere
              between $8,000 and $10,000 for a site like this. I built it in a
              week, in stolen pockets of time between the chaos of raising two
              kids, without writing a single line of code from scratch.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
              Just Start
            </h2>
            <p className="mb-6">
              What struck me most was how the barrier between idea and execution
              basically disappeared. As an engineer I&rsquo;m used to knowing
              exactly what I want but being blocked by implementation. With this
              workflow the implementation just happened. I could focus entirely on
              the product: the designs, the copy, the user experience, and trust
              that the technical side would follow.
            </p>
            <p className="mb-6">
              If you&rsquo;ve been sitting on a side project because you
              don&rsquo;t know how to code, or because you don&rsquo;t have the
              time, I&rsquo;d genuinely encourage you to just start. Describe
              what you want to build, be specific, and iterate. It feels less
              like programming and more like having a conversation with someone
              who happens to know how to build anything you can dream up.
            </p>
            <p>
              The store is live at{" "}
              <a
                href="https://www.properpolymer.com"
                className="text-accent transition-colors hover:text-accent-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                properpolymer.com
              </a>{" "}
              if you want to see what came out of it.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
