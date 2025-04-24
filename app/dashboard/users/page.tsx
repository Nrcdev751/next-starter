import React from 'react'
import Link from 'next/link';

const users = () => {
  return (
    <div>
        <h1>Dashboard user</h1>
        <ul className='mt-10'>
            <li><Link href="/dashboard/users/1">User1</Link></li>
            <li><Link href="/dashboard/users/2">User2</Link></li>
            <li><Link href="/dashboard/users/3">User3</Link></li>
            <li><Link href="/dashboard/users/4">User4</Link></li>
            <li><Link href="/dashboard/users/5">User5</Link></li>
        </ul>
    </div>
  )
}

export default users