import RepositoryDetailCard from '@/components/RepositoryDetailCard'
import { getRepositoryDetail } from '@/services/api'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default async function RepositoryDetailPage({
  params,
}: Readonly<{
  params: Promise<{ username: string; repoName: string }>
}>) {
  const { username, repoName } = await params
  const repositoryData = await getRepositoryDetail(username, repoName)

  return (
    <div className='flex flex-col space-y-6 mt-5 items-center w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%]'>
      <RepositoryDetailCard repo={repositoryData} />
      <Link href={'/'}>
        <div className='flex items-center text-gray-900 hover:underline hover:underline-offset-2 hover:text-gray-500 dark:text-gray-50 hover:dark:text-gray-200 '>
          <ArrowLeftCircleIcon className='size-5 mr-2' />
          Back
        </div>
      </Link>
    </div>
  )
}
