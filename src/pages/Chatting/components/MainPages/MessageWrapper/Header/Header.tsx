/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dut from 'src/assets/images/logo.jpg'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { ShowTimeDifference } from 'src/utils/utils'
import { SocketContext } from 'src/contexts/socket.context'

interface Props {
  showRoomInfo: boolean
  setShowRoomInfo: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ showRoomInfo, setShowRoomInfo }: Props) {
  const handleShowRoomInfo = () => {
    setShowRoomInfo(!showRoomInfo)
  }
  const { roomInfo } = useContext(SocketContext)
  const [, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Cập nhật mỗi 1 phút
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {}, [roomInfo])

  return (
    <div className='flex min-h-[65px] w-full grow-0 items-center justify-between bg-white px-4 shadow-sm shadow-stone-200'>
      <div className='flex items-center'>
        {roomInfo?.avatar && (
          <div className='relative'>
            <img
              className='h-[45px] w-[45px] rounded-full border-[1px] border-gray-200'
              src={roomInfo.avatar}
              alt='ảnh'
            />
            {(roomInfo.is_online || ShowTimeDifference(roomInfo?.last_online || '', false) === 'Đang hoạt động') && (
              <div className='absolute bottom-0 right-0 h-[16px] w-[16px] rounded-full border-[3px] border-white bg-green-500'></div>
            )}
          </div>
        )}
        {!roomInfo?.avatar && (
          <div className='relative'>
            <img className='h-[45px] w-[45px] rounded-full border-[1px] border-gray-200' src={dut} alt='ảnh' />
            {(roomInfo?.is_online || ShowTimeDifference(roomInfo?.last_online || '', false) === 'Đang hoạt động') && (
              <div className='absolute bottom-0 right-0 h-[16px] w-[16px] rounded-full border-[3px] border-white bg-green-500'></div>
            )}
          </div>
        )}
        <div className='ml-4'>
          <div className='text-lg font-semibold'>{roomInfo?.name}</div>
          <div className='text-sm font-extralight text-textColor'>
            {roomInfo?.is_online ? 'Đang hoạt động' : ShowTimeDifference(roomInfo?.last_online || '', false)}
          </div>
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <div className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md p-4 text-gray-500 hover:cursor-pointer hover:bg-stone-200'>
          <PhoneOutlinedIcon sx={{ fontSize: '24px' }} />
        </div>
        <div className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md p-4 text-gray-500 hover:cursor-pointer hover:bg-stone-200'>
          <VideoCameraFrontOutlinedIcon sx={{ fontSize: '24px' }} />
        </div>
        <div className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md p-4 text-gray-500 hover:cursor-pointer hover:bg-stone-200'>
          <SearchOutlinedIcon sx={{ fontSize: '24px' }} />
        </div>
        <div
          className={classNames(
            'ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md p-4 hover:cursor-pointer',
            {
              'bg-blue-200 text-primary': showRoomInfo,
              'bg-white text-gray-500  hover:bg-stone-200 ': !showRoomInfo
            }
          )}
          onClick={handleShowRoomInfo}
        >
          <MoreHorizOutlinedIcon sx={{ fontSize: '24px' }} />
        </div>
      </div>
    </div>
  )
}
