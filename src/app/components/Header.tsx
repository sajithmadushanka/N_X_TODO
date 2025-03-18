import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
        <div className="outer">
            <div className="inner">
                <div className="right-side">
                    <h2>Welcome to My TODO</h2>
                </div>
                <div className="left-side">
                    <Link href="/"> Home </Link>
                </div>
            </div>
        </div>
  )
}

export default Header