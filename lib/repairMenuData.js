const modelPriceTiers = {
  legacy: 0.85,
  standard: 1,
  plus: 1.08,
  premium: 1.15,
  ultra: 1.22,
};

export const IPHONE_MODELS = [
  { name: "iPhone XS", slug: "iphone-xs", tier: "legacy" },
  { name: "iPhone XS Max", slug: "iphone-xs-max", tier: "legacy" },
  { name: "iPhone XR", slug: "iphone-xr", tier: "legacy" },
  { name: "iPhone 11", slug: "iphone-11", tier: "standard" },
  { name: "iPhone 11 Pro", slug: "iphone-11-pro", tier: "premium" },
  { name: "iPhone 11 Pro Max", slug: "iphone-11-pro-max", tier: "premium" },
  { name: "iPhone SE (2nd Gen)", slug: "iphone-se-2", tier: "legacy" },
  { name: "iPhone 12 mini", slug: "iphone-12-mini", tier: "standard" },
  { name: "iPhone 12", slug: "iphone-12", tier: "standard" },
  { name: "iPhone 12 Pro", slug: "iphone-12-pro", tier: "premium" },
  { name: "iPhone 12 Pro Max", slug: "iphone-12-pro-max", tier: "premium" },
  { name: "iPhone 13 mini", slug: "iphone-13-mini", tier: "standard" },
  { name: "iPhone 13", slug: "iphone-13", tier: "standard" },
  { name: "iPhone 13 Pro", slug: "iphone-13-pro", tier: "premium" },
  { name: "iPhone 13 Pro Max", slug: "iphone-13-pro-max", tier: "premium" },
  { name: "iPhone SE (3rd Gen)", slug: "iphone-se-3", tier: "standard" },
  { name: "iPhone 14", slug: "iphone-14", tier: "standard" },
  { name: "iPhone 14 Plus", slug: "iphone-14-plus", tier: "plus" },
  { name: "iPhone 14 Pro", slug: "iphone-14-pro", tier: "premium" },
  { name: "iPhone 14 Pro Max", slug: "iphone-14-pro-max", tier: "ultra" },
  { name: "iPhone 15", slug: "iphone-15", tier: "standard" },
  { name: "iPhone 15 Plus", slug: "iphone-15-plus", tier: "plus" },
  { name: "iPhone 15 Pro", slug: "iphone-15-pro", tier: "premium" },
  { name: "iPhone 15 Pro Max", slug: "iphone-15-pro-max", tier: "ultra" },
  { name: "iPhone 16", slug: "iphone-16", tier: "standard" },
  { name: "iPhone 16 Plus", slug: "iphone-16-plus", tier: "plus" },
  { name: "iPhone 16 Pro", slug: "iphone-16-pro", tier: "premium" },
  { name: "iPhone 16 Pro Max", slug: "iphone-16-pro-max", tier: "ultra" },
  { name: "iPhone 17", slug: "iphone-17", tier: "standard" },
  { name: "iPhone 17 Plus", slug: "iphone-17-plus", tier: "plus" },
  { name: "iPhone 17 Pro", slug: "iphone-17-pro", tier: "premium" },
  { name: "iPhone 17 Pro Max", slug: "iphone-17-pro-max", tier: "ultra" },
];

const BASE_IPHONE_SERVICE_MENU = [
  { id: "battery-replacement", title: "Battery Replacement", price: 7500 },
  { id: "back-glass-replacement", title: "Back Glass Replacement", price: 5000 },
  { id: "button-issue", title: "Button Issue", price: 7000 },
  { id: "charging-dock-replacement", title: "Charging Dock Replacement", price: 9500 },
  { id: "speaker-replacement", title: "Speaker Replacement", price: 4000 },
  { id: "face-id-issues", title: "Face ID Issues", price: 8000 },
  { id: "front-camera-replacement", title: "Front Camera Replacement", price: 6000 },
  { id: "housing-replacement", title: "Housing Replacement", price: 22000 },
  { id: "rear-camera-replacement", title: "Rear Camera Replacement", price: 12000 },
  { id: "software-issues", title: "Software Issues", price: 500 },
  { id: "motherboard-issues", title: "Motherboard Issues", price: 15000 },
  { id: "liquid-damage", title: "Liquid Damage", price: 2000 },
  { id: "upper-glass-replacement", title: "Upper Glass Replacement", price: 10500 },
  { id: "display-replacement", title: "Display Replacement", price: 4600 },
];

const roundToHundred = (value) => Math.max(500, Math.round(value / 100) * 100);

export function getIphoneModelBySlug(modelSlug) {
  return IPHONE_MODELS.find((model) => model.slug === modelSlug) || null;
}

export function getServiceMenuForIphoneModel(modelSlug) {
  const model = getIphoneModelBySlug(modelSlug);
  const tierMultiplier = modelPriceTiers[model?.tier] || 1;

  return BASE_IPHONE_SERVICE_MENU.map((service) => ({
    ...service,
    price: roundToHundred(service.price * tierMultiplier),
  }));
}
