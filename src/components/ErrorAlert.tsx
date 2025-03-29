import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

interface Props {
  message: string
}

const ErrorAlert = ({ message }: Props) => {
  return (
    <div className='border-l-4 border-red-400 bg-red-50 p-4 rounded-sm w-96'>
      <div className='flex'>
        <div className='shrink-0'>
          <ExclamationCircleIcon className='size-5 text-red-400' />
        </div>
        <div className='ml-3'>
          <p className='text-sm text-red-700'>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorAlert
