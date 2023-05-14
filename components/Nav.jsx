"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
    const isUserLoggedIn = false;
    const [providers,setProviders] = useState(null);

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setProviders();
    },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image src="/assets/images/logo.svg" alt='promptfind' width={30} height={30} className='object-contain'/>
        <p className='logo_text'>PromptFind</p>
        </Link>

    <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
            <div className='flex'>
            <Link className='black_btn' href="/create-prompt">
            Create Post
            </Link>
            <button type='button' onClick={signOut} className='ml-2 outline_btn'>
                SignOut
            </button>

            <Link href="/profile">
                <Image src="/assets/images/logo.svg"
                alt='profile'
                width={37}
                height={37}
                className="ml-3 rounded-full"
                />
            </Link>
                </div>
        ) : (
            <>
            {providers &&( Object.values(providers).map((provider) => (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>

                </button>
            )))}
            </>
        )}
    </div>
    </nav>
  )
}

export default Nav