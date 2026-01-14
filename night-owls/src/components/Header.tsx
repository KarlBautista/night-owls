import { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('All')
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const authMenuRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate();
  const navItems = ['All', 'Fundamentals', 'Async', 'DOM', 'ES6+', 'Functions', 'Arrays', 'Objects']

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (authMenuRef.current && !authMenuRef.current.contains(target)) {
        setIsAuthMenuOpen(false)
      }
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <header className='w-full bg-[#0B1D3A] border-b border-white/5'>
      <div className='max-w-7xl mx-auto px-4 md:px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-lg bg-orange-500 flex items-center justify-center'>
              <span className='text-[#0B1D3A] font-bold text-xl' aria-hidden>
                {'</>'}
              </span>
            </div>
            <div className='flex flex-col' onClick={() => navigate("/")}>
              <h1 className='text-white text-lg font-bold leading-tight cursor-pointer'>
                Night Owls
              </h1>
              <span className='text-orange-400 text-xs font-medium'>JavaScript Edition</span>
            </div>
          </div>

          <nav className='hidden lg:flex items-center gap-6'>
            {navItems.map((item) => {
              const isActive = item === activeItem
              return (
                <button
                  key={item}
                  type='button'
                  onClick={() => setActiveItem(item)}
                  className={
                    'text-sm font-medium transition-colors ' +
                    (isActive
                      ? 'text-teal-400'
                      : 'text-gray-400 hover:text-white')
                  }
                >
                  {item}
                </button>
              )
            })}
          </nav>

          <div className='flex items-center gap-3'>
            <button
              type='button'
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className='lg:hidden text-white p-2'
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-6 w-6'
              >
                {isMobileMenuOpen ? (
                  <>
                    <path d='M18 6L6 18' />
                    <path d='M6 6l12 12' />
                  </>
                ) : (
                  <>
                    <path d='M4 6h16' />
                    <path d='M4 12h16' />
                    <path d='M4 18h16' />
                  </>
                )}
              </svg>
            </button>

            <div className='relative' ref={authMenuRef}>
              <button
                type='button'
                aria-label='Account'
                aria-haspopup='menu'
                aria-expanded={isAuthMenuOpen}
                className='text-white p-2 hover:bg-white/10 rounded-full transition-colors'
                onClick={() => setIsAuthMenuOpen((v) => !v)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-6 w-6'
                >
                  <path d='M20 21a8 8 0 0 0-16 0' />
                  <circle cx='12' cy='7' r='4' />
                </svg>
              </button>

              {isAuthMenuOpen && (
                <div
                  role='menu'
                  className='absolute right-0 top-full mt-2 min-w-[160px] rounded-lg bg-[#0B1D3A] border border-white/15 overflow-hidden shadow-lg z-50'
                >
                  <button
                    type='button'
                    role='menuitem'
                    className='w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-colors'
                    onClick={() => setIsAuthMenuOpen(false)}
                  >
                    Login
                  </button>
                  <button
                    type='button'
                    role='menuitem'
                    className='w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-colors'
                    onClick={() => setIsAuthMenuOpen(false)}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className='lg:hidden border-t border-white/10 mt-4 pt-4'>
            <nav className='flex flex-col gap-2'>
              {navItems.map((item) => {
                const isActive = item === activeItem
                return (
                  <button
                    key={item}
                    type='button'
                    className={
                      'text-left rounded-lg px-3 py-2 transition-colors ' +
                      (isActive ? 'bg-white/10 text-teal-400' : 'text-gray-400 hover:bg-white/5 hover:text-white')
                    }
                    onClick={() => {
                      setActiveItem(item)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}


export default Header;
