import { Repository } from '@/utils/types'
import {
  CodeBracketIcon,
  CodeBracketSquareIcon,
  StarIcon,
  CalendarIcon
} from '@heroicons/react/20/solid'
import Image from 'next/image'

interface Props {
  repo: Repository
}

const RepositoryDetailCard = ({ repo }: Props) => {
  return (
    <div className='w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-xl text-gray-900'>
      <div className='px-4 py-5 sm:px-6'>
        <h2 className='font-bold text-center text-2xl'>{repo.name}</h2>
      </div>

      <a
        href={repo.owner.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-center space-x-2 py-2'
      >
        <Image
          src={repo.owner.avatar_url}
          alt='owner_avatar'
          width={40}
          height={40}
          className='rounded-full'
        />
        <p className='text-lg font-semibold'>{repo.owner.login}</p>
      </a>

      <div className='px-4 py-5 sm:p-6 flex flex-col space-y-3'>
        <p className='text-center italic text-sm md:text-base'>
          {repo.description ?? 'No description available'}
        </p>

        <div className='flex flex-row justify-around'>
          <div>
            <p className='flex flex-row items-center space-x-1'>
              <CalendarIcon className='size-5' />
              <span className='text-sm md:text-base'>
                Created on {new Date(repo.created_at).toLocaleDateString()}
              </span>
            </p>

            <p className='flex flex-row items-center space-x-1'>
              <CalendarIcon className='size-5' />
              <span className='text-sm md:text-base'>
                Updated on {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </p>
          </div>

          <div>
            <p className='flex flex-row items-center space-x-1'>
              <CodeBracketSquareIcon className='size-5 ' />
              <span className='text-sm md:text-base'>
                {repo.language ?? 'Unknown'}
              </span>
            </p>

            <p className='flex flex-row items-center space-x-1'>
              <StarIcon className='size-5 text-yellow-400' />
              <span className='text-sm md:text-base'>
                Starred by {repo.stargazers_count}{' '}
                {repo.stargazers_count > 1 ? 'people' : 'person'}
              </span>
            </p>

            <p className='flex flex-row items-center space-x-1'>
              <CodeBracketIcon className='size-5 text-blue-800 ' />
              <span className='text-sm md:text-base'>
                Forked by {repo.forks_count}{' '}
                {repo.forks_count > 1 ? 'people' : 'person'}
              </span>
            </p>
          </div>
        </div>

        <a
          href={repo.html_url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-800 text-sm md:text-base hover:underline hover:underline-offset-2 hover:text-blue-400'
        >
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default RepositoryDetailCard
