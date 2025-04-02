'use client'

import ErrorAlert from '@/components/ErrorAlert'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect } from 'react'

interface Props {
  error: Error
}

const ErrorPage = ({ error }: Readonly<Props>) => {
  useEffect(() => {
    console.error('Failed to fetch repository detail:', error)
  }, [error])

  return (
    <div className='flex flex-col space-y-5 mt-5 items-center'>
      <ErrorAlert message={error.message} />
      <Link href={'/'}>
        <div className='flex items-center text-gray-900 hover:underline hover:underline-offset-2 hover:text-gray-500 dark:text-gray-50 hover:dark:text-gray-200 '>
          <ArrowLeftCircleIcon className='size-5 mr-2' />
          Back to Search Page
        </div>
      </Link>
    </div>
  )
}

export default ErrorPage
