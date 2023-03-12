import * as React from 'react'

import classNames from 'clsx'
import { DateTime } from 'luxon'

interface TimeFromUtcProps {
  className?: string
  date: string
}

export const TimeFromUtc = ({ className, date }: TimeFromUtcProps) => {
  const [timestamp, setTimestamp] = React.useState<any>()
  React.useEffect(() => {
    if (date) {
      setTimestamp(DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED))
    }
  }, [])
  const containerClassName = classNames(className, 'TimeFromUtc')
  return <span className={containerClassName}>{timestamp}</span>
}
