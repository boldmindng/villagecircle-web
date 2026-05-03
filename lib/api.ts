import {
  boldMindAPI,
  configure,
  type AfroHustleBlueprint,
  type BorderlessTransfer,
  type FxQuote,
  type FarmgateListing,
  type FarmgateOrder,
  type KoloTranslation,
  type KoloLanguagePair,
  type NaijaGig,
  type GigApplication,
  type Receipt,
  type ReceiptStats,
  type SafeAIIncident,
  type SafeAIAlert,
  type SafeAIWanted,
  type PoliceStation,
  type Skill2CashProfile,
  type VibeCoderApplicant,
  type VibeCohort,
  type PaystackInit,
  type ApiResponse,
  type PaginatedResponse,
} from '@boldmind-tech/api-client';

// Configure base URL from env
configure({
  baseUrl:
    process.env['NEXT_PUBLIC_API_URL']?.replace(/\/$/, '') ??
    'http://localhost:4001/api/v1',
});

// ─── AfroHustle (/villagecircle/afrohustle) ───────────────────────────────────

export const afroHustleAPI = {
  categories: () => boldMindAPI.villageCircle.afroHustle.categories(),
  featured: () => boldMindAPI.villageCircle.afroHustle.featured(),
  browse: (params?: { page?: number; limit?: number; category?: string }) =>
    boldMindAPI.villageCircle.afroHustle.browse(params),
  getBySlug: (slug: string) => boldMindAPI.villageCircle.afroHustle.getBySlug(slug),
  get: (id: string) => boldMindAPI.villageCircle.afroHustle.get(id),
  generate: (data: { industry: string; skills?: string[]; capital?: string }) =>
    boldMindAPI.villageCircle.afroHustle.generate(data),
};

// ─── BorderlessRemit (/villagecircle/borderless-remit) ────────────────────────

export const borderlessRemitAPI = {
  currencies: () => boldMindAPI.villageCircle.borderlessRemit.currencies(),
  quote: (params: { amount: number; from: string; to: string }) =>
    boldMindAPI.villageCircle.borderlessRemit.quote(params),
  transfer: (data: {
    amount: number;
    sendCurrency: string;
    receiveCurrency: string;
    recipientName: string;
    recipientBank?: string;
    recipientAccount?: string;
    recipientPhone?: string;
  }) => boldMindAPI.villageCircle.borderlessRemit.transfer(data),
  transfers: (params?: { page?: number; limit?: number }) =>
    boldMindAPI.villageCircle.borderlessRemit.transfers(params),
  track: (trackingId: string) =>
    boldMindAPI.villageCircle.borderlessRemit.trackTransfer(trackingId),
  cancel: (trackingId: string) =>
    boldMindAPI.villageCircle.borderlessRemit.cancelTransfer(trackingId),
};

// ─── FarmgateDirect (/villagecircle/farmgate) ─────────────────────────────────

export const farmgateAPI = {
  categories: () => boldMindAPI.villageCircle.farmgate.categories(),
  browse: (params?: { page?: number; limit?: number; category?: string; location?: string }) =>
    boldMindAPI.villageCircle.farmgate.browse(params),
  get: (id: string) => boldMindAPI.villageCircle.farmgate.get(id),
  create: (data: Partial<FarmgateListing>) => boldMindAPI.villageCircle.farmgate.create(data),
  myListings: () => boldMindAPI.villageCircle.farmgate.myListings(),
  update: (id: string, data: Partial<FarmgateListing>) =>
    boldMindAPI.villageCircle.farmgate.update(id, data),
  delete: (id: string) => boldMindAPI.villageCircle.farmgate.delete(id),
  placeOrder: (id: string, data: { quantity: number; deliveryAddress?: string }) =>
    boldMindAPI.villageCircle.farmgate.placeOrder(id, data),
};

// ─── KoloAI (/villagecircle/kolo-ai) ─────────────────────────────────────────

export const koloAIAPI = {
  languages: () => boldMindAPI.villageCircle.koloAI.languages(),
  translate: (data: { text: string; sourceLang: string; targetLang: string }) =>
    boldMindAPI.villageCircle.koloAI.translate(data),
  history: (params?: { page?: number; limit?: number }) =>
    boldMindAPI.villageCircle.koloAI.history(params),
  feedback: (id: string, data: { rating: number; comment?: string }) =>
    boldMindAPI.villageCircle.koloAI.feedback(id, data),
};

// ─── NaijaGig (/villagecircle/naijagig) ──────────────────────────────────────

export const naijaGigAPI = {
  categories: () => boldMindAPI.villageCircle.naijaGig.categories(),
  create: (data: Partial<NaijaGig>) => boldMindAPI.villageCircle.naijaGig.create(data),
  browse: (params?: { page?: number; limit?: number; category?: string; location?: string }) =>
    boldMindAPI.villageCircle.naijaGig.browse(params),
  mine: () => boldMindAPI.villageCircle.naijaGig.mine(),
  get: (id: string) => boldMindAPI.villageCircle.naijaGig.get(id),
  update: (id: string, data: Partial<NaijaGig>) =>
    boldMindAPI.villageCircle.naijaGig.update(id, data),
  delete: (id: string) => boldMindAPI.villageCircle.naijaGig.delete(id),
  apply: (id: string, data: { coverNote?: string }) =>
    boldMindAPI.villageCircle.naijaGig.apply(id, data),
  updateApplication: (gigId: string, artisanId: string, status: 'accepted' | 'rejected') =>
    boldMindAPI.villageCircle.naijaGig.updateApplication(gigId, artisanId, status),
};

// ─── ReceiptGenius (/villagecircle/receiptgenius) ─────────────────────────────

export const receiptGeniusAPI = {
  create: (data: Partial<Receipt>) => boldMindAPI.villageCircle.receiptGenius.create(data),
  list: (params?: { page?: number; limit?: number; type?: 'receipt' | 'invoice' }) =>
    boldMindAPI.villageCircle.receiptGenius.list(params),
  stats: () => boldMindAPI.villageCircle.receiptGenius.stats(),
  get: (id: string) => boldMindAPI.villageCircle.receiptGenius.get(id),
  update: (id: string, data: Partial<Receipt>) =>
    boldMindAPI.villageCircle.receiptGenius.update(id, data),
  delete: (id: string) => boldMindAPI.villageCircle.receiptGenius.delete(id),
};

// ─── SafeAI (/villagecircle/safeai) ──────────────────────────────────────────

export const safeAIAPI = {
  reportIncident: (data: { type: string; description: string; location: string; lat?: number; lng?: number }) =>
    boldMindAPI.villageCircle.safeAI.reportIncident(data),
  incidents: (params?: { page?: number; limit?: number; type?: string }) =>
    boldMindAPI.villageCircle.safeAI.incidents(params),
  getIncident: (id: string) => boldMindAPI.villageCircle.safeAI.getIncident(id),
  hotspots: () => boldMindAPI.villageCircle.safeAI.hotspots(),
  alerts: () => boldMindAPI.villageCircle.safeAI.alerts(),
  wanted: (params?: { page?: number; limit?: number }) =>
    boldMindAPI.villageCircle.safeAI.wanted(params),
  stations: (params?: { lat?: number; lng?: number; radius?: number }) =>
    boldMindAPI.villageCircle.safeAI.stations(params),
  emergency: (data: { location: string; lat?: number; lng?: number; description?: string }) =>
    boldMindAPI.villageCircle.safeAI.emergency(data),
  admin: boldMindAPI.villageCircle.safeAI.admin,
};

// ─── Skill2Cash (/villagecircle/skill2cash) ───────────────────────────────────

export const skill2CashAPI = {
  browse: (params?: { page?: number; limit?: number; skill?: string; location?: string }) =>
    boldMindAPI.villageCircle.skill2Cash.browse(params),
  getProfile: (id: string) => boldMindAPI.villageCircle.skill2Cash.getProfile(id),
  createAnonymous: (data: Partial<Skill2CashProfile>) =>
    boldMindAPI.villageCircle.skill2Cash.createAnonymous(data),
  createOrUpdate: (data: Partial<Skill2CashProfile>) =>
    boldMindAPI.villageCircle.skill2Cash.createOrUpdate(data),
  me: () => boldMindAPI.villageCircle.skill2Cash.me(),
  update: (id: string, data: Partial<Skill2CashProfile>) =>
    boldMindAPI.villageCircle.skill2Cash.update(id, data),
  setAvailability: (availability: Skill2CashProfile['availability']) =>
    boldMindAPI.villageCircle.skill2Cash.setAvailability(availability),
};

// ─── VibeCoders (/vibecoders) ─────────────────────────────────────────────────

export const vibeCodersAPI = {
  apply: (data: { name: string; email: string; phone?: string; whyJoin?: string; githubUrl?: string }) =>
    boldMindAPI.vibeCoders.apply(data),
  validateAssessment: (token: string) =>
    boldMindAPI.vibeCoders.validateAssessment(token),
  submitAssessment: (data: { token: string; answers: Record<string, unknown> }) =>
    boldMindAPI.vibeCoders.submitAssessment(data),
  cohort: () => boldMindAPI.vibeCoders.cohort(),
  payment: {
    initialize: (data: { email: string; callbackUrl: string }) =>
      boldMindAPI.vibeCoders.payment.initialize(data),
  },
  admin: {
    applicants: (params?: { page?: number; limit?: number; status?: string }) =>
      boldMindAPI.vibeCoders.admin.applicants(params),
    updateApplicant: (id: string, data: { status: VibeCoderApplicant['status']; note?: string }) =>
      boldMindAPI.vibeCoders.admin.updateApplicant(id, data),
    enroll: (data: { applicantId: string; cohort?: string }) =>
      boldMindAPI.vibeCoders.admin.enroll(data),
    stats: () => boldMindAPI.vibeCoders.admin.stats(),
  },
};

// ─── Auth (re-export for convenience) ────────────────────────────────────────

export const authAPI = boldMindAPI.auth;
export const paymentAPI = boldMindAPI.payments;
export const userAPI = boldMindAPI.user;

// ─── Unified export ───────────────────────────────────────────────────────────

export const api = {
  afroHustle:     afroHustleAPI,
  borderlessRemit: borderlessRemitAPI,
  farmgate:       farmgateAPI,
  koloAI:         koloAIAPI,
  naijaGig:       naijaGigAPI,
  receiptGenius:  receiptGeniusAPI,
  safeAI:         safeAIAPI,
  skill2Cash:     skill2CashAPI,
  vibeCoders:     vibeCodersAPI,
  auth:           authAPI,
  payment:        paymentAPI,
  user:           userAPI,
};

export default api;
