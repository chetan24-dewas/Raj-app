const Icon = ({ children, size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const IconMenu = (p) => (
  <Icon {...p}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

export const IconClose = (p) => (
  <Icon {...p}>
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </Icon>
);

export const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.3" y2="16.3" />
  </Icon>
);

export const IconBag = (p) => (
  <Icon {...p}>
    <path d="M6 8h12l-1 12H7L6 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Icon>
);

export const IconPhone = (p) => (
  <Icon {...p}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Icon>
);

export const IconMail = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3 6l9 7 9-7" />
  </Icon>
);

export const IconPin = (p) => (
  <Icon {...p}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </Icon>
);

export const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Icon>
);

export const IconStar = ({ filled, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "var(--brass)" : "none"} stroke="var(--brass)" strokeWidth="1.4">
    <path d="M12 3.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3.5z" />
  </svg>
);

export const IconChevron = ({ open, ...p }) => (
  <Icon {...p} className={"transition-transform duration-300 " + (open ? "rotate-180" : "")}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const IconWhatsapp = (p) => (
  <Icon {...p}>
    <path d="M8 10.5c.4 2.3 2.2 4.1 4.5 4.5" />
    <circle cx="12" cy="12" r="9" />
    <path d="M8.3 15.7L6 18l2.3-2.3" />
  </Icon>
);

export const IconArrowUpRight = (p) => (
  <Icon {...p}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="8 7 17 7 17 16" />
  </Icon>
);

const social = {
  instagram: <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M17 6.5h.01" />,
  pinterest: <path d="M8 21l2-9M9.5 12a3 3 0 1 1 3 3M12 3a9 9 0 1 0 0 18" />,
  facebook: <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9a1 1 0 0 1 1-1z" />,
};

export const SocialIcon = ({ kind }) => (
  <a
    href="#"
    aria-label={kind}
    className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-[var(--charcoal)] hover:text-[var(--cream)] transition-colors"
    style={{ borderColor: "var(--line)" }}
  >
    <Icon size={16}>{social[kind]}</Icon>
  </a>
);
