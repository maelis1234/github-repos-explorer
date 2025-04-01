'use client'

import { getRepositoriesByUsername } from '@/services/api'
import { Repository } from '@/utils/types'
import { useState } from 'react'
import ErrorAlert from './ErrorAlert'
import Loader from './Loader'
import RepositoryCard from './RepositoryCard'

const SearchRepositories = () => {
  const [search, setSearch] = useState<string | null>(null)
  const [repositories, setRepositories] = useState<Repository[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<{ message: string } | null>(null)

  const handleSearch = async () => {
    if (!search?.trim()) return

    try {
      setError(null)
      setLoading(true)

      const result: Repository[] = await getRepositoriesByUsername(search)
      setRepositories(result)
    } catch (error) {
      setError({
        message:
          (error as Error).message ||
          'An unexpected error occurred. Please try again later.',
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setSearch(e.target.value)
  }

  return (
    <div className='flex flex-col items-center '>
      <div className='flex space-x-3 m-8'>
        <div>
          <label htmlFor='searchBar' className='sr-only'>
            Search for a GitHub User
          </label>
          <input
            id='searchBar'
            name='searchBar'
            type='text'
            placeholder='Search for a Github User...'
            aria-label='Enter GitHub username to search for repositories'
            className='w-48 md:w-72 rounded-md bg-white p-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 placeholder:text-sm shadow-sm'
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
        </div>

        <button
          type='button'
          className='rounded-md bg-white p-2 w-24 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {loading && <Loader />}

      {error && <ErrorAlert message={` ${error.message}`} />}

      <div className='w-full flex flex-wrap justify-center space-x-4 space-y-1'>
        {!error &&
          !loading &&
          repositories !== null &&
          repositories.length > 0 &&
          repositories?.map((repo: Repository) => {
            return <RepositoryCard repo={repo} key={repo.id} />
          })}
      </div>

      {!error && !loading && repositories?.length === 0 && (
        <ErrorAlert message={'This user has no public repos.'} />
      )}
    </div>
  )
}

export default SearchRepositories
