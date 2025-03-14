export default function NevoLogo({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 4h16v16H4z" />
            <path d="M4 4 L20 20" />
            <path d="M4 20 L20 4" />
        </svg>
    )
}
