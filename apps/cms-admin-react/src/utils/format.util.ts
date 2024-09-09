import dayjs from 'dayjs'

export function formatDateTime(datetime: Date | string | number): string {
  return dayjs(datetime).format('YYYY-MM-DD HH:mm')
}
