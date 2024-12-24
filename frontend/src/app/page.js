// app/page.js (Next.js 13+)
import { useQuery, gql } from "@apollo/client";

// GraphQL хүсэлт
const GET_ALL_TASKS = gql`
  query GetAllTasks {
    tasks {
      id
      title
      completed
    }
  }
`;

export default function Home() {
  // useQuery ашиглан өгөгдлийг авах
  const { loading, error, data } = useQuery(GET_ALL_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Tasks</h1>
      <ul>
        {data.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
