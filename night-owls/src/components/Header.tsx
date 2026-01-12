import { useEffect, useRef, useState } from 'react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('All')
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false)
  const authMenuRef = useRef<HTMLDivElement | null>(null)

  const navItems = ['All', 'React', 'JavaScript', 'Python', 'Node']

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
    <header className='w-full h-[70px] bg-[#0B1D3A] flex items-center px-4 md:px-15 relative'>
      <div className='flex-1 md:flex-none md:w-[25%] flex items-center gap-3'>
        <div className='h-9 w-9 rounded-lg bg-orange-500 flex items-center justify-center'>
          <span className='text-[#0B1D3A] font-bold text-lg' aria-hidden>
            {'</>'}
          </span>
        </div>
        <h1 className='text-white text-xl md:text-2xl py-5 flex items-center font-bold'>Night Owls</h1>
      </div> 

      <nav className='hidden md:flex flex-1 justify-center'>
        <div className='flex items-center gap-1 rounded-full bg-white/10 px-2 py-2'>
          {navItems.map((item) => {
            const isActive = item === activeItem
            return (
              <button
                key={item}
                type='button'
                onClick={() => setActiveItem(item)}
                className={
                  'px-4 py-2 rounded-full text-sm md:text-base transition-colors ' +
                  (isActive
                    ? 'bg-[#0B1D3A] text-teal-300'
                    : 'text-white/80 hover:text-white')
                }
              >
                {item}
              </button>
            )
          })}
        </div>
      </nav>

      <div className='flex items-center gap-3 md:w-[25%] md:justify-end'>
        <button
          type='button'
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className='md:hidden text-white p-2'
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
            className='text-white p-2'
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
              className='absolute right-0 top-full mt-2 min-w-[160px] rounded-lg bg-[#0B1D3A] border border-white/15 overflow-hidden'
            >
              <button
                type='button'
                role='menuitem'
                className='w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10'
                onClick={() => setIsAuthMenuOpen(false)}
              >
                Login
              </button>
              <button
                type='button'
                role='menuitem'
                className='w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10'
                onClick={() => setIsAuthMenuOpen(false)}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className='absolute left-0 top-full w-full bg-[#0B1D3A] md:hidden'>
          <nav className='flex flex-col px-4 py-3 gap-1'>
            {navItems.map((item) => {
              const isActive = item === activeItem
              return (
                <button
                  key={item}
                  type='button'
                  className={
                    'text-left rounded-lg px-3 py-2 ' +
                    (isActive ? 'bg-white/10 text-teal-300' : 'text-white/85')
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
    </header>
  )
}


export default Header
