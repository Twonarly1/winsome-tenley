export default function Welcome({ welcome }) {
  const { title, synopsis, imageUrl, user } = welcome
  return (
    <div className="">
      {title}
      {user}
      <div className="mt-4">
        <span>{synopsis}</span>
      </div>
    </div>
  )
}
