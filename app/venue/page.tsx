import { PageShell } from '@/components/page-shell'
import { VideoHero } from '@/components/video-hero'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  MapPin,
  Car,
  Train,
  BedDouble,
  Tent,
  Home,
  ExternalLink,
  Navigation,
  Clock,
} from 'lucide-react'

export const metadata = {
  title: 'Venue — The Castle Takeover',
  description: 'Schloss Dornburg: location, directions, and accommodation info.',
}

export default function VenuePage() {
  return (
    <PageShell>
      {/* Video Header */}
      <VideoHero
        src="/images/venue-loop.mp4"
        poster="/images/castle-front.jpeg"
      >
        <div className="px-6 md:px-8 pt-20 pb-24 md:pt-32 md:pb-36 max-w-3xl mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-4">
            The Venue
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-c-white leading-[0.95] mb-6">
            Schloss
            <span className="block italic text-c-gold">Dornburg</span>
          </h1>
          <p className="text-c-white/70 text-lg leading-relaxed max-w-xl mx-auto">
            A baroque castle near Magdeburg in Sachsen-Anhalt.
            Our home for the weekend.
          </p>
        </div>
      </VideoHero>

      {/* Castle Gallery */}
      <section className="px-6 md:px-8 pb-16 max-w-6xl mx-auto">
        {/* Row 1 — hero exterior + disco ball */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <div className="relative aspect-[16/10] md:col-span-2 overflow-hidden">
            <Image
              src="/images/castle-exterior.jpeg"
              alt="Schloss Dornburg baroque facade framed by trees"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/castle-discoball.jpeg"
              alt="Disco ball hanging in front of baroque archway"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Row 2 — three interiors */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/castle-interior.jpeg"
              alt="Ornate chandelier and stucco ceiling"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/castle-staircase.jpeg"
              alt="Wrought-iron staircase with sunlight on stone floors"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden col-span-2 md:col-span-1">
            <Image
              src="/images/castle-doorway.jpeg"
              alt="Sunlit doorway looking through to ornate iron railing"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Row 3 — bedroom + outdoor dining */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/castle-bedroom.jpeg"
              alt="Castle bedroom with arched window and weathered blue walls"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/castle-dining.jpeg"
              alt="Outdoor dining table set in the castle courtyard"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Row 4 — garden steps + dinner with facade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/castle-steps.jpeg"
              alt="Garden steps leading to castle entrance"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="relative aspect-[3/4] md:col-span-2 overflow-hidden">
            <Image
              src="/images/castle-dinner.jpeg"
              alt="Dinner table with castle facade in the background"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
        </div>

        {/* Row 5 — full-width front approach */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <Image
            src="/images/castle-front.jpeg"
            alt="Schloss Dornburg front approach from the gardens"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Castle Description */}
      <section className="px-6 md:px-8 pb-16 md:pb-24 max-w-3xl mx-auto">
        <div className="border border-c-border p-8 md:p-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-4">
            The Castle
          </p>
          <div className="space-y-4 text-c-muted leading-relaxed">
            <p>
              Built between 1751 and 1758, Schloss Dornburg is one of
              Germany&rsquo;s most remarkable baroque palaces. It was
              commissioned by F&uuml;rstin Johanna Elisabeth von
              Anhalt-Zerbst &mdash; mother of the future Tsarina
              Catherine the Great &mdash; after the original 1674 castle
              was destroyed by fire.
            </p>
            <p>
              The palace was designed by Friedrich Joachim Michael Stengel,
              one of the great baroque architects of the 18th century. Over
              the centuries it served as a royal residence, an archive, and
              more. Since 2000, comprehensive restoration has brought it
              back to life.
            </p>
            <p>
              The traces of time give the place its unique atmosphere:
              ornate stucco ceilings, sprawling gardens, and rooms full of
              character. Courtyards for afternoon drinks, a grand hall for
              dinner, cellar rooms for late-night music, a lake at the
              doorstep, a sauna to warm up in, and views across the
              countryside. The whole place is ours for the weekend.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-c-border flex items-start gap-3">
            <MapPin className="text-c-gold shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
            <div>
              <p className="text-c-white font-medium text-sm">Address</p>
              <p className="text-c-muted text-sm">
                Lindenweg 1, 39264 Gommern, Germany
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* Map */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-4">
            Location
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-c-white leading-tight">
            Find Us
          </h2>
        </div>

        <div className="overflow-hidden aspect-[4/3] md:aspect-[16/9] bg-c-surface">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2440!2d11.8283!3d52.0667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSchloss+Dornburg+Gommern!5e0!3m2!1sde!2sde!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Schloss Dornburg location"
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <a
            href="https://maps.google.com/?q=Schloss+Dornburg,+Lindenweg+1,+39264+Gommern"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-c-border text-c-muted font-mono text-xs tracking-widest uppercase px-5 py-3 hover:text-c-white hover:border-c-white/20 transition-colors min-h-[48px]"
          >
            <Navigation size={14} />
            Google Maps
            <ExternalLink size={12} />
          </a>
          <a
            href="https://maps.apple.com/?q=Schloss+Dornburg,+Lindenweg+1,+39264+Gommern"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-c-border text-c-muted font-mono text-xs tracking-widest uppercase px-5 py-3 hover:text-c-white hover:border-c-white/20 transition-colors min-h-[48px]"
          >
            <Navigation size={14} />
            Apple Maps
            <ExternalLink size={12} />
          </a>
        </div>
      </section>

      <div className="rule" />

      {/* Getting There */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-4">
            Directions
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-c-white leading-tight">
            Getting There
          </h2>
        </div>

        <div className="space-y-0">
          {/* By Car */}
          <div className="py-10 border-b border-c-border">
            <div className="flex items-center gap-4 mb-6">
              <Car size={20} className="text-c-gold shrink-0" strokeWidth={1.5} />
              <h3 className="text-c-white font-semibold text-lg tracking-tight">By Car</h3>
            </div>
            <div className="space-y-4 ml-9">
              {[
                { from: 'Berlin', time: '~1.5 hours', route: 'A2 west toward Magdeburg, exit Gommern' },
                { from: 'Munich', time: '~4.5 hours', route: 'A9 north toward Leipzig, then A14/A2 toward Magdeburg' },
                { from: 'Frankfurt', time: '~4 hours', route: 'A5 north then A2 east toward Magdeburg' },
              ].map((r) => (
                <div key={r.from} className="flex items-start gap-3">
                  <Clock className="text-c-gold/60 shrink-0 mt-0.5" size={14} />
                  <div>
                    <p className="text-c-white text-sm font-medium">{r.from}: {r.time}</p>
                    <p className="text-c-dim text-xs">{r.route}</p>
                  </div>
                </div>
              ))}
              <p className="text-c-dim text-xs mt-3">
                Parking on the castle grounds. Got space? Offer a ride in the RSVP.
              </p>
            </div>
          </div>

          {/* By Train */}
          <div className="py-10">
            <div className="flex items-center gap-4 mb-6">
              <Train size={20} className="text-c-gold shrink-0" strokeWidth={1.5} />
              <h3 className="text-c-white font-semibold text-lg tracking-tight">By Train</h3>
            </div>
            <div className="space-y-3 ml-9 text-c-muted text-sm leading-relaxed">
              <p>
                Nearest major station: <span className="text-c-white font-medium">Magdeburg Hbf</span> (ICE
                from Berlin ~1.5h, from Frankfurt ~3.5h). From there it&rsquo;s
                ~20 min by car or regional train to Gommern.
              </p>
              <div className="bg-c-surface border border-c-border p-4 mt-4">
                <p className="text-c-white text-sm">
                  Need a shuttle? Note it in the RSVP and we&rsquo;ll coordinate pickups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* Accommodation */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-4">
            Accommodation
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-c-white leading-tight">
            Where to Sleep
          </h2>
        </div>

        <div className="space-y-0">
          {[
            {
              icon: BedDouble,
              title: 'In the Castle',
              desc: 'Around 90 beds \u2014 mostly shared rooms, some doubles. \u20AC90 per bed. We\u2019ll do our best to fit everyone\u2019s needs.',
              tag: '~90 beds',
            },
            {
              icon: Home,
              title: 'Village or hotel',
              desc: 'Houses or hotels ~5 min from castle. Self-arranged — book your own.',
              tag: 'Self-arrange',
            },
            {
              icon: Tent,
              title: 'Camping',
              desc: 'Bring your tent or camper \u2014 plenty of space on the grounds. Castle bathrooms available.',
              tag: 'Unlimited',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`flex items-start justify-between gap-4 py-8 ${
                i < 2 ? 'border-b border-c-border' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <item.icon className="text-c-gold shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
                <div>
                  <h3 className="text-c-white font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-c-muted text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <span className="text-c-gold font-mono text-xs tracking-wider shrink-0 mt-1">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

      </section>

      {/* CTA */}
      <div className="rule" />
      <section className="px-6 md:px-8 py-16 md:py-24 text-center">
        <Link
          href="/tickets"
          className="group inline-flex items-center justify-center gap-2 bg-c-gold text-c-black font-semibold px-12 py-4 rounded-none text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]"
        >
          RSVP Now
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </section>
    </PageShell>
  )
}
