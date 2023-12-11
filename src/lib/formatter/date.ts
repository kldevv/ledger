export const date = (props: Date) => {
  const year = props.getFullYear()
  const month = props.getMonth() + 1
  const date = props.getDate()

  return `${year}-${month}-${date}`
}