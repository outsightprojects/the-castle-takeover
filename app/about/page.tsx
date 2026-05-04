import { PageShell } from '@/components/page-shell'
import Link from 'next/link'
import {
  ArrowRight,
  Sun,
  Moon,
  Sunrise,
  Music,
  UtensilsCrossed,
  Sparkles,
  TreePine,
  ChevronDown,
} from 'lucide-react'

export const metadata = {
  title: 'About — The Castle Takeover',
  description: 'What to expect from a weekend at Schloss Dornburg.',
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-c-border">
      <summary className="flex items-center justify-between cursor-pointer py-5 min-h-[48px] list-none [&::-webkit-details-marker]:hidden">
        <span className="text-c-white font-medium pr-4">{question}</span>
        <ChevronDown size={18} className="text-c-dim shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-5">
        <p className="text-c-muted leading-relaxed text-sm">{answer}</p>
      </div>
    </details>
  )
}

export default function AboutPage() {
  return (
    <PageShell>
      {/* Header */}
      <section className="px-6 md:px-8 pt-12 pb-16 md:pt-20 md:pb-24 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-c-white leading-[0.95] mb-6">
          What&rsquo;s
          <span className="block italic text-c-gold">happening</span>
        </h1>
        <p className="text-c-muted text-lg leading-relaxed max-w-xl mx-auto">
          Three birthdays, one castle, a weekend you won&rsquo;t forget.
          Here&rsquo;s the plan (loosely).
        </p>
      </section>

      {/* The Story */}
      <section className="px-6 md:px-8 pb-16 md:pb-24 max-w-3xl mx-auto">
        <div className="border border-c-border p-8 md:p-12">
          <div className="space-y-4 text-c-muted leading-relaxed text-[15px]">
            <p>
              When Peter, Georg, and Cari all turned 40, a dinner wasn&rsquo;t
              going to cut it. So we found a castle &mdash; an actual
              18th-century baroque palace in Sachsen-Anhalt, built for the
              mother of Catherine the Great &mdash; and we&rsquo;re taking
              the whole thing over for a weekend.
            </p>
            <p>
              This isn&rsquo;t a festival. It&rsquo;s not a conference.
              It&rsquo;s 160 friends in an extraordinary place, eating
              together, dancing together, swimming together, and having
              the kind of time that doesn&rsquo;t happen in normal life.
            </p>
            <p>
              No strangers. No awkward networking. Just your people in a
              castle by a lake.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-c-border">
            <p className="text-c-white/70 text-sm">&mdash; Peter, Georg &amp; Cari</p>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* Schedule */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-c-white text-center mb-12">
          The rough plan
        </h2>

        <div className="space-y-0">
          {[
            {
              icon: Sunrise,
              day: 'Friday',
              subtitle: 'Arrive & settle in',
              items: [
                'Get there from late afternoon, explore the castle, find your room',
                'Welcome dinner in the courtyard \u2014 all plant-based, all delicious',
                'First drinks, catching up, figuring out the castle\u2019s secret passages',
              ],
            },
            {
              icon: Sun,
              day: 'Saturday',
              subtitle: 'The big one',
              items: [
                'The main day of the event',
                'Welcoming and getting together from early on',
                'Dinner cooked by a wonderful chef right at the venue',
                'Music, dancing, and fun until someone can\u2019t anymore',
              ],
            },
            {
              icon: Moon,
              day: 'Sunday',
              subtitle: 'Wind down',
              items: [
                'Very late brunch. Coffee first.',
                'Last dip in the lake, last walk around the grounds',
                'Goodbyes and departure by afternoon',
              ],
            },
          ].map((block, i) => (
            <div key={block.day} className={`py-10 ${i < 2 ? 'border-b border-c-border' : ''}`}>
              <div className="flex items-center gap-4 mb-5">
                <block.icon size={20} className="text-c-gold shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-c-white font-semibold text-lg tracking-tight">{block.day}</h3>
                  <p className="text-c-dim text-sm">{block.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-2 ml-9">
                {block.items.map((item) => (
                  <li key={item} className="text-c-muted text-sm flex items-start gap-3">
                    <span className="text-c-gold/60 mt-1.5 shrink-0 text-[6px]">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-c-dim text-xs text-center mt-8 font-mono tracking-wide">
          We&rsquo;ll share a proper schedule closer to the date. This is the gist.
        </p>
      </section>

      <div className="rule" />

      {/* What's included */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-c-white text-center mb-12">
          What&rsquo;s covered
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-c-border">
          {[
            {
              icon: UtensilsCrossed,
              title: 'All meals',
              desc: 'Friday dinner through Sunday brunch. Fully vegetarian & vegan \u2014 properly good food, not a compromise.',
              accent: 'gold' as const,
            },
            {
              icon: Music,
              title: 'Music & entertainment',
              desc: 'Music and DJs all weekend. Courtyard sessions, cellar sets, and more.',
              accent: 'gold' as const,
            },
            {
              icon: Sparkles,
              title: 'The venue',
              desc: 'Full castle access all weekend. Grounds, halls, cellar, gardens \u2014 the lot.',
              accent: 'gold' as const,
            },
            {
              icon: TreePine,
              title: 'Lake & sauna',
              desc: 'Swim in the lake next to the castle. Warm up in the sauna. Towels provided.',
              accent: 'gold' as const,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 md:p-8 text-center bg-c-surface"
            >
              <item.icon className="mx-auto mb-4 text-c-gold" size={22} strokeWidth={1.5} />
              <h3 className="text-c-white font-semibold mb-2">{item.title}</h3>
              <p className="text-c-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rule" />

      {/* FAQ */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-c-white text-center mb-12">
          Questions you probably have
        </h2>

        <div>
          <FAQItem
            question="How much does it cost?"
            answer="We're asking for a solidarity contribution of around &euro;90. That covers food, drinks, music, the sauna, and the venue. Castle beds are &euro;90 per person — mostly shared rooms, some doubles. We'll do our best to fit everyone's needs. The venue is the biggest expense, so this is about covering it together. Staying elsewhere? &euro;50+ helps cover your share of the venue, food, drinks, and music — pay what works. Can you do more? Amazing, it helps others."
          />
          <FAQItem
            question="Can I bring someone?"
            answer="Yes! Just make sure each person fills out their own RSVP so we can plan. Share thecastletakeover.de with them."
          />
          <FAQItem
            question="Wait, the food is all vegan/vegetarian?"
            answer="Yep. All of it. And it's going to be great — think proper feasts, not sad salads. Let us know about allergies in the RSVP."
          />
          <FAQItem
            question="What should I bring?"
            answer="Comfortable clothes, layers for evenings, swimwear for the lake, a torch for late-night castle exploring. Good energy."
          />
          <FAQItem
            question="Is there wifi?"
            answer="Basic wifi at the castle. Mobile signal is spotty. Consider it a feature."
          />
          <FAQItem
            question="Can I come for just one day?"
            answer="You can — pick 'day only' in the RSVP. But honestly, the magic is in the full weekend. Stay if you can."
          />
          <FAQItem
            question="Where do I sleep?"
            answer="About 90 beds in the castle (&euro;90 per bed — mostly shared rooms, some doubles, we'll fit everyone's needs), 70 more in a nearby village, plus camping on the grounds. Or book your own thing. You pick in the RSVP."
          />
        </div>
      </section>

      {/* CTA */}
      <div className="rule" />
      <section className="px-6 md:px-8 py-16 md:py-24 text-center">
        <p className="text-c-muted text-lg mb-8 max-w-md mx-auto">
          That&rsquo;s the plan. You in?
        </p>
        <Link
          href="/tickets"
          className="group inline-flex items-center justify-center gap-2 bg-c-gold text-c-black font-semibold px-12 py-4 rounded-none text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]"
        >
          I&rsquo;m In
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </section>
    </PageShell>
  )
}
