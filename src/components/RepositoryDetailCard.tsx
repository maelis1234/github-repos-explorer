import { Repository } from '@/utils/types'
import {
  CalendarIcon,
  ClockIcon,
  CodeBracketSquareIcon,
  CommandLineIcon,
  EyeIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'

interface RepoInfoProps {
  icon: React.ElementType
  text: string
}

interface RepoDetailProps {
  repo: Repository
}

const RepoInfo = ({ icon: Icon, text }: RepoInfoProps) => {
  return (
    <p className='flex items-center space-x-2'>
      <Icon className='size-5' />
      <span className='text-sm md:text-base'>{text}</span>
    </p>
  )
}

const RepositoryDetailCard = ({ repo }: RepoDetailProps) => {
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

      <div className='px-4 py-5 sm:p-6 flex flex-col space-y-5'>
        <p className='text-center italic text-sm md:text-base'>
          {repo.description ?? 'No description available'}
        </p>

        <div className='flex justify-around'>
          <div>
            <RepoInfo
              icon={CalendarIcon}
              text={`Created on ${new Date(
                repo.created_at
              ).toLocaleDateString()}`}
            />
            <RepoInfo
              icon={ClockIcon}
              text={`Updated on ${new Date(
                repo.updated_at
              ).toLocaleDateString()}`}
            />
            <RepoInfo
              icon={CodeBracketSquareIcon}
              text={repo.language ?? 'Unknown'}
            />
          </div>

          <div>
            <RepoInfo
              icon={CommandLineIcon}
              text={`${repo.forks_count} 
                ${repo.forks_count > 1 ? 'forks' : 'fork'}`}
            />
            <RepoInfo
              icon={EyeIcon}
              text={`${repo.subscribers_count} ${
                repo.subscribers_count > 1 ? 'followers' : 'follower'
              }`}
            />
            <RepoInfo
              icon={StarIcon}
              text={`Starred by ${repo.stargazers_count}
                ${repo.stargazers_count > 1 ? 'devs' : 'dev'}`}
            />
          </div>
        </div>

        <a
          href={repo.html_url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-800 text-sm md:text-base hover:underline hover:underline-offset-2 hover:text-blue-600 text-center'
        >
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default RepositoryDetailCard
