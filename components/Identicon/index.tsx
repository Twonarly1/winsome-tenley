/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from 'react'
import jazzicon from '@metamask/jazzicon'
import { useAccount, useEnsAvatar } from 'wagmi'

export function Identicon() {
  const [{ data: accountData }] = useAccount({ fetchEns: true })
  const [{ data: ensData }] = useEnsAvatar({
    //addressOrName: "nick.eth",
    addressOrName: accountData?.address,
  })
  const [fetchable, setFetchable] = useState(true)

  const icon = useMemo(
    () =>
      accountData &&
      jazzicon(22, parseInt(accountData?.address.slice(2, 10), 24)),
    [accountData]
  )
  const iconRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const current = iconRef.current
    if (icon) {
      current?.appendChild(icon)
      return () => {
        try {
          current?.removeChild(icon)
        } catch (e) {
          console.error('Avatar icon not found')
        }
      }
    }
    return
  }, [icon, iconRef])

  return (
    <div className="">
      {ensData && fetchable ? (
        <img
          className="h-5 w-5 items-center rounded-full"
          alt="avatar"
          src={ensData}
        ></img>
      ) : (
        <span className="" ref={iconRef} />
      )}
    </div>
  )
}

export default Identicon
