import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
  const [page, setPage] = useState(1); // বর্তমান পেজ ট্র্যাক করতে স্টেট

  const fetchPosts = async ({ queryKey }) => {
    const page = queryKey[1]; // পেজ নাম্বার নেওয়া
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
    );
    if (!response.ok) throw new Error("Error fetching data");
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", page], // আলাদা আলাদা পেজ ক্যাশ হবে
    queryFn: fetchPosts,
    keepPreviousData: true, // আগের ডাটা দেখাবে লোডিং এর সময়
  });

  if (isLoading) return <p>Loading.....</p>;
  if (error) return <p>Error Occurred: {error.message}</p>;

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <button>Details</button>
        </div>
      ))}

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span> Page {page} </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.length < 5}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
