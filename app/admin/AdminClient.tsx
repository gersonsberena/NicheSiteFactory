"use client"
import { useState, useTransition } from "react"
import { loadCoach, saveCoach } from "./actions"
import base from "@/templates/football-coach/base.config.json"

// ─── Row types ────────────────────────────────────────────────────────────────

type StatsRow = { value: string; label: string }
type ServiceRow = { title: string; description: string; price: string }
type TestimonialRow = { quote: string; name: string; role: string }
type AvailabilityRow = { day: string; slots: string }
type SuccessStoryRow = { name: string; role: string; story: string; result: string }
type VideoRow = { title: string; youtube_url: string; description: string }
type FAQRow = { question: string; answer: string }

// ─── Form state ───────────────────────────────────────────────────────────────

type FormState = {
  layout: string
  meta_title: string
  meta_description: string
  meta_favicon_url: string
  about_name: string
  about_title: string
  about_city: string
  about_county: string
  about_state: string
  about_sport: string
  about_bio: string
  about_years_experience: string
  about_specialty: string
  about_age_groups: string
  about_photo: string
  about_credentials: string
  hero_headline: string
  hero_subline: string
  hero_photo: string
  hero_cta_text: string
  hero_cta_url: string
  contact_phone: string
  contact_email: string
  contact_booking_url: string
  contact_calendly_url: string
  contact_formspree_id: string
  contact_business_hours: string
  contact_instagram: string
  contact_twitter: string
  contact_youtube: string
  gallery_photos: string
  training_cities: string
  availability_note: string
  legal_privacy_policy_url: string
  legal_terms_url: string
  design_accent_color: string
  design_background_tone: string
  design_hero_layout: string
  design_hero_overlay: string
  design_stats_layout: string
  design_photo_treatment: string
  design_gallery_layout: string
  design_services_layout: string
  design_testimonials_layout: string
  design_about_frame: string
  design_font_pair: string
  design_b_accent_color: string
  design_b_background_tone: string
  design_b_hero_layout: string
  design_b_hero_overlay: string
  design_b_stats_layout: string
  design_b_photo_treatment: string
  design_b_gallery_layout: string
  design_b_services_layout: string
  design_b_testimonials_layout: string
  design_b_about_layout: string
  design_b_font_pair: string
  design_b_palette: string
  design_c_accent_color: string
  design_c_background_tone: string
  design_c_hero_layout: string
  design_c_hero_overlay: string
  design_c_stats_layout: string
  design_c_photo_treatment: string
  design_c_gallery_layout: string
  design_c_services_layout: string
  design_c_testimonials_layout: string
  design_c_about_layout: string
  design_c_font_pair: string
  copy_hero_tagline: string
  copy_hero_availability: string
  copy_hero_learn_more_text: string
  copy_coach_label: string
  copy_about_tagline: string
  copy_about_quote: string
  copy_about_section_prefix: string
  copy_services_tagline: string
  copy_services_subline: string
  copy_services_cta_text: string
  copy_services_eyebrow_suffix: string
  copy_testimonials_tagline: string
  copy_testimonials_eyebrow: string
  copy_contact_eyebrow: string
  copy_contact_headline: string
  copy_contact_tagline: string
  copy_contact_offer: string
  copy_contact_urgency: string
  copy_contact_subline: string
  copy_gallery_label: string
  copy_gallery_heading: string
  copy_marquee_text: string
  copy_c_hero_watermark_text: string
  copy_c_contact_reply_time: string
  copy_c_film_label: string
}

const EMPTY_FORM: FormState = {
  layout: "", meta_title: "", meta_description: "", meta_favicon_url: "",
  about_name: "", about_title: "", about_city: "", about_county: "", about_state: "",
  about_sport: "", about_bio: "", about_years_experience: "", about_specialty: "",
  about_age_groups: "", about_photo: "", about_credentials: "",
  hero_headline: "", hero_subline: "", hero_photo: "", hero_cta_text: "", hero_cta_url: "",
  contact_phone: "", contact_email: "", contact_booking_url: "", contact_calendly_url: "",
  contact_formspree_id: "", contact_business_hours: "",
  contact_instagram: "", contact_twitter: "", contact_youtube: "",
  gallery_photos: "",
  training_cities: "",
  availability_note: "",
  legal_privacy_policy_url: "", legal_terms_url: "",
  design_accent_color: "", design_background_tone: "",
  design_hero_layout: "", design_hero_overlay: "", design_stats_layout: "",
  design_photo_treatment: "", design_gallery_layout: "", design_services_layout: "",
  design_testimonials_layout: "", design_about_frame: "", design_font_pair: "",
  design_b_accent_color: "", design_b_background_tone: "",
  design_b_hero_layout: "", design_b_hero_overlay: "", design_b_stats_layout: "",
  design_b_photo_treatment: "", design_b_gallery_layout: "", design_b_services_layout: "",
  design_b_testimonials_layout: "", design_b_about_layout: "", design_b_font_pair: "", design_b_palette: "",
  design_c_accent_color: "", design_c_background_tone: "",
  design_c_hero_layout: "", design_c_hero_overlay: "", design_c_stats_layout: "",
  design_c_photo_treatment: "", design_c_gallery_layout: "", design_c_services_layout: "",
  design_c_testimonials_layout: "", design_c_about_layout: "", design_c_font_pair: "",
  copy_hero_tagline: "", copy_hero_availability: "", copy_hero_learn_more_text: "",
  copy_coach_label: "", copy_about_tagline: "", copy_about_quote: "",
  copy_about_section_prefix: "", copy_services_tagline: "", copy_services_subline: "",
  copy_services_cta_text: "", copy_services_eyebrow_suffix: "",
  copy_testimonials_tagline: "", copy_testimonials_eyebrow: "",
  copy_contact_eyebrow: "", copy_contact_headline: "", copy_contact_tagline: "",
  copy_contact_offer: "", copy_contact_urgency: "", copy_contact_subline: "",
  copy_gallery_label: "", copy_gallery_heading: "", copy_marquee_text: "",
  copy_c_hero_watermark_text: "", copy_c_contact_reply_time: "", copy_c_film_label: "",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function str(v: unknown): string {
  if (v === undefined || v === null) return ""
  return String(v)
}

function fromRaw(raw: Record<string, unknown>) {
  const about = (raw.about ?? {}) as Record<string, unknown>
  const hero = (raw.hero ?? {}) as Record<string, unknown>
  const contact = (raw.contact ?? {}) as Record<string, unknown>
  const design = (raw.design ?? {}) as Record<string, unknown>
  const copy = (raw.copy_variants ?? {}) as Record<string, unknown>
  const meta = (raw.meta ?? {}) as Record<string, unknown>
  const gallery = (raw.gallery ?? {}) as Record<string, unknown>
  const avail = (raw.availability ?? {}) as Record<string, unknown>
  const legal = (raw.legal ?? {}) as Record<string, unknown>

  const credentials = Array.isArray(about.credentials)
    ? (about.credentials as string[]).join(", ")
    : ""
  const businessHours = Array.isArray(contact.business_hours)
    ? (contact.business_hours as string[]).join("\n")
    : str(contact.business_hours)
  const galleryPhotos = Array.isArray(gallery.photos)
    ? (gallery.photos as string[]).join("\n")
    : ""
  const trainingCities = Array.isArray(raw.training_cities)
    ? (raw.training_cities as string[]).join("\n")
    : ""

  const stats: StatsRow[] = Array.isArray(raw.stats)
    ? (raw.stats as Array<Record<string, unknown>>).map((s) => ({ value: str(s.value), label: str(s.label) }))
    : []
  const services: ServiceRow[] = Array.isArray(raw.services)
    ? (raw.services as Array<Record<string, unknown>>).map((s) => ({
        title: str(s.title), description: str(s.description), price: str(s.price),
      }))
    : []
  const testimonials: TestimonialRow[] = Array.isArray(raw.testimonials)
    ? (raw.testimonials as Array<Record<string, unknown>>).map((t) => ({
        quote: str(t.quote), name: str(t.name), role: str(t.role),
      }))
    : []
  const availability: AvailabilityRow[] = Array.isArray(avail.schedule)
    ? (avail.schedule as Array<Record<string, unknown>>).map((a) => ({
        day: str(a.day),
        slots: Array.isArray(a.slots) ? (a.slots as string[]).join(", ") : str(a.slots),
      }))
    : []
  const successStories: SuccessStoryRow[] = Array.isArray(raw.success_stories)
    ? (raw.success_stories as Array<Record<string, unknown>>).map((s) => ({
        name: str(s.name), role: str(s.role), story: str(s.story), result: str(s.result),
      }))
    : []
  const videos: VideoRow[] = Array.isArray(raw.videos)
    ? (raw.videos as Array<Record<string, unknown>>).map((v) => ({
        title: str(v.title), youtube_url: str(v.youtube_url), description: str(v.description),
      }))
    : []
  const faq: FAQRow[] = Array.isArray(raw.faq)
    ? (raw.faq as Array<Record<string, unknown>>).map((f) => ({
        question: str(f.question), answer: str(f.answer),
      }))
    : []

  const form: FormState = {
    layout: str(raw.layout),
    meta_title: str(meta.title),
    meta_description: str(meta.description),
    meta_favicon_url: str(meta.favicon_url),
    about_name: str(about.name),
    about_title: str(about.title),
    about_city: str(about.city),
    about_county: str(about.county),
    about_state: str(about.state),
    about_sport: str(about.sport),
    about_bio: str(about.bio),
    about_years_experience: str(about.years_experience),
    about_specialty: str(about.specialty),
    about_age_groups: str(about.age_groups),
    about_photo: str(about.photo),
    about_credentials: credentials,
    hero_headline: str(hero.headline),
    hero_subline: str(hero.subline),
    hero_photo: str(hero.photo),
    hero_cta_text: str(hero.cta_text),
    hero_cta_url: str(hero.cta_url),
    contact_phone: str(contact.phone),
    contact_email: str(contact.email),
    contact_booking_url: str(contact.booking_url),
    contact_calendly_url: str(contact.calendly_url),
    contact_formspree_id: str(contact.formspree_id),
    contact_business_hours: businessHours,
    contact_instagram: str(contact.instagram),
    contact_twitter: str(contact.twitter),
    contact_youtube: str(contact.youtube),
    gallery_photos: galleryPhotos,
    training_cities: trainingCities,
    availability_note: str(avail.note),
    legal_privacy_policy_url: str(legal.privacy_policy_url),
    legal_terms_url: str(legal.terms_url),
    design_accent_color: str(design.accent_color),
    design_background_tone: str(design.background_tone),
    design_hero_layout: str(design.hero_layout),
    design_hero_overlay: str(design.hero_overlay),
    design_stats_layout: str(design.stats_layout),
    design_photo_treatment: str(design.photo_treatment),
    design_gallery_layout: str(design.gallery_layout),
    design_services_layout: str(design.services_layout),
    design_testimonials_layout: str(design.testimonials_layout),
    design_about_frame: str(design.about_frame),
    design_font_pair: str(design.font_pair),
    design_b_accent_color: str(design.b_accent_color),
    design_b_background_tone: str(design.b_background_tone),
    design_b_hero_layout: str(design.b_hero_layout),
    design_b_hero_overlay: str(design.b_hero_overlay),
    design_b_stats_layout: str(design.b_stats_layout),
    design_b_photo_treatment: str(design.b_photo_treatment),
    design_b_gallery_layout: str(design.b_gallery_layout),
    design_b_services_layout: str(design.b_services_layout),
    design_b_testimonials_layout: str(design.b_testimonials_layout),
    design_b_about_layout: str(design.b_about_layout),
    design_b_font_pair: str(design.b_font_pair),
    design_b_palette: str(design.b_palette),
    design_c_accent_color: str(design.c_accent_color),
    design_c_background_tone: str(design.c_background_tone),
    design_c_hero_layout: str(design.c_hero_layout),
    design_c_hero_overlay: str(design.c_hero_overlay),
    design_c_stats_layout: str(design.c_stats_layout),
    design_c_photo_treatment: str(design.c_photo_treatment),
    design_c_gallery_layout: str(design.c_gallery_layout),
    design_c_services_layout: str(design.c_services_layout),
    design_c_testimonials_layout: str(design.c_testimonials_layout),
    design_c_about_layout: str(design.c_about_layout),
    design_c_font_pair: str(design.c_font_pair),
    copy_hero_tagline: str(copy.hero_tagline),
    copy_hero_availability: str(copy.hero_availability),
    copy_hero_learn_more_text: str(copy.hero_learn_more_text),
    copy_coach_label: str(copy.coach_label),
    copy_about_tagline: str(copy.about_tagline),
    copy_about_quote: str(copy.about_quote),
    copy_about_section_prefix: str(copy.about_section_prefix),
    copy_services_tagline: str(copy.services_tagline),
    copy_services_subline: str(copy.services_subline),
    copy_services_cta_text: str(copy.services_cta_text),
    copy_services_eyebrow_suffix: str(copy.services_eyebrow_suffix),
    copy_testimonials_tagline: str(copy.testimonials_tagline),
    copy_testimonials_eyebrow: str(copy.testimonials_eyebrow),
    copy_contact_eyebrow: str(copy.contact_eyebrow),
    copy_contact_headline: str(copy.contact_headline),
    copy_contact_tagline: str(copy.contact_tagline),
    copy_contact_offer: str(copy.contact_offer),
    copy_contact_urgency: str(copy.contact_urgency),
    copy_contact_subline: str(copy.contact_subline),
    copy_gallery_label: str(copy.gallery_label),
    copy_gallery_heading: str(copy.gallery_heading),
    copy_marquee_text: str(copy.marquee_text),
    copy_c_hero_watermark_text: str(copy.c_hero_watermark_text),
    copy_c_contact_reply_time: str(copy.c_contact_reply_time),
    copy_c_film_label: str(copy.c_film_label),
  }

  return { form, stats, services, testimonials, availability, successStories, videos, faq }
}

function toPayload(
  form: FormState,
  stats: StatsRow[],
  services: ServiceRow[],
  testimonials: TestimonialRow[],
  availability: AvailabilityRow[],
  successStories: SuccessStoryRow[],
  videos: VideoRow[],
  faq: FAQRow[]
): Record<string, unknown> {
  const out: Record<string, unknown> = {}

  if (form.layout) out.layout = form.layout

  const meta: Record<string, string> = {}
  if (form.meta_title) meta.title = form.meta_title
  if (form.meta_description) meta.description = form.meta_description
  if (form.meta_favicon_url) meta.favicon_url = form.meta_favicon_url
  if (Object.keys(meta).length) out.meta = meta

  const about: Record<string, unknown> = {}
  if (form.about_name) about.name = form.about_name
  if (form.about_title) about.title = form.about_title
  if (form.about_city) about.city = form.about_city
  if (form.about_county) about.county = form.about_county
  if (form.about_state) about.state = form.about_state
  if (form.about_sport) about.sport = form.about_sport
  if (form.about_bio) about.bio = form.about_bio
  if (form.about_years_experience) about.years_experience = parseInt(form.about_years_experience, 10) || form.about_years_experience
  if (form.about_specialty) about.specialty = form.about_specialty
  if (form.about_age_groups) about.age_groups = form.about_age_groups
  if (form.about_photo) about.photo = form.about_photo
  if (form.about_credentials) about.credentials = form.about_credentials.split(",").map((s) => s.trim()).filter(Boolean)
  if (Object.keys(about).length) out.about = about

  const hero: Record<string, string> = {}
  if (form.hero_headline) hero.headline = form.hero_headline
  if (form.hero_subline) hero.subline = form.hero_subline
  if (form.hero_photo) hero.photo = form.hero_photo
  if (form.hero_cta_text) hero.cta_text = form.hero_cta_text
  if (form.hero_cta_url) hero.cta_url = form.hero_cta_url
  if (Object.keys(hero).length) out.hero = hero

  const validStats = stats.filter((s) => s.value || s.label)
  if (validStats.length) out.stats = validStats.map((s) => ({ value: s.value, label: s.label }))

  const validServices = services.filter((s) => s.title || s.description)
  if (validServices.length) {
    out.services = validServices.map((s) => {
      const row: Record<string, string> = { title: s.title, description: s.description }
      if (s.price) row.price = s.price
      return row
    })
  }

  const validTestimonials = testimonials.filter((t) => t.quote || t.name)
  if (validTestimonials.length) {
    out.testimonials = validTestimonials.map((t) => ({ quote: t.quote, name: t.name, role: t.role }))
  }

  const contact: Record<string, unknown> = {}
  if (form.contact_phone) contact.phone = form.contact_phone
  if (form.contact_email) contact.email = form.contact_email
  if (form.contact_booking_url) contact.booking_url = form.contact_booking_url
  if (form.contact_calendly_url) contact.calendly_url = form.contact_calendly_url
  if (form.contact_formspree_id) contact.formspree_id = form.contact_formspree_id
  if (form.contact_business_hours) {
    contact.business_hours = form.contact_business_hours.split("\n").map((s) => s.trim()).filter(Boolean)
  }
  if (form.contact_instagram) contact.instagram = form.contact_instagram
  if (form.contact_twitter) contact.twitter = form.contact_twitter
  if (form.contact_youtube) contact.youtube = form.contact_youtube
  if (Object.keys(contact).length) out.contact = contact

  const galleryPhotos = form.gallery_photos.split("\n").map((s) => s.trim()).filter(Boolean)
  if (galleryPhotos.length) out.gallery = { photos: galleryPhotos }

  const trainingCities = form.training_cities.split("\n").map((s) => s.trim()).filter(Boolean)
  if (trainingCities.length) out.training_cities = trainingCities

  const validAvail = availability.filter((a) => a.day || a.slots)
  if (validAvail.length || form.availability_note) {
    const availOut: Record<string, unknown> = {}
    if (form.availability_note) availOut.note = form.availability_note
    if (validAvail.length) {
      availOut.schedule = validAvail.map((a) => ({
        day: a.day,
        slots: a.slots.split(",").map((s) => s.trim()).filter(Boolean),
      }))
    }
    out.availability = availOut
  }

  const validStories = successStories.filter((s) => s.name || s.story)
  if (validStories.length) {
    out.success_stories = validStories.map((s) => ({
      name: s.name, role: s.role, story: s.story, result: s.result,
    }))
  }

  const validVideos = videos.filter((v) => v.title || v.youtube_url)
  if (validVideos.length) {
    out.videos = validVideos.map((v) => {
      const row: Record<string, string> = { title: v.title, youtube_url: v.youtube_url }
      if (v.description) row.description = v.description
      return row
    })
  }

  const validFaq = faq.filter((f) => f.question || f.answer)
  if (validFaq.length) {
    out.faq = validFaq.map((f) => ({ question: f.question, answer: f.answer }))
  }

  const design: Record<string, string> = {}
  if (form.design_accent_color) design.accent_color = form.design_accent_color
  if (form.design_background_tone) design.background_tone = form.design_background_tone
  if (form.design_hero_layout) design.hero_layout = form.design_hero_layout
  if (form.design_hero_overlay) design.hero_overlay = form.design_hero_overlay
  if (form.design_stats_layout) design.stats_layout = form.design_stats_layout
  if (form.design_photo_treatment) design.photo_treatment = form.design_photo_treatment
  if (form.design_gallery_layout) design.gallery_layout = form.design_gallery_layout
  if (form.design_services_layout) design.services_layout = form.design_services_layout
  if (form.design_testimonials_layout) design.testimonials_layout = form.design_testimonials_layout
  if (form.design_about_frame) design.about_frame = form.design_about_frame
  if (form.design_font_pair) design.font_pair = form.design_font_pair
  if (form.design_b_accent_color) design.b_accent_color = form.design_b_accent_color
  if (form.design_b_background_tone) design.b_background_tone = form.design_b_background_tone
  if (form.design_b_hero_layout) design.b_hero_layout = form.design_b_hero_layout
  if (form.design_b_hero_overlay) design.b_hero_overlay = form.design_b_hero_overlay
  if (form.design_b_stats_layout) design.b_stats_layout = form.design_b_stats_layout
  if (form.design_b_photo_treatment) design.b_photo_treatment = form.design_b_photo_treatment
  if (form.design_b_gallery_layout) design.b_gallery_layout = form.design_b_gallery_layout
  if (form.design_b_services_layout) design.b_services_layout = form.design_b_services_layout
  if (form.design_b_testimonials_layout) design.b_testimonials_layout = form.design_b_testimonials_layout
  if (form.design_b_about_layout) design.b_about_layout = form.design_b_about_layout
  if (form.design_b_font_pair) design.b_font_pair = form.design_b_font_pair
  if (form.design_b_palette) design.b_palette = form.design_b_palette
  if (form.design_c_accent_color) design.c_accent_color = form.design_c_accent_color
  if (form.design_c_background_tone) design.c_background_tone = form.design_c_background_tone
  if (form.design_c_hero_layout) design.c_hero_layout = form.design_c_hero_layout
  if (form.design_c_hero_overlay) design.c_hero_overlay = form.design_c_hero_overlay
  if (form.design_c_stats_layout) design.c_stats_layout = form.design_c_stats_layout
  if (form.design_c_photo_treatment) design.c_photo_treatment = form.design_c_photo_treatment
  if (form.design_c_gallery_layout) design.c_gallery_layout = form.design_c_gallery_layout
  if (form.design_c_services_layout) design.c_services_layout = form.design_c_services_layout
  if (form.design_c_testimonials_layout) design.c_testimonials_layout = form.design_c_testimonials_layout
  if (form.design_c_about_layout) design.c_about_layout = form.design_c_about_layout
  if (form.design_c_font_pair) design.c_font_pair = form.design_c_font_pair
  if (Object.keys(design).length) out.design = design

  const copy: Record<string, string> = {}
  if (form.copy_hero_tagline) copy.hero_tagline = form.copy_hero_tagline
  if (form.copy_hero_availability) copy.hero_availability = form.copy_hero_availability
  if (form.copy_hero_learn_more_text) copy.hero_learn_more_text = form.copy_hero_learn_more_text
  if (form.copy_coach_label) copy.coach_label = form.copy_coach_label
  if (form.copy_about_tagline) copy.about_tagline = form.copy_about_tagline
  if (form.copy_about_quote) copy.about_quote = form.copy_about_quote
  if (form.copy_about_section_prefix) copy.about_section_prefix = form.copy_about_section_prefix
  if (form.copy_services_tagline) copy.services_tagline = form.copy_services_tagline
  if (form.copy_services_subline) copy.services_subline = form.copy_services_subline
  if (form.copy_services_cta_text) copy.services_cta_text = form.copy_services_cta_text
  if (form.copy_services_eyebrow_suffix) copy.services_eyebrow_suffix = form.copy_services_eyebrow_suffix
  if (form.copy_testimonials_tagline) copy.testimonials_tagline = form.copy_testimonials_tagline
  if (form.copy_testimonials_eyebrow) copy.testimonials_eyebrow = form.copy_testimonials_eyebrow
  if (form.copy_contact_eyebrow) copy.contact_eyebrow = form.copy_contact_eyebrow
  if (form.copy_contact_headline) copy.contact_headline = form.copy_contact_headline
  if (form.copy_contact_tagline) copy.contact_tagline = form.copy_contact_tagline
  if (form.copy_contact_offer) copy.contact_offer = form.copy_contact_offer
  if (form.copy_contact_urgency) copy.contact_urgency = form.copy_contact_urgency
  if (form.copy_contact_subline) copy.contact_subline = form.copy_contact_subline
  if (form.copy_gallery_label) copy.gallery_label = form.copy_gallery_label
  if (form.copy_gallery_heading) copy.gallery_heading = form.copy_gallery_heading
  if (form.copy_marquee_text) copy.marquee_text = form.copy_marquee_text
  if (form.copy_c_hero_watermark_text) copy.c_hero_watermark_text = form.copy_c_hero_watermark_text
  if (form.copy_c_contact_reply_time) copy.c_contact_reply_time = form.copy_c_contact_reply_time
  if (form.copy_c_film_label) copy.c_film_label = form.copy_c_film_label
  if (Object.keys(copy).length) out.copy_variants = copy

  const legal: Record<string, unknown> = {}
  if (form.legal_privacy_policy_url) legal.privacy_policy_url = form.legal_privacy_policy_url
  if (form.legal_terms_url) legal.terms_url = form.legal_terms_url
  if (Object.keys(legal).length) out.legal = legal

  return out
}

// ─── UI primitives ────────────────────────────────────────────────────────────

const INPUT = "w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-500 transition"
const LABEL = "block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider"
const SELECT = "w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2.5 text-base text-white focus:outline-none focus:border-yellow-500 transition"

function spanClass(span?: 1 | 2 | 3 | 4): string {
  if (span === 2) return "col-span-2"
  if (span === 3) return "col-span-2 md:col-span-3"
  if (span === 4) return "col-span-2 md:col-span-4"
  return ""
}

function Field({
  label, hint, span,
  ...props
}: { label: string; hint?: string; span?: 1 | 2 | 3 | 4 } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={spanClass(span)}>
      <label className={LABEL}>{label}</label>
      <input className={INPUT} placeholder={hint} {...props} />
    </div>
  )
}

function TextArea({
  label, hint, rows = 3, span,
  ...props
}: { label: string; hint?: string; rows?: number; span?: 1 | 2 | 3 | 4 } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={spanClass(span)}>
      <label className={LABEL}>{label}</label>
      <textarea className={`${INPUT} resize-y`} placeholder={hint} rows={rows} {...props} />
    </div>
  )
}

function Sel({
  label, hint, options, span,
  ...props
}: {
  label: string
  hint?: string
  span?: 1 | 2 | 3 | 4
  options: { value: string; label: string }[]
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={spanClass(span)}>
      <label className={LABEL}>{label}</label>
      <select className={SELECT} {...props}>
        <option value="">{hint ?? "— use default —"}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

function Section({ title, children, open = true }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="border border-zinc-800 rounded-lg overflow-hidden" open={open}>
      <summary className="flex items-center justify-between px-5 py-4 bg-zinc-900 cursor-pointer select-none list-none text-white text-base font-semibold uppercase tracking-widest hover:bg-zinc-800 transition">
        {title}
        <span className="text-zinc-500 text-sm">▾</span>
      </summary>
      <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-950">
        {children}
      </div>
    </details>
  )
}

function DynList<T>({
  label, items, setItems, empty, renderRow,
}: {
  label: string
  items: T[]
  setItems: (v: T[]) => void
  empty: T
  renderRow: (item: T, onChange: (next: T) => void, onRemove: () => void, i: number) => React.ReactNode
}) {
  return (
    <div className="col-span-2 md:col-span-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className={LABEL}>{label}</span>
        <button
          type="button"
          onClick={() => setItems([...items, { ...empty }])}
          className="text-sm text-yellow-400 hover:text-yellow-300 border border-yellow-800 px-3 py-1 rounded"
        >
          + Add
        </button>
      </div>
      {items.map((item, i) =>
        renderRow(
          item,
          (next) => setItems(items.map((x, j) => (j === i ? next : x))),
          () => setItems(items.filter((_, j) => j !== i)),
          i
        )
      )}
      {items.length === 0 && (
        <p className="text-sm text-zinc-600 italic">No entries — click + Add to create one.</p>
      )}
    </div>
  )
}

// ─── Option sets ──────────────────────────────────────────────────────────────

const SPORTS = [
  { value: "Football", label: "Football" },
  { value: "Soccer", label: "Soccer" },
  { value: "Basketball", label: "Basketball" },
  { value: "Baseball", label: "Baseball" },
  { value: "Softball", label: "Softball" },
  { value: "Wrestling", label: "Wrestling" },
  { value: "Tennis", label: "Tennis" },
  { value: "Golf", label: "Golf" },
  { value: "Volleyball", label: "Volleyball" },
  { value: "Lacrosse", label: "Lacrosse" },
  { value: "Track & Field", label: "Track & Field" },
  { value: "Cheerleading/Tumbling", label: "Cheerleading/Tumbling" },
]
const ACCENT_COLORS = [
  { value: "gold", label: "Gold" }, { value: "red", label: "Red" },
  { value: "navy", label: "Navy" }, { value: "green", label: "Green" },
  { value: "purple", label: "Purple" }, { value: "teal", label: "Teal" },
  { value: "pink", label: "Pink" }, { value: "orange", label: "Orange" },
]
const BG_TONES = [
  { value: "pure-black", label: "Pure Black" }, { value: "navy-black", label: "Navy Black" },
  { value: "slate-black", label: "Slate Black" }, { value: "charcoal", label: "Charcoal" },
]
const HERO_LAYOUTS = [
  { value: "full-bleed", label: "Full Bleed" }, { value: "split-right", label: "Split Right" },
  { value: "centered-overlay", label: "Centered Overlay" },
]
const HERO_OVERLAYS = [
  { value: "field-lines", label: "Field Lines" }, { value: "hex-grid", label: "Hex Grid" },
  { value: "dot-grid", label: "Dot Grid" }, { value: "diagonal", label: "Diagonal" },
  { value: "none", label: "None" },
]
const STATS_LAYOUTS = [
  { value: "horizontal-strip", label: "Horizontal Strip" }, { value: "grid-2x2", label: "Grid 2×2" },
  { value: "centered-large", label: "Centered Large" },
]
const PHOTO_TREATMENTS = [
  { value: "grayscale-hover", label: "Grayscale (hover to color)" }, { value: "always-color", label: "Always Color" },
  { value: "duotone", label: "Duotone" }, { value: "high-contrast", label: "High Contrast" },
]
const GALLERY_LAYOUTS = [
  { value: "grid-3col", label: "3-Column Grid" }, { value: "grid-2col", label: "2-Column Grid" },
  { value: "grid-4col", label: "4-Column Grid" }, { value: "masonry", label: "Masonry" },
]
const SERVICES_LAYOUTS = [
  { value: "cards-3col", label: "Cards 3-Column" }, { value: "horizontal-icon-left", label: "Horizontal (Icon Left)" },
  { value: "featured-2small", label: "Featured + 2 Small" },
]
const TESTIMONIAL_LAYOUTS = [
  { value: "cards-2col", label: "Cards 2-Column" }, { value: "single-large-quote", label: "Single Large Quote" },
  { value: "stacked-compact", label: "Stacked Compact" },
]
const ABOUT_FRAMES = [
  { value: "bordered-offset", label: "Bordered Offset" }, { value: "minimal-frame", label: "Minimal Frame" },
  { value: "full-bleed", label: "Full Bleed" }, { value: "circular", label: "Circular" },
]
const FONT_PAIRS = [
  { value: "bebas-inter", label: "Bebas + Inter" }, { value: "oswald-inter", label: "Oswald + Inter" },
  { value: "bebas-poppins", label: "Bebas + Poppins" },
]
const LAYOUTS = [
  { value: "A", label: "Layout A" }, { value: "B", label: "Layout B" },
  { value: "C", label: "Layout C" }, { value: "D", label: "Layout D" },
]
const DAYS = [
  { value: "Monday", label: "Monday" }, { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" }, { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" }, { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
  { value: "Mon–Fri", label: "Mon–Fri (Weekdays)" }, { value: "Weekends", label: "Weekends" },
  { value: "By Appointment", label: "By Appointment" },
]

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminClient({
  coaches,
  initialSlug,
  initialRaw,
}: {
  coaches: string[]
  initialSlug?: string
  initialRaw?: Record<string, unknown> | null
}) {
  const seed = initialRaw ? fromRaw(initialRaw) : null

  const [slug, setSlug] = useState(initialSlug ?? "")
  const [pickerSlug, setPickerSlug] = useState(initialSlug ?? "")
  const [form, setForm] = useState<FormState>(seed?.form ?? EMPTY_FORM)
  const [stats, setStats] = useState<StatsRow[]>(seed?.stats ?? [])
  const [services, setServices] = useState<ServiceRow[]>(seed?.services ?? [])
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>(seed?.testimonials ?? [])
  const [availability, setAvailability] = useState<AvailabilityRow[]>(seed?.availability ?? [])
  const [successStories, setSuccessStories] = useState<SuccessStoryRow[]>(seed?.successStories ?? [])
  const [videos, setVideos] = useState<VideoRow[]>(seed?.videos ?? [])
  const [faq, setFaq] = useState<FAQRow[]>(seed?.faq ?? [])
  const [designTab, setDesignTab] = useState<"A" | "B" | "C">("A")
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleLoad = () => {
    if (!pickerSlug) return
    startTransition(async () => {
      const raw = await loadCoach(pickerSlug)
      if (raw) {
        const data = fromRaw(raw)
        setSlug(pickerSlug)
        setForm(data.form)
        setStats(data.stats)
        setServices(data.services)
        setTestimonials(data.testimonials)
        setAvailability(data.availability)
        setSuccessStories(data.successStories)
        setVideos(data.videos)
        setFaq(data.faq)
        setStatus({ ok: true, msg: `Loaded "${pickerSlug}"` })
      } else {
        setStatus({ ok: false, msg: `Could not load "${pickerSlug}"` })
      }
    })
  }

  const handleNew = () => {
    setSlug("")
    setPickerSlug("")
    setForm(EMPTY_FORM)
    setStats([])
    setServices([])
    setTestimonials([])
    setAvailability([])
    setSuccessStories([])
    setVideos([])
    setFaq([])
    setStatus(null)
  }

  const handleSave = () => {
    if (!slug.trim()) { setStatus({ ok: false, msg: "Slug is required." }); return }
    if (!/^[a-z0-9-]+$/.test(slug)) { setStatus({ ok: false, msg: "Slug must be lowercase letters, numbers, hyphens only." }); return }
    startTransition(async () => {
      const payload = toPayload(form, stats, services, testimonials, availability, successStories, videos, faq)
      const result = await saveCoach(slug, payload)
      if (result.ok) {
        const msg = result.deployed
          ? `Saved & pushed to GitHub — Vercel deploying ${slug} (~1–2 min)`
          : `Saved to prospects/configs/${slug}.json (set GITHUB_TOKEN to auto-deploy)`
        setStatus({ ok: true, msg })
      } else {
        setStatus({ ok: false, msg: result.error ?? "Save failed." })
      }
    })
  }

  const cv = base.copy_variants as Record<string, string>
  const ph = (field: string) => {
    const v = cv[field]
    return v ? `Default: "${v}"` : ""
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex items-center gap-4 flex-wrap">
        <span className="font-bold text-yellow-400 text-base uppercase tracking-widest shrink-0">NSF Admin</span>

        <select
          className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-base text-white focus:outline-none focus:border-yellow-500 flex-1 min-w-[180px] max-w-xs"
          value={pickerSlug}
          onChange={(e) => setPickerSlug(e.target.value)}
        >
          <option value="">— select existing coach —</option>
          {coaches.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <button
          onClick={handleLoad}
          disabled={!pickerSlug || isPending}
          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-base rounded disabled:opacity-40 transition shrink-0"
        >
          Load
        </button>
        <button
          onClick={handleNew}
          className="px-4 py-2 border border-zinc-600 hover:border-yellow-500 text-base rounded transition shrink-0"
        >
          New
        </button>

        <div className="flex items-center gap-3 ml-auto shrink-0">
          {slug && (
            <a
              href={`/?coach=${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-yellow-400 hover:underline"
            >
              Preview ↗
            </a>
          )}
          {status && (
            <span className={`text-sm px-3 py-1.5 rounded ${status.ok ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
              {status.msg}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-base font-bold rounded disabled:opacity-50 transition"
          >
            {isPending ? "Saving…" : "Save"}
          </button>
        </div>
      </header>

      {/* ── Form body ── */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-4">

        {/* ── Slug + Identity ── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <label className={LABEL}>Coach Slug <span className="text-yellow-500">*</span></label>
            <input
              className={INPUT}
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              placeholder="e.g. john-smith"
            />
            <p className="text-xs text-zinc-500 mt-1">File: prospects/configs/{slug || "…"}.json · URL: /?coach={slug || "…"}</p>
          </div>
          <Sel label="Layout Variant" options={LAYOUTS} value={form.layout} onChange={set("layout")} hint="— A (default) —" />
          <Sel label="Sport" options={SPORTS} value={form.about_sport} onChange={set("about_sport")} hint="— Football (default) —" />
        </div>

        {/* ── Meta ── */}
        <Section title="Page Meta" open={false}>
          <Field label="Page Title" value={form.meta_title} onChange={set("meta_title")} hint={`Default: "${base.meta.title}"`} span={3} />
          <Field label="Favicon URL" value={form.meta_favicon_url} onChange={set("meta_favicon_url")} hint="/favicon.ico" />
          <TextArea label="Meta Description" value={form.meta_description} onChange={set("meta_description")} hint={`Default: "${base.meta.description}"`} rows={2} span={4} />
        </Section>

        {/* ── About ── */}
        <Section title="About the Coach">
          <Field label="Full Name" value={form.about_name} onChange={set("about_name")} hint={`Default: "${base.about.name}"`} span={2} />
          <Field label="Title / Role" value={form.about_title} onChange={set("about_title")} hint={`Default: "${base.about.title}"`} span={2} />
          <Field label="City" value={form.about_city} onChange={set("about_city")} hint={`Default: "${base.about.city}"`} />
          <Field label="County" value={form.about_county} onChange={set("about_county")} hint={`Default: "${base.about.county}"`} />
          <Field label="State" value={form.about_state} onChange={set("about_state")} hint={`Default: "${base.about.state}"`} />
          <Field label="Years Experience" value={form.about_years_experience} onChange={set("about_years_experience")} hint={`Default: "${base.about.years_experience}"`} type="number" />
          <Field label="Specialty" value={form.about_specialty} onChange={set("about_specialty")} hint={`Default: "${base.about.specialty}"`} span={2} />
          <Field label="Age Groups" value={form.about_age_groups} onChange={set("about_age_groups")} hint={`Default: "${base.about.age_groups}"`} span={2} />
          <Field label="Credentials (comma-separated)" value={form.about_credentials} onChange={set("about_credentials")} hint="e.g. NFCA Certified, Former D1 Athlete" span={4} />
          <TextArea label="Bio" value={form.about_bio} onChange={set("about_bio")} hint={`Default: "${base.about.bio}"`} rows={3} span={4} />
          <Field label="Photo URL" value={form.about_photo} onChange={set("about_photo")} hint={`Default: "${base.about.photo}"`} span={4} />
        </Section>

        {/* ── Hero ── */}
        <Section title="Hero Section">
          <Field label="Headline" value={form.hero_headline} onChange={set("hero_headline")} hint={`Default: "${base.hero.headline}"`} span={4} />
          <TextArea label="Subline" value={form.hero_subline} onChange={set("hero_subline")} hint={`Default: "${base.hero.subline}"`} rows={2} span={4} />
          <Field label="CTA Button Text" value={form.hero_cta_text} onChange={set("hero_cta_text")} hint={`Default: "${base.hero.cta_text}"`} span={2} />
          <Field label="CTA URL" value={form.hero_cta_url} onChange={set("hero_cta_url")} hint={`Default: "${base.hero.cta_url}"`} span={2} />
          <Field label="Hero Photo URL" value={form.hero_photo} onChange={set("hero_photo")} hint={`Default: "${base.hero.photo}"`} span={4} />
        </Section>

        {/* ── Stats ── */}
        <Section title="Stats Bar">
          <DynList
            label="Stats (value + label pairs)"
            items={stats}
            setItems={setStats}
            empty={{ value: "", label: "" }}
            renderRow={(item, onChange, onRemove, i) => (
              <div key={i} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className={LABEL}>Value</label>
                  <input className={INPUT} value={item.value} onChange={(e) => onChange({ ...item, value: e.target.value })} placeholder="e.g. 500+" />
                </div>
                <div className="flex-1">
                  <label className={LABEL}>Label</label>
                  <input className={INPUT} value={item.label} onChange={(e) => onChange({ ...item, label: e.target.value })} placeholder="e.g. Athletes Trained" />
                </div>
                <button type="button" onClick={onRemove} className="text-zinc-500 hover:text-red-400 pb-2.5 text-xl">×</button>
              </div>
            )}
          />
        </Section>

        {/* ── Services ── */}
        <Section title="Services">
          <DynList
            label="Services"
            items={services}
            setItems={setServices}
            empty={{ title: "", description: "", price: "" }}
            renderRow={(item, onChange, onRemove, i) => (
              <div key={i} className="border border-zinc-800 rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400 font-semibold uppercase">Service {i + 1}</span>
                  <button type="button" onClick={onRemove} className="text-zinc-500 hover:text-red-400 text-xl leading-none">×</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className={LABEL}>Title</label>
                    <input className={INPUT} value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} placeholder="e.g. 1-on-1 Skills Training" />
                  </div>
                  <div>
                    <label className={LABEL}>Price</label>
                    <input className={INPUT} value={item.price} onChange={(e) => onChange({ ...item, price: e.target.value })} placeholder="e.g. $75/session" />
                  </div>
                </div>
                <div>
                  <label className={LABEL}>Description</label>
                  <textarea className={`${INPUT} resize-y`} rows={2} value={item.description} onChange={(e) => onChange({ ...item, description: e.target.value })} placeholder="What's included…" />
                </div>
              </div>
            )}
          />
        </Section>

        {/* ── Testimonials ── */}
        <Section title="Testimonials">
          <DynList
            label="Testimonials"
            items={testimonials}
            setItems={setTestimonials}
            empty={{ quote: "", name: "", role: "" }}
            renderRow={(item, onChange, onRemove, i) => (
              <div key={i} className="border border-zinc-800 rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400 font-semibold uppercase">Testimonial {i + 1}</span>
                  <button type="button" onClick={onRemove} className="text-zinc-500 hover:text-red-400 text-xl leading-none">×</button>
                </div>
                <div>
                  <label className={LABEL}>Quote</label>
                  <textarea className={`${INPUT} resize-y`} rows={3} value={item.quote} onChange={(e) => onChange({ ...item, quote: e.target.value })} placeholder="What they said…" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Name</label>
                    <input className={INPUT} value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} placeholder="e.g. Marcus T." />
                  </div>
                  <div>
                    <label className={LABEL}>Role</label>
                    <input className={INPUT} value={item.role} onChange={(e) => onChange({ ...item, role: e.target.value })} placeholder="e.g. Parent of 10th-grade WR" />
                  </div>
                </div>
              </div>
            )}
          />
        </Section>

        {/* ── Gallery ── */}
        <Section title="Gallery Photos" open={false}>
          <TextArea
            label="Photo URLs (one per line)"
            value={form.gallery_photos}
            onChange={set("gallery_photos")}
            hint="/stock/football/gallery/gallery-01.jpg"
            rows={6}
            span={4}
          />
          <p className="col-span-2 md:col-span-4 text-xs text-zinc-500">Remote images must be from res.cloudinary.com or images.unsplash.com.</p>
        </Section>

        {/* ── Video Gallery ── */}
        <Section title="Video Gallery" open={false}>
          <DynList
            label="Videos"
            items={videos}
            setItems={setVideos}
            empty={{ title: "", youtube_url: "", description: "" }}
            renderRow={(item, onChange, onRemove, i) => (
              <div key={i} className="border border-zinc-800 rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400 font-semibold uppercase">Video {i + 1}</span>
                  <button type="button" onClick={onRemove} className="text-zinc-500 hover:text-red-400 text-xl leading-none">×</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Title</label>
                    <input className={INPUT} value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} placeholder="e.g. Spring Combine Highlights" />
                  </div>
                  <div>
                    <label className={LABEL}>YouTube URL</label>
                    <input className={INPUT} value={item.youtube_url} onChange={(e) => onChange({ ...item, youtube_url: e.target.value })} placeholder="https://youtube.com/watch?v=…" />
                  </div>
                </div>
                <div>
                  <label className={LABEL}>Description (optional)</label>
                  <input className={INPUT} value={item.description} onChange={(e) => onChange({ ...item, description: e.target.value })} placeholder="Brief description…" />
                </div>
              </div>
            )}
          />
        </Section>

        {/* ── Contact ── */}
        <Section title="Contact">
          <Field label="Phone" value={form.contact_phone} onChange={set("contact_phone")} hint={`Default: "${base.contact.phone}"`} span={2} />
          <Field label="Email" value={form.contact_email} onChange={set("contact_email")} hint={`Default: "${base.contact.email}"`} span={2} />
          <Field label="Booking URL" value={form.contact_booking_url} onChange={set("contact_booking_url")} hint="https://…" span={2} />
          <Field label="Calendly URL" value={form.contact_calendly_url} onChange={set("contact_calendly_url")} hint="https://calendly.com/…" span={2} />
          <Field label="Formspree ID" value={form.contact_formspree_id} onChange={set("contact_formspree_id")} hint={`Default: "${base.contact.formspree_id}"`} span={2} />
          <div className="col-span-2" />
          <Field label="Instagram Handle" value={form.contact_instagram} onChange={set("contact_instagram")} hint="@coachname" span={2} />
          <Field label="Twitter / X Handle" value={form.contact_twitter} onChange={set("contact_twitter")} hint="@coachname" />
          <Field label="YouTube Channel URL" value={form.contact_youtube} onChange={set("contact_youtube")} hint="https://youtube.com/@…" />
          <TextArea
            label="Business Hours (one per line)"
            value={form.contact_business_hours}
            onChange={set("contact_business_hours")}
            hint={"Mon–Fri: 6am–8pm\nSat: 8am–2pm\nSun: Closed"}
            rows={4}
            span={4}
          />
        </Section>

        {/* ── Availability ── */}
        <Section title="Weekly Availability" open={false}>
          <Field
            label="Availability Note"
            value={form.availability_note}
            onChange={set("availability_note")}
            hint="e.g. Spots are limited — book early for best selection"
            span={4}
          />
          <DynList
            label="Schedule (day + time slots)"
            items={availability}
            setItems={setAvailability}
            empty={{ day: "", slots: "" }}
            renderRow={(item, onChange, onRemove, i) => (
              <div key={i} className="flex gap-3 items-end">
                <div className="w-52 shrink-0">
                  <label className={LABEL}>Day</label>
                  <select
                    className={SELECT}
                    value={item.day}
                    onChange={(e) => onChange({ ...item, day: e.target.value })}
                  >
                    <option value="">— select —</option>
                    {DAYS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className={LABEL}>Time Slots (comma-separated)</label>
                  <input className={INPUT} value={item.slots} onChange={(e) => onChange({ ...item, slots: e.target.value })} placeholder="e.g. 7am–9am, 4pm–6pm" />
                </div>
                <button type="button" onClick={onRemove} className="text-zinc-500 hover:text-red-400 pb-2.5 text-xl">×</button>
              </div>
            )}
          />
        </Section>

        {/* ── Success Stories ── */}
        <Section title="Success Stories" open={false}>
          <DynList
            label="Success Stories"
            items={successStories}
            setItems={setSuccessStories}
            empty={{ name: "", role: "", story: "", result: "" }}
            renderRow={(item, onChange, onRemove, i) => (
              <div key={i} className="border border-zinc-800 rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400 font-semibold uppercase">Story {i + 1}</span>
                  <button type="button" onClick={onRemove} className="text-zinc-500 hover:text-red-400 text-xl leading-none">×</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>Athlete Name</label>
                    <input className={INPUT} value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} placeholder="e.g. Marcus J." />
                  </div>
                  <div>
                    <label className={LABEL}>Role / Grade</label>
                    <input className={INPUT} value={item.role} onChange={(e) => onChange({ ...item, role: e.target.value })} placeholder="e.g. 10th Grade WR" />
                  </div>
                </div>
                <div>
                  <label className={LABEL}>Story</label>
                  <textarea className={`${INPUT} resize-y`} rows={2} value={item.story} onChange={(e) => onChange({ ...item, story: e.target.value })} placeholder="Brief background before training…" />
                </div>
                <div>
                  <label className={LABEL}>Result / Achievement</label>
                  <input className={INPUT} value={item.result} onChange={(e) => onChange({ ...item, result: e.target.value })} placeholder="e.g. Earned Division I scholarship" />
                </div>
              </div>
            )}
          />
        </Section>

        {/* ── FAQ ── */}
        <Section title="FAQ" open={false}>
          <DynList
            label="Frequently Asked Questions"
            items={faq}
            setItems={setFaq}
            empty={{ question: "", answer: "" }}
            renderRow={(item, onChange, onRemove, i) => (
              <div key={i} className="border border-zinc-800 rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400 font-semibold uppercase">Q{i + 1}</span>
                  <button type="button" onClick={onRemove} className="text-zinc-500 hover:text-red-400 text-xl leading-none">×</button>
                </div>
                <div>
                  <label className={LABEL}>Question</label>
                  <input className={INPUT} value={item.question} onChange={(e) => onChange({ ...item, question: e.target.value })} placeholder="e.g. How long are sessions?" />
                </div>
                <div>
                  <label className={LABEL}>Answer</label>
                  <textarea className={`${INPUT} resize-y`} rows={2} value={item.answer} onChange={(e) => onChange({ ...item, answer: e.target.value })} placeholder="e.g. Sessions are 60 minutes and tailored to each athlete…" />
                </div>
              </div>
            )}
          />
        </Section>

        {/* ── Training Locations ── */}
        <Section title="Training Locations" open={false}>
          <TextArea
            label="Cities / Areas Served (one per line)"
            value={form.training_cities}
            onChange={set("training_cities")}
            hint={"Jacksonville\nOrange Park\nFleming Island"}
            rows={4}
            span={4}
          />
        </Section>

        {/* ── Legal ── */}
        <Section title="Legal & Compliance" open={false}>
          <Field label="Privacy Policy URL" value={form.legal_privacy_policy_url} onChange={set("legal_privacy_policy_url")} hint="https://…" span={2} />
          <Field label="Terms of Service URL" value={form.legal_terms_url} onChange={set("legal_terms_url")} hint="https://…" span={2} />
        </Section>

        {/* ── Design ── */}
        <details className="border border-zinc-800 rounded-lg overflow-hidden" open>
          <summary className="flex items-center justify-between px-5 py-4 bg-zinc-900 cursor-pointer select-none list-none text-white text-base font-semibold uppercase tracking-widest hover:bg-zinc-800 transition">
            Design
            <span className="text-zinc-500 text-sm">▾</span>
          </summary>
          <div className="bg-zinc-950">
            <div className="flex border-b border-zinc-800 px-5">
              {(["A", "B", "C"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setDesignTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold uppercase tracking-wider transition ${designTab === tab ? "text-yellow-400 border-b-2 border-yellow-400" : "text-zinc-500 hover:text-white"}`}
                >
                  Layout {tab}
                </button>
              ))}
            </div>

            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              {designTab === "A" && (
                <>
                  <Sel label="Accent Color" options={ACCENT_COLORS} value={form.design_accent_color} onChange={set("design_accent_color")} hint={`Default: "${base.design.accent_color}"`} />
                  <Sel label="Background Tone" options={BG_TONES} value={form.design_background_tone} onChange={set("design_background_tone")} hint={`Default: "${base.design.background_tone}"`} />
                  <Sel label="Hero Layout" options={HERO_LAYOUTS} value={form.design_hero_layout} onChange={set("design_hero_layout")} hint={`Default: "${base.design.hero_layout}"`} />
                  <Sel label="Hero Overlay" options={HERO_OVERLAYS} value={form.design_hero_overlay} onChange={set("design_hero_overlay")} hint={`Default: "${base.design.hero_overlay}"`} />
                  <Sel label="Stats Layout" options={STATS_LAYOUTS} value={form.design_stats_layout} onChange={set("design_stats_layout")} hint={`Default: "${base.design.stats_layout}"`} />
                  <Sel label="Photo Treatment" options={PHOTO_TREATMENTS} value={form.design_photo_treatment} onChange={set("design_photo_treatment")} hint={`Default: "${base.design.photo_treatment}"`} />
                  <Sel label="Gallery Layout" options={GALLERY_LAYOUTS} value={form.design_gallery_layout} onChange={set("design_gallery_layout")} hint={`Default: "${base.design.gallery_layout}"`} />
                  <Sel label="Services Layout" options={SERVICES_LAYOUTS} value={form.design_services_layout} onChange={set("design_services_layout")} hint={`Default: "${base.design.services_layout}"`} />
                  <Sel label="Testimonials Layout" options={TESTIMONIAL_LAYOUTS} value={form.design_testimonials_layout} onChange={set("design_testimonials_layout")} hint={`Default: "${base.design.testimonials_layout}"`} />
                  <Sel label="About Frame" options={ABOUT_FRAMES} value={form.design_about_frame} onChange={set("design_about_frame")} hint={`Default: "${base.design.about_frame}"`} />
                  <Sel label="Font Pair" options={FONT_PAIRS} value={form.design_font_pair} onChange={set("design_font_pair")} hint={`Default: "${base.design.font_pair}"`} />
                </>
              )}
              {designTab === "B" && (
                <>
                  <p className="col-span-2 md:col-span-4 text-xs text-zinc-500 -mb-1">Layout B overrides. Leave blank to inherit Layout A values.</p>
                  <Sel label="B Accent Color" options={ACCENT_COLORS} value={form.design_b_accent_color} onChange={set("design_b_accent_color")} hint="— inherit A —" />
                  <Sel label="B Background Tone" options={BG_TONES} value={form.design_b_background_tone} onChange={set("design_b_background_tone")} hint="— inherit A —" />
                  <Sel label="B Hero Layout" options={[...HERO_LAYOUTS, { value: "split-left", label: "Split Left" }]} value={form.design_b_hero_layout} onChange={set("design_b_hero_layout")} hint="— inherit A —" />
                  <Sel label="B Hero Overlay" options={HERO_OVERLAYS} value={form.design_b_hero_overlay} onChange={set("design_b_hero_overlay")} hint="— inherit A —" />
                  <Sel label="B Stats Layout" options={[...STATS_LAYOUTS, { value: "accent-bar", label: "Accent Bar" }]} value={form.design_b_stats_layout} onChange={set("design_b_stats_layout")} hint="— inherit A —" />
                  <Sel label="B Photo Treatment" options={PHOTO_TREATMENTS} value={form.design_b_photo_treatment} onChange={set("design_b_photo_treatment")} hint="— inherit A —" />
                  <Sel label="B Gallery Layout" options={[...GALLERY_LAYOUTS, { value: "featured-grid", label: "Featured Grid" }]} value={form.design_b_gallery_layout} onChange={set("design_b_gallery_layout")} hint="— inherit A —" />
                  <Sel label="B Services Layout" options={SERVICES_LAYOUTS} value={form.design_b_services_layout} onChange={set("design_b_services_layout")} hint="— inherit A —" />
                  <Sel label="B Testimonials Layout" options={TESTIMONIAL_LAYOUTS} value={form.design_b_testimonials_layout} onChange={set("design_b_testimonials_layout")} hint="— inherit A —" />
                  <Sel label="B About Frame" options={[...ABOUT_FRAMES, { value: "centered-stack", label: "Centered Stack" }]} value={form.design_b_about_layout} onChange={set("design_b_about_layout")} hint="— inherit A —" />
                  <Sel label="B Font Pair" options={FONT_PAIRS} value={form.design_b_font_pair} onChange={set("design_b_font_pair")} hint="— inherit A —" />
                  <Field label="B Palette Override" value={form.design_b_palette} onChange={set("design_b_palette")} hint="e.g. dark-gold" />
                </>
              )}
              {designTab === "C" && (
                <>
                  <p className="col-span-2 md:col-span-4 text-xs text-zinc-500 -mb-1">Layout C overrides. Leave blank to inherit Layout A values.</p>
                  <Sel label="C Accent Color" options={ACCENT_COLORS} value={form.design_c_accent_color} onChange={set("design_c_accent_color")} hint="— inherit A —" />
                  <Sel label="C Background Tone" options={BG_TONES} value={form.design_c_background_tone} onChange={set("design_c_background_tone")} hint="— inherit A —" />
                  <Sel label="C Hero Layout" options={HERO_LAYOUTS} value={form.design_c_hero_layout} onChange={set("design_c_hero_layout")} hint="— inherit A —" />
                  <Sel label="C Hero Overlay" options={HERO_OVERLAYS} value={form.design_c_hero_overlay} onChange={set("design_c_hero_overlay")} hint="— inherit A —" />
                  <Sel label="C Stats Layout" options={STATS_LAYOUTS} value={form.design_c_stats_layout} onChange={set("design_c_stats_layout")} hint="— inherit A —" />
                  <Sel label="C Photo Treatment" options={PHOTO_TREATMENTS} value={form.design_c_photo_treatment} onChange={set("design_c_photo_treatment")} hint="— inherit A —" />
                  <Sel label="C Gallery Layout" options={[...GALLERY_LAYOUTS, { value: "asymmetric", label: "Asymmetric" }]} value={form.design_c_gallery_layout} onChange={set("design_c_gallery_layout")} hint="— inherit A —" />
                  <Sel label="C Services Layout" options={[...SERVICES_LAYOUTS, { value: "numbered-rows", label: "Numbered Rows" }]} value={form.design_c_services_layout} onChange={set("design_c_services_layout")} hint="— inherit A —" />
                  <Sel label="C Testimonials Layout" options={[...TESTIMONIAL_LAYOUTS, { value: "centered-quote", label: "Centered Quote" }]} value={form.design_c_testimonials_layout} onChange={set("design_c_testimonials_layout")} hint="— inherit A —" />
                  <Sel label="C About Frame" options={[...ABOUT_FRAMES, { value: "photo-left", label: "Photo Left" }]} value={form.design_c_about_layout} onChange={set("design_c_about_layout")} hint="— inherit A —" />
                  <Sel label="C Font Pair" options={FONT_PAIRS} value={form.design_c_font_pair} onChange={set("design_c_font_pair")} hint="— inherit A —" />
                </>
              )}
            </div>
          </div>
        </details>

        {/* ── Copy & Taglines ── */}
        <Section title="Copy & Taglines" open={false}>
          <Field label="Hero Tagline" value={form.copy_hero_tagline} onChange={set("copy_hero_tagline")} hint={ph("hero_tagline")} span={2} />
          <Field label="Hero Availability Badge" value={form.copy_hero_availability} onChange={set("copy_hero_availability")} hint={ph("hero_availability")} />
          <Field label="Hero Learn More Button" value={form.copy_hero_learn_more_text} onChange={set("copy_hero_learn_more_text")} hint={ph("hero_learn_more_text")} />
          <Field label="Coach Label" value={form.copy_coach_label} onChange={set("copy_coach_label")} hint={ph("coach_label")} />
          <Field label="About Section Prefix" value={form.copy_about_section_prefix} onChange={set("copy_about_section_prefix")} hint={ph("about_section_prefix")} />
          <Field label="About Tagline" value={form.copy_about_tagline} onChange={set("copy_about_tagline")} hint={ph("about_tagline")} span={2} />
          <TextArea label="About Quote" value={form.copy_about_quote} onChange={set("copy_about_quote")} hint={ph("about_quote")} rows={2} span={4} />
          <Field label="Services Tagline" value={form.copy_services_tagline} onChange={set("copy_services_tagline")} hint={ph("services_tagline")} span={2} />
          <Field label="Services CTA Text" value={form.copy_services_cta_text} onChange={set("copy_services_cta_text")} hint={ph("services_cta_text")} />
          <Field label="Services Eyebrow Suffix" value={form.copy_services_eyebrow_suffix} onChange={set("copy_services_eyebrow_suffix")} hint={ph("services_eyebrow_suffix")} />
          <TextArea label="Services Subline" value={form.copy_services_subline} onChange={set("copy_services_subline")} hint={ph("services_subline")} rows={2} span={4} />
          <Field label="Testimonials Tagline" value={form.copy_testimonials_tagline} onChange={set("copy_testimonials_tagline")} hint={ph("testimonials_tagline")} span={2} />
          <Field label="Testimonials Eyebrow" value={form.copy_testimonials_eyebrow} onChange={set("copy_testimonials_eyebrow")} hint={ph("testimonials_eyebrow")} span={2} />
          <Field label="Contact Eyebrow" value={form.copy_contact_eyebrow} onChange={set("copy_contact_eyebrow")} hint={ph("contact_eyebrow")} />
          <Field label="Contact Headline" value={form.copy_contact_headline} onChange={set("copy_contact_headline")} hint={ph("contact_headline")} />
          <Field label="Contact Tagline" value={form.copy_contact_tagline} onChange={set("copy_contact_tagline")} hint={ph("contact_tagline")} span={2} />
          <TextArea label="Contact Offer" value={form.copy_contact_offer} onChange={set("copy_contact_offer")} hint={ph("contact_offer")} rows={2} span={2} />
          <TextArea label="Contact Urgency" value={form.copy_contact_urgency} onChange={set("copy_contact_urgency")} hint={ph("contact_urgency")} rows={2} span={2} />
          <Field label="Contact Subline" value={form.copy_contact_subline} onChange={set("copy_contact_subline")} hint={ph("contact_subline")} span={2} />
          <Field label="Gallery Label" value={form.copy_gallery_label} onChange={set("copy_gallery_label")} hint={ph("gallery_label")} />
          <Field label="Gallery Heading" value={form.copy_gallery_heading} onChange={set("copy_gallery_heading")} hint={ph("gallery_heading")} />
          <Field label="Footer Marquee Text" value={form.copy_marquee_text} onChange={set("copy_marquee_text")} hint={ph("marquee_text")} span={4} />
          <div className="col-span-2 md:col-span-4 border-t border-zinc-800 pt-3">
            <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider font-semibold">Layout C Specific Copy</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="C Hero Watermark Text" value={form.copy_c_hero_watermark_text} onChange={set("copy_c_hero_watermark_text")} hint={ph("c_hero_watermark_text")} span={2} />
              <Field label="C Contact Reply Time" value={form.copy_c_contact_reply_time} onChange={set("copy_c_contact_reply_time")} hint={ph("c_contact_reply_time")} />
              <Field label="C Film Label" value={form.copy_c_film_label} onChange={set("copy_c_film_label")} hint={ph("c_film_label")} />
            </div>
          </div>
        </Section>

        <div className="h-8" />
      </main>
    </div>
  )
}
