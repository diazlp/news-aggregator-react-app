import { useEffect } from "react"
import { fetchNewsApiHeadline } from "../actions/newsActions"
import { useDispatch } from "react-redux"

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchNewsApiHeadline())
  }, [])

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Welcome to my App</h1>
      <button className="btn btn-primary">Click me</button>
    </div>
  )
}

export default HomePage