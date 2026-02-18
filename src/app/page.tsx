'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shirt,
  CalendarDays,
  Sparkles,
  Camera,
  Layers,
  BarChart3,
  ArrowRight,
  Star,
  ChevronRight,
} from 'lucide-react';

// Animated section wrapper
function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Navbar
function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Shirt className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold text-foreground">
            Wardrobe
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:brightness-95 hover:shadow-md transition-all"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Smart Wardrobe Management
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your Wardrobe,{' '}
              <span className="text-gradient">Elevated.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Organize your clothes, plan outfits for every occasion, and never
              stare at your closet wondering what to wear again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-95 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-all"
              >
                Learn More
              </a>
            </div>

          </motion.div>

          {/* Right - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-sm">
              {/* Phone frame */}
              <div className="relative rounded-[2.5rem] border-[6px] border-foreground/10 bg-card shadow-2xl overflow-hidden">
                <div className="aspect-[9/16] p-4 flex flex-col">
                  {/* Mock status bar */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span className="text-[10px] font-medium text-muted-foreground">9:41</span>
                    <div className="w-20 h-5 rounded-full bg-foreground/10" />
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-sm bg-foreground/20" />
                      <div className="w-3 h-3 rounded-sm bg-foreground/20" />
                    </div>
                  </div>

                  {/* Mock dashboard header */}
                  <div className="mb-4">
                    <p className="text-[10px] text-muted-foreground">Good Morning</p>
                    <h3 className="font-display text-sm font-semibold">Today&apos;s Outfit</h3>
                  </div>

                  {/* Mock outfit items grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { src: '/top.png', name: 'White T-Shirt' },
                      { src: '/jeans.png', name: 'Classic Jeans' },
                      { src: '/shoes.png', name: 'White Sneakers' },
                      { src: '/bag.png', name: 'Leather Bag' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="rounded-xl bg-muted overflow-hidden"
                      >
                        <div className="aspect-square relative">
                          <Image
                            src={item.src}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </div>
                        <p className="text-[8px] text-center py-1 text-muted-foreground truncate px-1">
                          {item.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mock event card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="rounded-xl bg-primary/10 p-3 mb-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[10px] font-medium">Brunch with Friends</span>
                    </div>
                    <span className="text-[9px] text-muted-foreground ml-3.5">11:00 AM — Outfit Ready</span>
                  </motion.div>

                  {/* Mock stats */}
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {[
                      { label: 'Items', value: '48' },
                      { label: 'Outfits', value: '12' },
                      { label: 'Events', value: '5' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-2 rounded-lg bg-muted/50">
                        <p className="text-xs font-semibold text-foreground">{stat.value}</p>
                        <p className="text-[8px] text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating decorations */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center"
              >
                <CalendarDays className="w-7 h-7 text-primary" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-2 -left-4 w-14 h-14 rounded-2xl bg-sage/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-sage" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Shirt,
      title: 'Smart Wardrobe',
      description:
        'Organize all your clothes with photos, categories, and color tags. Find anything in seconds.',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: CalendarDays,
      title: 'Outfit Planning',
      description:
        'Plan outfits on a calendar. See what you wore before and never repeat looks unintentionally.',
      color: 'bg-sage/20 text-sage',
    },
    {
      icon: Sparkles,
      title: 'Event Ready',
      description:
        'Link outfits to upcoming events. Walk into every occasion confident and prepared.',
      color: 'bg-camel/20 text-camel',
    },
  ];

  return (
    <AnimatedSection className="py-20 sm:py-28" delay={0}>
      <div id="features" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary mb-2 block">Features</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A complete toolkit to manage your wardrobe and look your best every day.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Camera,
      title: 'Add Your Items',
      description:
        'Snap a photo, tag the colors and category. Build your digital closet in minutes.',
    },
    {
      number: '02',
      icon: Layers,
      title: 'Plan Your Outfits',
      description:
        'Mix and match items into outfits. Assign them to dates on your calendar.',
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Stay Organized',
      description:
        'Track what you wear, discover pairing insights, and make the most of every piece.',
    },
  ];

  return (
    <AnimatedSection className="py-20 sm:py-28 bg-muted/30" delay={0}>
      <div id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary mb-2 block">How It Works</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Three Simple Steps
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Getting started takes less than a minute. Here&apos;s how.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="relative text-center"
            >
              {/* Step number circle */}
              <div className="relative mx-auto w-14 h-14 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mb-5 z-10">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              <span className="text-xs font-bold text-primary/60 tracking-widest uppercase mb-2 block">
                Step {step.number}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// App Preview Section
function AppPreviewSection() {
  return (
    <AnimatedSection className="py-20 sm:py-28 overflow-hidden" delay={0}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-2 block">App Preview</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Designed for Your Style
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A beautiful, intuitive interface that makes managing your wardrobe a joy.
          </p>
        </div>

        {/* Preview cards showing different features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Wardrobe Grid Preview */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-card border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="p-4 border-b border-border/50">
              <span className="text-xs font-medium text-primary">Wardrobe</span>
              <h4 className="font-display text-sm font-semibold mt-1">Your Collection</h4>
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-3">
              {['/top.png', '/jeans.png', '/shoes.png', '/dress.png', '/bag.png', '/top2.png'].map(
                (src, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-muted overflow-hidden relative">
                    <Image src={src} alt="item" fill className="object-cover" sizes="100px" />
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Calendar Preview */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-card border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="p-4 border-b border-border/50">
              <span className="text-xs font-medium text-primary">Calendar</span>
              <h4 className="font-display text-sm font-semibold mt-1">Plan Ahead</h4>
            </div>
            <div className="p-3">
              {/* Mini calendar mock */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-[9px] text-center text-muted-foreground font-medium">
                    {d}
                  </div>
                ))}
                {Array.from({ length: 28 }, (_, i) => {
                  const hasOutfit = [2, 5, 9, 14, 18, 22].includes(i);
                  const hasEvent = [5, 8, 12, 18, 20, 25].includes(i);
                  return (
                    <div key={i} className="aspect-square flex flex-col items-center justify-center rounded-md text-[9px]">
                      <span className={`${i === 9 ? 'text-primary font-bold' : 'text-foreground/70'}`}>
                        {i + 1}
                      </span>
                      <div className="flex flex-col gap-px mt-0.5">
                        {hasOutfit && <div className="w-3 h-[2px] rounded-full bg-primary" />}
                        {hasEvent && <div className="w-3 h-[2px] rounded-full bg-muted-foreground/40" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Outfit Detail Preview */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-card border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all sm:col-span-2 lg:col-span-1"
          >
            <div className="p-4 border-b border-border/50">
              <span className="text-xs font-medium text-primary">Insights</span>
              <h4 className="font-display text-sm font-semibold mt-1">Wear Tracking</h4>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: 'White T-Shirt', count: 24, src: '/top.png' },
                { name: 'Classic Jeans', count: 18, src: '/jeans.png' },
                { name: 'White Sneakers', count: 15, src: '/shoes.png' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted overflow-hidden relative flex-shrink-0">
                    <Image src={item.src} alt={item.name} fill className="object-cover" sizes="36px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(item.count / 30) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{item.count}x</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fashion Blogger',
      avatar: 'S',
      avatarBg: 'bg-primary',
      quote:
        "This app completely changed how I plan my outfits. I save so much time in the morning now!",
    },
    {
      name: 'Alex Rivera',
      role: 'Working Professional',
      avatar: 'A',
      avatarBg: 'bg-navy',
      quote:
        "I used to buy duplicate items all the time. Now I know exactly what's in my wardrobe.",
    },
    {
      name: 'Mia Thompson',
      role: 'College Student',
      avatar: 'M',
      avatarBg: 'bg-sage',
      quote:
        "The calendar feature is genius. I never show up to events underdressed anymore.",
    },
  ];

  return (
    <AnimatedSection className="py-20 sm:py-28 bg-muted/30" delay={0}>
      <div id="testimonials" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary mb-2 block">Testimonials</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What People Say
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="p-6 rounded-2xl bg-card border border-border/50"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${t.avatarBg} flex items-center justify-center text-xs font-bold text-white`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// CTA Banner Section
function CTASection() {
  return (
    <AnimatedSection className="py-20 sm:py-28" delay={0}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative isolate rounded-3xl overflow-hidden px-6 py-14 sm:px-12 sm:py-20 text-center">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" aria-hidden="true" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Wardrobe?
            </h2>
            <p className="text-white/80 max-w-md mx-auto mb-8">
              Join thousands who&apos;ve already simplified their style. It&apos;s free to get started.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-primary font-semibold hover:bg-white/90 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Sign Up Free
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Shirt className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-display text-base font-semibold text-foreground">
                Wardrobe
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Organize your clothes, plan outfits, and look your best every single day.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
            <ul className="space-y-2">
              {['Features', 'How it Works'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Account</h4>
            <ul className="space-y-2">
              {[
                { label: 'Log In', href: '/login' },
                { label: 'Sign Up', href: '/signup' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Wardrobe App. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with <span className="text-primary">&hearts;</span> for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AppPreviewSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
      <Footer />
    </div>
  );
}
