import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round"
} as const;

function IconBase({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function LogoIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7.5C4 6.1 5.1 5 6.5 5h7.2c1 0 1.9.4 2.6 1.1l3.2 3.2c.7.7 1.1 1.6 1.1 2.6V17.5c0 1.4-1.1 2.5-2.5 2.5H6.5C5.1 20 4 18.9 4 17.5V7.5z" {...strokeProps} />
      <path d="M14 5v4.2c0 .5.4.8.8.8H19" {...strokeProps} />
      <path d="M7.5 13.2h7" {...strokeProps} />
      <path d="M7.5 16.2h4.5" {...strokeProps} />
    </IconBase>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4" {...strokeProps} />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" {...strokeProps} />
    </IconBase>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 14.7A7.5 7.5 0 1 1 9.3 4a6.5 6.5 0 0 0 10.7 10.7z" {...strokeProps} />
    </IconBase>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="9" r="3.2" {...strokeProps} />
      <path d="M5 19c1.8-3 5-4 7-4s5.2 1 7 4" {...strokeProps} />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6" {...strokeProps} />
      <path d="M20 20l-3.2-3.2" {...strokeProps} />
    </IconBase>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3l1.6 4.3L18 9l-4.4 1.7L12 15l-1.6-4.3L6 9l4.4-1.7L12 3z" {...strokeProps} />
      <path d="M5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16z" {...strokeProps} />
    </IconBase>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 6.8C4 5.3 5.2 4 6.7 4h10.6c1.5 0 2.7 1.3 2.7 2.8v6.4c0 1.5-1.2 2.8-2.7 2.8H9l-4 3v-3.1H6.7C5.2 16 4 14.7 4 13.2V6.8z" {...strokeProps} />
      <path d="M8 9h6" {...strokeProps} />
      <path d="M8 12h4" {...strokeProps} />
    </IconBase>
  );
}

export function TranslateIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 5h10" {...strokeProps} />
      <path d="M9 5c0 5-3 8-5 9" {...strokeProps} />
      <path d="M7 11c1.2 1.5 2.8 2.6 4.8 3" {...strokeProps} />
      <path d="M14 19l2.5-6 2.5 6" {...strokeProps} />
      <path d="M15.2 16h2.6" {...strokeProps} />
    </IconBase>
  );
}

export function SummarizeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="3.8" width="16" height="16.5" rx="2.4" {...strokeProps} />
      <path d="M7 8h10" {...strokeProps} />
      <path d="M7 12h7" {...strokeProps} />
      <path d="M7 16h4" {...strokeProps} />
    </IconBase>
  );
}

export function MergeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 4v6a4 4 0 0 0 4 4h6" {...strokeProps} />
      <path d="M17 4v6a4 4 0 0 1-4 4H7" {...strokeProps} />
      <circle cx="7" cy="4" r="2" {...strokeProps} />
      <circle cx="17" cy="4" r="2" {...strokeProps} />
      <circle cx="12" cy="16" r="2" {...strokeProps} />
    </IconBase>
  );
}

export function CompressIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" {...strokeProps} />
      <path d="M8 9h8" {...strokeProps} />
      <path d="M8 12h5" {...strokeProps} />
      <path d="M8 15h3" {...strokeProps} />
    </IconBase>
  );
}

export function ConvertIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 8h9" {...strokeProps} />
      <path d="M13 5l3 3-3 3" {...strokeProps} />
      <path d="M18 16H9" {...strokeProps} />
      <path d="M11 19l-3-3 3-3" {...strokeProps} />
    </IconBase>
  );
}

export function SplitIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 4v7" {...strokeProps} />
      <path d="M17 4v7" {...strokeProps} />
      <path d="M4 15h7l-2.4-2.4" {...strokeProps} />
      <path d="M20 15h-7l2.4-2.4" {...strokeProps} />
      <path d="M7 4h10" {...strokeProps} />
    </IconBase>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 16.5V20h3.5L18.5 9.1l-3.5-3.6L4 16.5z" {...strokeProps} />
      <path d="M13.9 5.7l3.5 3.5" {...strokeProps} />
    </IconBase>
  );
}

export function ResizeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" {...strokeProps} />
      <path d="M8 8h8v8" {...strokeProps} />
      <path d="M8 16l8-8" {...strokeProps} />
    </IconBase>
  );
}

export function ReaderIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 6.5c3-2 6-2 9 0 3-2 6-2 9 0v11c-3-2-6-2-9 0-3-2-6-2-9 0v-11z" {...strokeProps} />
      <path d="M13 6.5v11" {...strokeProps} />
    </IconBase>
  );
}

export function DocIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 3.8h8l4 4V20a1.8 1.8 0 0 1-1.8 1.8H6A1.8 1.8 0 0 1 4.2 20V5.6A1.8 1.8 0 0 1 6 3.8z" {...strokeProps} />
      <path d="M14 3.8v4h4" {...strokeProps} />
      <path d="M8 12h8" {...strokeProps} />
      <path d="M8 15h5" {...strokeProps} />
    </IconBase>
  );
}

export function SheetIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="3.8" width="16" height="16.5" rx="2.2" {...strokeProps} />
      <path d="M4 8h16" {...strokeProps} />
      <path d="M9 8v12" {...strokeProps} />
      <path d="M14 12h6" {...strokeProps} />
    </IconBase>
  );
}

export function SlidesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="5" width="16" height="12" rx="2" {...strokeProps} />
      <path d="M8 9h8" {...strokeProps} />
      <path d="M8 12h5" {...strokeProps} />
      <path d="M9 17v3" {...strokeProps} />
      <path d="M15 17v3" {...strokeProps} />
    </IconBase>
  );
}

export function TxtIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.2" {...strokeProps} />
      <path d="M8 8h8" {...strokeProps} />
      <path d="M10 12h4" {...strokeProps} />
      <path d="M9 16h6" {...strokeProps} />
    </IconBase>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2.2" {...strokeProps} />
      <path d="M7.5 14l3-3 3 3 2-2 3 3" {...strokeProps} />
      <circle cx="9" cy="9" r="1.5" {...strokeProps} />
    </IconBase>
  );
}
