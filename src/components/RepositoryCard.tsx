import { Repository } from '@/utils/types'
import { FolderOpenIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Props {
  repo: Repository
}

const RepositoryCard = ({ repo }: Props) => {
  return (
    <Link href={`/${repo.owner.login}/${repo.name}`}>
      <div className='rounded-md bg-white  text-gray-900 border border-gray-300 shadow-sm w-64 p-4 flex space-x-2 hover:bg-gray-100 my-2'>
        <FolderOpenIcon className='size-6 text-gray-500' />
        <p>{repo.name}</p>
      </div>
    </Link>
  )
}

export default RepositoryCard
