interface PhoenixIconProps {
  className?: string;
}

export function PhoenixIcon({ className }: PhoenixIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 13.5 6.5 16 8.5C18.5 10.5 21 11 21 14C21 18.4183 17.4183 22 13 22C8.58172 22 5 18.4183 5 14C5 11 7.5 10.5 10 8.5C12.5 6.5 14 2 14 2" fillOpacity="0.1" />
      <path
        d="M12.5 5C12.5 5 13.5 8 15 9.5C16.5 11 18.5 11.5 18.5 14C18.5 17.5 15.5 20.5 12 20.5C8.5 20.5 5.5 17.5 5.5 14C5.5 11.5 7.5 11 9 9.5C10.5 8 11.5 5 11.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 14C12 14 11 12 12 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
