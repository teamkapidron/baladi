import { memo } from 'react';

function AuthSidebar() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-primary-dark)] lg:block lg:w-1/2">
      {/* Abstract Geometric Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="radialGradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="linearGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#radialGradient)" />
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="url(#linearGradient)"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        </svg>
      </div>

      {/* Animated Waves */}
      <div className="absolute inset-0 opacity-30">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 h-80 w-full"
        >
          <path
            fill="rgba(255, 255, 255, 0.2)"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-wave"
          ></path>
          <path
            fill="rgba(255, 255, 255, 0.3)"
            fillOpacity="1"
            d="M0,192L60,208C120,224,240,256,360,245.3C480,235,600,181,720,170.7C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="animate-wave-slow"
          ></path>
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="animate-float absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="animate-float-delay absolute right-1/4 top-2/3 h-24 w-24 rounded-full bg-white/10 blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 h-20 w-20 animate-pulse rounded-full bg-white/10 blur-md"></div>
      </div>

      {/* Mesh Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.3) 75%, rgba(255, 255, 255, 0.3) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="p-12 text-center text-white">
          {/* Glowing Icon */}
          <div className="relative mb-8 inline-flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-white/20 blur-xl"></div>
            <div className="relative rounded-full border border-white/30 bg-white/10 p-6 shadow-[0_0_15px_rgba(255,255,255,0.3)] backdrop-blur-sm">
              <svg
                className="h-14 w-14 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-4 text-4xl font-bold drop-shadow-lg">
            Gjenopprett Tilgang
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-white to-transparent"></div>
          <p className="mx-auto mb-10 max-w-md text-xl opacity-90">
            Vi hjelper deg med å komme tilbake til kontoen din med noen enkle
            trinn
          </p>

          {/* Process Steps */}
          <div className="relative mx-auto mt-12 max-w-sm">
            <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-gradient-to-b from-white/60 to-white/10"></div>

            <div className="group relative mb-8 flex items-center">
              <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                <span className="text-2xl font-bold">1</span>
              </div>
              <div className="ml-6 flex-1 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all group-hover:translate-x-1">
                <h3 className="text-lg font-medium">Skriv inn e-post</h3>
                <p className="text-sm opacity-80">
                  Oppgi e-postadressen knyttet til kontoen din
                </p>
              </div>
            </div>

            <div className="group relative mb-8 flex items-center">
              <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                <span className="text-2xl font-bold">2</span>
              </div>
              <div className="ml-6 flex-1 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all group-hover:translate-x-1">
                <h3 className="text-lg font-medium">Sjekk e-posten din</h3>
                <p className="text-sm opacity-80">
                  Vi sender deg en sikker tilbakestillingslenke
                </p>
              </div>
            </div>

            <div className="group relative flex items-center">
              <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="ml-6 flex-1 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all group-hover:translate-x-1">
                <h3 className="text-lg font-medium">Lag nytt passord</h3>
                <p className="text-sm opacity-80">
                  Opprett et sterkt, nytt passord for kontoen din
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AuthSidebar);
