export async function GET() {
  const html = `<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, viewport-fit=cover" name="viewport"/>
<title>Nexus Marketplace Hub</title>
<!-- Fonts & Icons -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&amp;family=Inter:wght@400;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-secondary-fixed": "#3e0021",
                        "on-error-container": "#93000a",
                        "on-surface-muted": "#404943",
                        "on-secondary-container": "#600037",
                        "tertiary": "#735c00",
                        "primary-fixed-dim": "#99d3b3",
                        "outline-variant": "#c0c9c1",
                        "tertiary-fixed": "#ffe085",
                        "on-error": "#ffffff",
                        "tertiary-container": "#c5a84d",
                        "surface-card": "#ffffff",
                        "secondary-container": "#fd56a6",
                        "whatsapp-green": "#25d366",
                        "surface-bright": "#fef9f1",
                        "secondary-fixed": "#ffd9e4",
                        "secondary": "#b4136d",
                        "on-tertiary": "#ffffff",
                        "on-surface-variant": "#404943",
                        "inverse-surface": "#32302b",
                        "on-secondary": "#ffffff",
                        "surface-container-highest": "#e6e2da",
                        "surface-container-high": "#ece8e0",
                        "surface-variant": "#e6e2da",
                        "tertiary-fixed-dim": "#e3c466",
                        "secondary-fixed-dim": "#ffb0cd",
                        "primary-fixed": "#b4f0cf",
                        "primary": "#002a1a",
                        "inverse-on-surface": "#f5f0e8",
                        "on-primary-fixed": "#002113",
                        "pink-tint": "#fd56a7",
                        "surface-dim": "#ded9d2",
                        "on-secondary-fixed-variant": "#8c0053",
                        "surface-container": "#f2ede5",
                        "surface-container-low": "#f8f3eb",
                        "on-background": "#1d1c17",
                        "surface-tint": "#31694f",
                        "error": "#ba1a1a",
                        "inverse-primary": "#99d3b3",
                        "gold-accent": "#cca830",
                        "on-tertiary-fixed-variant": "#574500",
                        "on-tertiary-container": "#4e3d00",
                        "on-primary": "#ffffff",
                        "error-container": "#ffdad6",
                        "on-primary-container": "#76af91",
                        "surface": "#fef9f1",
                        "on-primary-fixed-variant": "#155038",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#1d1c17",
                        "primary-container": "#00422b",
                        "outline": "#707973",
                        "background": "#fef9f1",
                        "on-tertiary-fixed": "#231b00"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "lg": "24px",
                        "xs": "8px",
                        "xl": "32px",
                        "gutter": "16px",
                        "max-width-desktop": "1200px",
                        "base": "4px",
                        "margin-mobile": "20px",
                        "sm": "12px",
                        "md": "16px"
                    },
                    "fontFamily": {
                        "body-lg": ["Inter"],
                        "whatsapp-label": ["Inter"],
                        "headline-md": ["Poppins"],
                        "headline-sm": ["Poppins"],
                        "display-lg": ["Poppins"],
                        "body-md": ["Inter"],
                        "label-caps": ["Inter"]
                    },
                    "fontSize": {
                        "body-lg": ["16px", {"lineHeight": "24px", "letterSpacing": "0", "fontWeight": "400"}],
                        "whatsapp-label": ["14px", {"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "0", "fontWeight": "600"}],
                        "headline-sm": ["20px", {"lineHeight": "28px", "letterSpacing": "0", "fontWeight": "600"}],
                        "display-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "body-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400"}],
                        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        @keyframes micro-spring {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
        }
        .animate-spring-subtle {
            animation: micro-spring 2s infinite ease-in-out;
        }
        .shadow-emerald-soft {
            box-shadow: 0px 4px 20px rgba(0, 66, 43, 0.08);
        }
        input[type="range"] {
            accent-color: #002a1a;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface font-body-lg overflow-x-hidden pb-24">
<!-- 1. GLOBAL APP BAR -->
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm flex justify-between items-center px-margin-mobile py-md">
<div class="flex flex-col items-start">
<span class="font-display-lg text-headline-sm font-bold text-primary leading-none">Nexus Festive</span>
<span class="text-[10px] font-label-caps uppercase tracking-widest text-secondary px-1.5 py-0.5 bg-secondary/10 rounded-full mt-1">Ecosystem Hub</span>
</div>
<div class="flex items-center gap-sm">
<div class="bg-surface-container h-8 rounded-full flex items-center p-1 gap-1">
<button class="bg-white shadow-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-primary">Client</button>
<button class="px-2 py-0.5 rounded-full text-[10px] font-bold text-on-surface-variant">Enterprise</button>
</div>
<div class="relative">
<img alt="User Profile" class="w-9 h-9 rounded-full ring-2 ring-primary ring-offset-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCmKg-4b4-5XtZeKwAYvuqxMWe5yQ1YaeeWHzMnqAm48tEFsN4L2yLO6LX6CS7-bWJQz8uwxnCafHYEcmVngcqKylHjnUAbOkCJTAFhNM_5qzfkkHxicOWSqo7LoCHRaDbgyqBgGHUK5_GOXdNrtg7itgvWj_1yCUeYoBFk_hn0U9GtqeDpACtuQSVey4FJJ-ppOQTCOzU3SPHbogGt4I7xpHjhiZJs3bW92QaGbjX7u11oU6JnKAM9SwPk009naw23l1KGCWJRdNP"/>
<div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-whatsapp-green rounded-full border-2 border-surface"></div>
</div>
</div>
</header>
<main class="mt-20 px-margin-mobile space-y-xl">
<!-- 2. EXECUTIVE HERO -->
<section class="relative rounded-xl overflow-hidden min-h-[420px] flex flex-col justify-end p-lg">
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover" data-alt="A luxurious high-end gala event space in Lahore, Pakistan. The scene is illuminated by warm festive lighting and deep emerald green decorative elements. Crystal chandeliers hang from a high ceiling, and the atmosphere is sophisticated and premium, blending modern corporate elegance with traditional hospitality warmth. High-key lighting creates a bright, welcoming vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqz2LnHJaaoSpg0-cdUIxxjrUvWS2pszGo-Lz4FacTUzIhV76mptVA7CrY7XNK_aML1NpGplweJDMqQLxW20QkLQEVejKXOl2OnAj7kadsPa9eO3G2obpKUt-I5B4hH-qFbzAY4bzVaHQeOwFxQl59crzi9K9-QAv4frRHvk2YzMIQRKbN8QW_GEhoHzKzr4NCClBVqTHNAZKUht4VPjUFAJdRnthtzZKz1UVFtxhdKmIOigcMSlykqBuNmyW5w_-GFKUzjzI1fvI9"/>
<div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
</div>
<div class="relative z-10 space-y-md">
<h1 class="font-display-lg text-display-lg text-white leading-tight">Orchestrate Your <span class="text-gold-accent">Legacy</span></h1>
<div class="glass-card p-md rounded-xl space-y-sm">
<div class="flex gap-2">
<div class="flex-1 bg-surface-container-low rounded-lg p-xs flex items-center gap-xs">
<span class="material-symbols-outlined text-primary text-sm">location_on</span>
<select class="bg-transparent border-none focus:ring-0 text-body-md font-semibold text-primary w-full p-0">
<option>Islamabad</option>
<option>Lahore</option>
<option>Karachi</option>
</select>
</div>
<div class="flex-1 bg-surface-container-low rounded-lg p-xs flex items-center gap-xs">
<span class="material-symbols-outlined text-primary text-sm">category</span>
<select class="bg-transparent border-none focus:ring-0 text-body-md font-semibold text-primary w-full p-0">
<option>Wedding</option>
<option>Corporate</option>
<option>Gala</option>
</select>
</div>
</div>
<div class="flex flex-col gap-2">
<button class="bg-secondary text-white font-bold py-3 rounded-lg text-body-lg shadow-lg">Launch Festive Journey</button>
<button class="bg-white/20 text-white font-bold py-3 rounded-lg text-body-lg border border-white/30">Enterprise System Login</button>
</div>
</div>
</div>
</section>
<!-- 3. B2B METRICS SUITE -->
<section class="space-y-md">
<div class="flex justify-between items-end">
<h2 class="font-headline-md text-primary">Enterprise Intelligence</h2>
<span class="text-body-md text-secondary font-bold">Real-time</span>
</div>
<div class="grid grid-cols-1 gap-md">
<!-- CRM Lead Grid -->
<div class="bg-white rounded-xl p-md shadow-emerald-soft border-l-4 border-primary">
<p class="font-label-caps text-on-surface-variant mb-sm">CRM LEAD FUNNEL</p>
<div class="flex justify-between items-center mb-md">
<div class="text-center">
<p class="text-headline-sm font-bold text-primary">124</p>
<p class="text-[10px] text-on-surface-variant">INQUIRIES</p>
</div>
<div class="w-[1px] h-8 bg-surface-container-highest"></div>
<div class="text-center">
<p class="text-headline-sm font-bold text-secondary">~2H</p>
<p class="text-[10px] text-on-surface-variant">RESPONSE</p>
</div>
<div class="w-[1px] h-8 bg-surface-container-highest"></div>
<div class="text-center">
<p class="text-headline-sm font-bold text-gold-accent">82%</p>
<p class="text-[10px] text-on-surface-variant">CONV.</p>
</div>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden flex">
<div class="h-full bg-primary" style="width: 45%"></div>
<div class="h-full bg-secondary" style="width: 30%"></div>
<div class="h-full bg-gold-accent" style="width: 15%"></div>
</div>
</div>
<!-- Accounting Matrix -->
<div class="bg-primary text-white rounded-xl p-md shadow-lg overflow-hidden relative">
<div class="absolute top-0 right-0 w-24 h-24 bg-gold-accent/10 rounded-full -translate-y-12 translate-x-12"></div>
<p class="font-label-caps text-primary-fixed-dim mb-xs">CASH FLOW MATRIX</p>
<h3 class="text-display-lg font-bold text-gold-accent">$42,850.00</h3>
<div class="mt-md space-y-2">
<div class="flex justify-between text-body-md border-b border-white/10 pb-2">
<span>Pending Invoices</span>
<span class="font-bold text-primary-fixed">$12,400</span>
</div>
<div class="flex justify-between text-body-md">
<span>Proforma Quotes</span>
<span class="font-bold text-primary-fixed">$8,210</span>
</div>
</div>
</div>
</div>
</section>
<!-- 4. EVENT BUDGET DESIGNER -->
<section class="bg-surface-container-low rounded-2xl p-lg space-y-md">
<h2 class="font-headline-md text-primary">Budget Architect</h2>
<p class="text-body-md text-on-surface-variant">Intelligent fund allocation for your multi-day celebration.</p>
<div class="space-y-lg mt-md">
<div>
<div class="flex justify-between mb-2">
<label class="font-bold text-primary">Total Cap</label>
<span class="text-secondary font-bold" id="budget-value">$50,000</span>
</div>
<input class="w-full h-2 rounded-lg cursor-pointer" id="budget-slider" max="100000" min="10000" step="5000" type="range" value="50000"/>
</div>
<div class="space-y-sm">
<div class="bg-white p-md rounded-lg flex justify-between items-center shadow-sm">
<div class="flex items-center gap-2">
<div class="w-2 h-2 bg-primary rounded-full"></div>
<span class="text-body-md font-semibold">Venue &amp; Decor</span>
</div>
<span class="font-bold text-primary" id="venue-val">$20,000</span>
</div>
<div class="bg-white p-md rounded-lg flex justify-between items-center shadow-sm">
<div class="flex items-center gap-2">
<div class="w-2 h-2 bg-secondary rounded-full"></div>
<span class="text-body-md font-semibold">Gourmet Catering</span>
</div>
<span class="font-bold text-primary" id="cater-val">$15,000</span>
</div>
<div class="bg-white p-md rounded-lg flex justify-between items-center shadow-sm border-2 border-gold-accent/20">
<div class="flex items-center gap-2">
<div class="w-2 h-2 bg-gold-accent rounded-full"></div>
<span class="text-body-md font-semibold">Digital &amp; Tech</span>
</div>
<span class="font-bold text-primary" id="tech-val">$15,000</span>
</div>
</div>
<div class="bg-gold-accent/10 p-md rounded-xl border border-gold-accent/20 flex items-start gap-3">
<span class="material-symbols-outlined text-gold-accent mt-0.5">auto_awesome</span>
<p class="text-body-md text-on-tertiary-fixed-variant leading-tight">
<span class="font-bold">Recommendation:</span> Consider increasing Digital Displays by 5% for the immersive VR walkthrough.
                    </p>
</div>
</div>
</section>
<!-- 6. DIGITAL MENU & HARDWARE -->
<section class="space-y-md">
<h2 class="font-headline-md text-primary">Bespoke Menu Builder</h2>
<div class="bg-white rounded-xl overflow-hidden shadow-emerald-soft border border-surface-variant">
<div class="p-md bg-surface-container-high border-b flex justify-between items-center">
<div class="flex gap-2">
<div class="w-3 h-3 rounded-full bg-error"></div>
<div class="w-3 h-3 rounded-full bg-gold-accent"></div>
<div class="w-3 h-3 rounded-full bg-whatsapp-green"></div>
</div>
<span class="text-[10px] font-label-caps text-on-surface-variant">HARDWARE CLOUD BROADCASTING</span>
</div>
<div class="p-lg relative">
<div class="space-y-md">
<div class="text-center space-y-1">
<p class="text-[10px] tracking-widest text-secondary font-bold">THE GRAND RECEPTION</p>
<h3 class="font-display-lg text-primary text-headline-sm">Artisan Kebab Platter</h3>
<p class="text-body-md text-on-surface-variant italic">Served with mint chutney &amp; glazed pomegranate</p>
<p class="text-gold-accent font-bold">$18.50</p>
</div>
<div class="grid grid-cols-2 gap-sm mt-md">
<div class="p-sm bg-surface-container rounded-lg border border-dashed border-outline-variant flex flex-col items-center">
<span class="material-symbols-outlined text-primary mb-1">text_increase</span>
<span class="text-[10px] font-bold">Typography</span>
</div>
<div class="p-sm bg-surface-container rounded-lg border border-dashed border-outline-variant flex flex-col items-center">
<span class="material-symbols-outlined text-primary mb-1">settings_ethernet</span>
<span class="text-[10px] font-bold">Sync Device</span>
</div>
</div>
</div>
<!-- Animation Dot -->
<div class="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-ping opacity-20"></div>
</div>
</div>
<div class="flex items-center gap-md p-md bg-primary text-white rounded-xl shadow-lg">
<span class="material-symbols-outlined text-gold-accent">tv</span>
<p class="text-body-md">Currently broadcasting to <span class="font-bold">4 HD Venue Signage</span> units in Main Hall.</p>
</div>
</section>
<!-- 7. CREATIVE SUITE (Tabs) -->
<section class="space-y-md">
<div class="flex bg-surface-container rounded-xl p-1 gap-1">
<button class="flex-1 py-2 text-body-md font-bold rounded-lg transition-all bg-white text-primary shadow-sm" id="btn-invites" onclick="toggleTab('tab-invites')">Invitations</button>
<button class="flex-1 py-2 text-body-md font-bold rounded-lg transition-all text-on-surface-variant" id="btn-memory" onclick="toggleTab('tab-memory')">Memory Vault</button>
</div>
<!-- Tab A: Invitations -->
<div class="space-y-md" id="tab-invites">
<div class="relative w-full aspect-square max-w-[300px] mx-auto flex items-center justify-center p-lg">
<!-- Spinning Record Framework -->
<div class="absolute inset-0 border-[16px] border-primary rounded-full animate-[spin_10s_linear_infinite]"></div>
<div class="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-gold-accent">
<img class="w-full h-full object-cover" data-alt="A macro shot of an elegant wedding invitation with gold-foiled Islamic geometric patterns on deep emerald green cardstock. The invitation is presented in a modern artistic way, suggesting it's part of a musical digital invitation experience. The lighting is dramatic and warm, emphasizing the premium texture of the paper and the reflective gold leaf." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfEd7D8HJt7zaCYOaqj-w5TD9g0z2Z2abeqr-w26ihyBP-yF9rhfdReHGL-go2TCMypx4nNTO2O9qqVzEj-vVP-0riK-dbU4aCukbKrjUb7Gj3s7rTVy8mn-j9fakxMIl1pJpPiCL5-OwUGJCzToMckMnbZ_CwOtHKeL8fMvYDla2F1SHYqw_RCJn08ZMWvGo3Na4nP5ePrvYYWW9opn5TSpmW22qGnGUPH0M_7InG-jIZVVXyB-oBK0WPkT2oNhWOrnw7RZIrEoAV"/>
<div class="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white p-md text-center">
<span class="material-symbols-outlined text-4xl mb-2">music_note</span>
<p class="font-bold text-xs uppercase tracking-widest">Animated Invitation</p>
</div>
</div>
</div>
<div class="text-center space-y-xs">
<h3 class="font-headline-sm text-primary">Harmonic Digital Invite</h3>
<p class="text-body-md text-on-surface-variant">Sync your favorite melody with a bespoke visual narrative.</p>
</div>
</div>
<!-- Tab B: Memory Vault (Hidden by default) -->
<div class="hidden space-y-md" id="tab-memory">
<div class="grid grid-cols-2 gap-2">
<div class="h-40 rounded-xl overflow-hidden shadow-sm">
<img class="w-full h-full object-cover" data-alt="Candid photograph of laughing guests at a high-end corporate event in Pakistan, lit by soft festive rose and gold ambient lighting. The background shows a blurred, luxurious ballroom setting. The photo captures a moment of joy and cultural pride in a modern, sophisticated style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuALzZROUPRY7Cu6ZQVnMGm0VVyvtwWoe8OajnqOJrA8Vy3zuifTrTigJGzKK6xIzdAl5T5pK0RNHfNoG-AWefjRk7m_oLSR6wcSasgZtZ--Cyp6879mozdfvF92jfYmGl0a_f58JdZvjbSYyQkdbF58fmyry34zKLbdNVLkzGc1TV443_vltceypwENYH8lvcjJRz3nEfrXeQcDuPfeQBIEWLkPbIjXyf_MdF4l8qNfhftnIR7JpD7k2EBJefS1KBtqLhJArCPrvpV9"/>
</div>
<div class="h-28 rounded-xl overflow-hidden shadow-sm">
<img class="w-full h-full object-cover" data-alt="Close up of artistic food styling at a gala dinner. The dish is presented on a designer ceramic plate with edible flowers and gold leaf accents. The lighting is professional and moody, highlighting the 'luxe' catering aspect of the Nexus marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsfhViwSHjnsu9hWsyjk0f_uGY7MjCbZwRZUt-Tgu_utm0IrPpWeru3JUzFvFfDuCybfUBXmdH34sEA65ToadYGb23v--IKG0fFSB-oL-usiNmDX5dYyJkYnewN8F8YAVWFv89F8wZPxs3fqWbqerPrYWUyjvWnKuMPmJs8V7d1NydVdX-ElSvruMzuSTnX6Mb6eU8PtBAP0wDl8cQbeoMeGyWXd3x5vB-vNWrTAX1qvykGZiZwe29PdvVPK-Vk7NAPOtf51kTGWIj"/>
</div>
<div class="h-32 rounded-xl overflow-hidden shadow-sm col-span-2">
<img class="w-full h-full object-cover" data-alt="A wide cinematic shot of a beautifully decorated outdoor festive arena at night. Strings of warm fairy lights are draped across the space, with deep emerald green upholstered seating and gold accent tables. The mood is serene and technologically advanced, reflecting the 'Modern Corporate with a Festive Twist' aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2svVzEUfuSrjInjMMEUb01RdobsgeiuwhOR-CfgLYrOvAokgA6lXhpML44hQk6rHNez3TnW5_gmBMcpvnf_HvlT_wcL5RH6Nva0PzKuPBUdc95OQgzsUxaYL62q3EJnmcB-v7uxqx62wwTxNSUrtTiIpeQdt3fGcfHv7eBaFPFF1iobQ0MLnp3oL_SsXAxmqbtyroV9WL3q_P-N52OytYBg-rmUo4wpdXPZIb3pJc0fwNERsopKNBHM0iwm1g0xo4Yp7ru06iKRNi"/>
</div>
</div>
<div class="bg-primary-container p-md rounded-xl text-center">
<p class="text-on-primary-container font-bold text-body-md">124 New Memories Shared Today</p>
</div>
</div>
</section>
<!-- 8. DISCOVERY SHOWCASE -->
<section class="space-y-md">
<div class="flex justify-between items-center">
<h2 class="font-headline-md text-primary">Elite Curations</h2>
<button class="text-secondary font-bold text-body-md flex items-center gap-1">View All <span class="material-symbols-outlined text-sm">arrow_forward</span></button>
</div>
<div class="flex overflow-x-auto no-scrollbar gap-lg -mx-margin-mobile px-margin-mobile pb-md">
<!-- Card 1 -->
<div class="min-w-[280px] bg-white rounded-xl overflow-hidden shadow-emerald-soft group">
<div class="h-44 relative">
<img class="w-full h-full object-cover" data-alt="Modern architectural venue with floor-to-ceiling glass walls, overlooking a lush green garden in Islamabad. The design is minimalist and high-end. The lighting is high-key and natural, creating a bright and airy atmosphere. The venue is styled with emerald green and gold accents to maintain brand harmony." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHoS2Z-azr0tO1jncAYvuuL-Fr7EXiiF_jE7HpClLUMOSD0_2bTsD5nptGxObYAa48K5C7H4W35-sxHHsarvWnB6GeyvT-ixV58lSPAXcoM0OVBHWql5ho-vGNHusnfKd0GLjG7wtZqCooj4G75HFowGZ4PyZZbuvwapEyKNKqQ-n48AqI1gKv6SPEBd45KWw5qF6ipkYYaTCMQuBqcKZ5LU1Zi2Nb7DU4AkBAcrjwu4WzbMSMhd6qgU5OxhJEKMJpVuUHielOQne1"/>
<div class="absolute top-3 right-3 bg-gold-accent text-white px-2 py-1 rounded text-[10px] font-bold">PREMIUM</div>
</div>
<div class="p-md space-y-xs">
<div class="flex justify-between items-start">
<h4 class="font-bold text-primary">The Crystal Pavilion</h4>
<div class="flex items-center text-gold-accent">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-xs font-bold ml-0.5">4.9</span>
</div>
</div>
<p class="text-xs text-on-surface-variant flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span> E-7, Islamabad</p>
<div class="flex gap-2 mt-2">
<span class="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">Architecture</span>
<span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Verified</span>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="min-w-[280px] bg-white rounded-xl overflow-hidden shadow-emerald-soft border border-gold-accent/10">
<div class="h-44 relative">
<img class="w-full h-full object-cover" data-alt="Close-up of luxury floral arrangement by an artisan portfolio holder. Features deep crimson roses, exotic orchids, and gold-painted leaves in a minimalist emerald green ceramic vase. The lighting is soft and focused, highlighting the premium quality and craftsmanship of the artisans on the Nexus platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfTNGicLndT4NTCK6EHJkr3MluwcgAY-BLocKic1f29gMC6qCWkZt3l6AszTGqBR5mbmfulHQpV3OZyvN0WlWFIY0a6joIh7NKrEYwdLxuLqYW90oP0tQRHSWVaSht00LKMyJ-TYBKqarGE86LlI9zV6m1_VhN8aGANwK7hk1UgPupdCrG9vOxkM3u9u_AuZ1wgUyKrp8df9BsnNYbeRNKdsXmWB3lGwwakOQfWq1yuCEXwpt69otEFFZ5_8GbzeohPEntiVnN8VU1"/>
<div class="absolute top-3 right-3 bg-gold-accent text-white px-2 py-1 rounded text-[10px] font-bold">ARTISAN</div>
</div>
<div class="p-md space-y-xs">
<div class="flex justify-between items-start">
<h4 class="font-bold text-primary">Rosewood Botanicals</h4>
<div class="flex items-center text-gold-accent">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-xs font-bold ml-0.5">5.0</span>
</div>
</div>
<p class="text-xs text-on-surface-variant flex items-center gap-1"><span class="material-symbols-outlined text-sm">verified_user</span> Master Artisan</p>
<div class="flex gap-2 mt-2">
<span class="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">Floral Design</span>
<span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Verified</span>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- 9. TRANSACTION FOOTER -->
<footer class="bg-surface-container-low px-margin-mobile py-xl mt-xl border-t border-surface-variant">
<div class="grid grid-cols-2 gap-lg">
<div class="space-y-sm">
<p class="font-bold text-primary text-body-md uppercase tracking-tighter">Nexus Corporate</p>
<nav class="flex flex-col gap-2">
<a class="text-on-surface-variant text-body-md" href="#">Partnerships</a>
<a class="text-on-surface-variant text-body-md" href="#">Enterprise API</a>
<a class="text-on-surface-variant text-body-md" href="#">Governance</a>
</nav>
</div>
<div class="space-y-sm text-right">
<p class="font-bold text-primary text-body-md uppercase tracking-tighter">Legal &amp; Privacy</p>
<nav class="flex flex-col gap-2">
<a class="text-on-surface-variant text-body-md" href="#">Service Level</a>
<a class="text-on-surface-variant text-body-md" href="#">Data Ethics</a>
<a class="text-on-surface-variant text-body-md" href="#">Compliance</a>
</nav>
</div>
</div>
<div class="mt-xl pt-lg border-t border-surface-variant text-center">
<p class="text-[10px] font-label-caps text-on-surface-muted">© 2024 NEXUS MARKETPLACE ECOSYSTEM. ALL RIGHTS RESERVED.</p>
</div>
</footer>
<!-- 5. NEXUS INTUITION AI (Expandable) -->
<div class="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 transition-all" id="ai-chat">
<div class="hidden w-72 glass-card rounded-2xl shadow-2xl overflow-hidden border border-primary/20 flex flex-col" id="chat-window">
<div class="bg-primary p-md text-white flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-gold-accent animate-pulse">auto_fix_high</span>
<span class="font-bold">Nexus AI Intuition</span>
</div>
<button onclick="toggleAI()"><span class="material-symbols-outlined">close</span></button>
</div>
<div class="p-md h-48 overflow-y-auto space-y-md bg-white/50" id="chat-messages">
<div class="bg-surface-container rounded-lg p-sm text-body-md">
                    Greetings! How may I assist your festive strategy today?
                </div>
</div>
<div class="p-md space-y-sm bg-white/80 border-t">
<div class="flex flex-wrap gap-2">
<button class="text-[10px] bg-secondary/10 text-secondary border border-secondary/20 px-2 py-1 rounded-full font-semibold">Draft a vendor quote...</button>
<button class="text-[10px] bg-gold-accent/10 text-gold-accent border border-gold-accent/20 px-2 py-1 rounded-full font-semibold">Analyze RSVP patterns...</button>
</div>
<div class="flex gap-2 mt-2">
<input class="flex-1 text-sm rounded-lg border-surface-variant focus:ring-primary focus:border-primary" placeholder="Inquire with AI..." type="text"/>
<button class="bg-primary text-white p-2 rounded-lg flex items-center justify-center"><span class="material-symbols-outlined text-sm">send</span></button>
</div>
</div>
</div>
<button class="w-14 h-14 bg-primary text-gold-accent rounded-full shadow-2xl flex items-center justify-center border-2 border-gold-accent/30 relative" onclick="toggleAI()">
<span class="material-symbols-outlined text-3xl">auto_fix_high</span>
<div class="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white"></div>
</button>
</div>
<!-- WHATSAPP FAB -->
<a class="fixed bottom-6 right-4 z-50 bg-whatsapp-green text-white p-3 rounded-full shadow-2xl flex items-center gap-2 animate-spring-subtle" href="https://wa.me/1234567890">
<svg class="w-8 h-8 fill-current" viewbox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
<span class="font-whatsapp-label font-bold pr-1">Inquire Now</span>
</a>
<!-- Bottom Navigation Bar (Predicted Module 10) -->
<nav class="fixed bottom-0 left-0 w-full flex justify-around items-center py-sm px-xs pb-6 bg-surface-container-lowest shadow-[0_-4px_20px_rgba(0,66,43,0.05)] rounded-t-xl z-50 border-t border-surface-variant/20">
<div class="flex flex-col items-center justify-center text-primary bg-primary-fixed/20 rounded-xl px-3 py-1">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">explore</span>
<span class="text-[10px] font-label-caps mt-1">Explore</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant" onclick="toggleTab('tab-invites')">
<span class="material-symbols-outlined">event_note</span>
<span class="text-[10px] font-label-caps mt-1">Planning</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant" onclick="toggleTab('tab-memory')">
<span class="material-symbols-outlined">photo_library</span>
<span class="text-[10px] font-label-caps mt-1">Vault</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant" onclick="toggleAI()">
<span class="material-symbols-outlined">auto_fix_high</span>
<span class="text-[10px] font-label-caps mt-1">AI Tools</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined">person</span>
<span class="text-[10px] font-label-caps mt-1">Profile</span>
</div>
</nav>
<script>
        // Budget Slider Logic
        const slider = document.getElementById('budget-slider');
        const budgetVal = document.getElementById('budget-value');
        const venueVal = document.getElementById('venue-val');
        const caterVal = document.getElementById('cater-val');
        const techVal = document.getElementById('tech-val');

        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            budgetVal.innerText = \`$\${val.toLocaleString()}\`;
            venueVal.innerText = \`$\${Math.round(val * 0.4).toLocaleString()}\`;
            caterVal.innerText = \`$\${Math.round(val * 0.3).toLocaleString()}\`;
            techVal.innerText = \`$\${Math.round(val * 0.3).toLocaleString()}\`;
        });

        // Tabs Logic
        function toggleTab(tabId) {
            const inviteTab = document.getElementById('tab-invites');
            const memoryTab = document.getElementById('tab-memory');
            const btnInvites = document.getElementById('btn-invites');
            const btnMemory = document.getElementById('btn-memory');

            if (tabId === 'tab-invites') {
                inviteTab.classList.remove('hidden');
                memoryTab.classList.add('hidden');
                btnInvites.classList.add('bg-white', 'text-primary', 'shadow-sm');
                btnInvites.classList.remove('text-on-surface-variant');
                btnMemory.classList.remove('bg-white', 'text-primary', 'shadow-sm');
                btnMemory.classList.add('text-on-surface-variant');
            } else {
                memoryTab.classList.remove('hidden');
                inviteTab.classList.add('hidden');
                btnMemory.classList.add('bg-white', 'text-primary', 'shadow-sm');
                btnMemory.classList.remove('text-on-surface-variant');
                btnInvites.classList.remove('bg-white', 'text-primary', 'shadow-sm');
                btnInvites.classList.add('text-on-surface-variant');
            }
        }

        // AI Chat Logic
        function toggleAI() {
            const chat = document.getElementById('chat-window');
            chat.classList.toggle('hidden');
        }
    </script>
</body></html>\n`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
