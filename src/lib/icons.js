const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const PlayIcon = (props) => (
  <svg {...base} {...props}>
    <path
      fill="currentColor"
      d="M7 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7L8.53 4.65A1 1 0 0 0 7 5.5Z"
    />
  </svg>
);

export const PauseIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
  </svg>
);

export const RestartIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const VoiceIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

export const BellIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export const SilentIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
    <path d="m16 9 6 6M22 9l-6 6" />
  </svg>
);

export const ChevronIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const StackIcon = (props) => (
  <svg {...base} {...props}>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
    <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
    <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
  </svg>
);
