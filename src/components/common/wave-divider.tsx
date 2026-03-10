interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
  variant?: 'smooth' | 'gentle' | 'steep';
}

const paths = {
  smooth: 'M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,80 L0,80 Z',
  gentle: 'M0,48 C180,80 360,16 540,48 C720,80 900,16 1080,48 C1260,80 1380,48 1440,48 L1440,80 L0,80 Z',
  steep: 'M0,20 C360,80 720,0 1080,60 C1260,80 1380,40 1440,20 L1440,80 L0,80 Z',
};

export function WaveDivider({
  color = 'var(--background)',
  flip = false,
  className = '',
  variant = 'smooth',
}: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 overflow-hidden leading-[0] ${
        flip ? 'top-0 rotate-180' : 'bottom-0'
      } ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full"
        preserveAspectRatio="none"
        style={{ height: '60px' }}
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
}
