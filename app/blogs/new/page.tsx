import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  return (
    <div>
      <h1>Create new blog</h1>

      <form action={createBlog}>
        <div>
          <label>
            Title
            <input type="text" name="title" required />
          </label>
        </div>

        <div>
          <label>
            Author
            <input type="text" name="author" required />
          </label>
        </div>

        <div>
          <label>
            URL
            <input type="text" name="url" required />
          </label>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog