import getPost from "@/entities/posts/api/get-post";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) {
  const { id } = await params;

  const data = await getPost(Number(id));

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>id:</td>
            <td>{data.id}</td>
          </tr>
          <tr>
            <td>User id:</td>
            <td>{data.userId}</td>
          </tr>
          <tr>
            <td>Title:</td>
            <td>{data.title}</td>
          </tr>
          <tr>
            <td className="pr-4">Description:</td>
            <td>{data.body}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
