'use client'

import { useRouter } from "next/navigation"


export default function BackButton({ scrollPercentage = 0 }: { scrollPercentage?: number }) {
    const router = useRouter()

    return (
        <span
            className="absolute w-full h-full bg-amber-50 -left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => {
                router.push('/', { scroll: false });
                setTimeout(() => window.scrollTo({
                    top: (scrollPercentage + 0.005) * (document.documentElement.scrollHeight - window.innerHeight),
                    behavior: 'instant'
                }), 100)            
            }}
            style={{
              mask: `url(/chevron_right.svg) center / contain no-repeat`,
              WebkitMask: `url(/chevron_right.svg) center / contain no-repeat`,
              transform: 'rotateZ(180deg)'
            }}
        />
    )
}